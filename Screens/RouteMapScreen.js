import React, { useState, useEffect,useRef } from "react";
import { View, Text,Dimensions ,StyleSheet,Image,TouchableOpacity} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import polyline from "@mapbox/polyline";
import {useDestination} from "../States/DestinationContext";
import busMarker from '../assets/bus-pointer.png'; // Adjust the path as necessary
import BottomSheet from '@gorhom/bottom-sheet';
import { Divider} from 'react-native-paper';
import Line from '../Components/line';
import Line1 from '../Components/line1';





const MappingScreen = ({ route,navigation }) => {
  const [routeData, setRouteData] = useState(null);
  const [polylinesBeforeTransfer, setPolylinesBeforeTransfer] = useState([]);
  const [polylinesAfterTransfer, setPolylinesAfterTransfer] = useState([]);
  const [transferPolylines, setTransferPolylines] = useState([]);
  const { toAddress } = useDestination(); // Access locationCoords from context
  
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    const nearestStopName = route.params?.nearestStopName || "TChowk"; // Replace "Default Stop Name" with a default value if needed

    // Replace with your backend API endpoint
    const apiUrl = "https://routeplanning.vercel.app/suggestRoute";

    // Replace with your route input data
    const requestData = {
      pickup: "TChowk",
      destination: toAddress,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => setRouteData(data))
      .catch((error) => console.error("Error fetching route:", error));
  }, [route.params]);

  useEffect(() => {
    // Function to fetch detailed route information from Google Directions API
    const fetchDirections = async (origin, destination) => {
      try {
        // Replace with your Google Directions API key
        const apiKey = "AIzaSyA-kcU5fzpAMLYniNWH0nFBZUejg_rhKco";

        const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.long}&destination=${destination.lat},${destination.long}&key=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "OK") {
          // Extract polyline from the response
          const polyline = data.routes[0].overview_polyline.points;
          // console.log("Polyline:", polyline); // Add this log statement
          return polyline;
        } else {
          console.error("Google Directions API error:", data.status);
          return null;
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
        return null;
      }
    };

    if (routeData && routeData.routeBeforeTransfer.length > 1) {
      const promisesBeforeTransfer = [];
      for (let i = 0; i < routeData.routeBeforeTransfer.length - 1; i++) {
        const origin = routeData.routeBeforeTransfer[i];
        const destination = routeData.routeBeforeTransfer[i + 1];
        promisesBeforeTransfer.push(fetchDirections(origin, destination));
      }

      Promise.all(promisesBeforeTransfer)
        .then((encodedPolylines) => {
          // Decode and set the polylines state
          const decodedPolylines = encodedPolylines.map((encodedPolyline) =>
            polyline.decode(encodedPolyline)
          );
          setPolylinesBeforeTransfer(decodedPolylines);
        })
        .catch((error) => console.error("Error fetching directions:", error));
    }

    if (routeData && routeData.routeAfterTransfer.length > 1) {
      const promisesAfterTransfer = [];
      for (let i = 0; i < routeData.routeAfterTransfer.length - 1; i++) {
        const origin = routeData.routeAfterTransfer[i];
        const destination = routeData.routeAfterTransfer[i + 1];
        promisesAfterTransfer.push(fetchDirections(origin, destination));
      }

      Promise.all(promisesAfterTransfer)
        .then((encodedPolylines) => {
          // Decode and set the polylines state
          const decodedPolylines = encodedPolylines.map((encodedPolyline) =>
            polyline.decode(encodedPolyline)
          );
          setPolylinesAfterTransfer(decodedPolylines);
        })
        .catch((error) => console.error("Error fetching directions:", error));
    }

    if (
      routeData &&
      routeData.transferStops &&
      routeData.transferStops.length === 2
    ) {
      const transferOrigin = routeData.transferStops[0];
      const transferDestination = routeData.transferStops[1];

      fetchDirections(transferOrigin, transferDestination)
        .then((encodedPolyline) => {
          // Decode and set the transfer polylines state
          const decodedPolyline = polyline.decode(encodedPolyline);
          setTransferPolylines([decodedPolyline]);
        })
        .catch((error) =>
          console.error("Error fetching transfer directions:", error)
        );
    }
  }, [routeData]);

  if (!routeData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  let flattenedCoordinatesBeforeTransfer = null;
  let coordinatesBeforeTransfer = [];
  if (polylinesBeforeTransfer) {
    const newPolylinesBeforeTransfer = [];
    polylinesBeforeTransfer.map((decodedPolyline) => {
      newPolylinesBeforeTransfer.push(decodedPolyline);
    });

    flattenedCoordinatesBeforeTransfer = newPolylinesBeforeTransfer.flat(2);

    for (let i = 0; i < flattenedCoordinatesBeforeTransfer.length; i += 2) {
      coordinatesBeforeTransfer.push({
        latitude: flattenedCoordinatesBeforeTransfer[i],
        longitude: flattenedCoordinatesBeforeTransfer[i + 1],
      });
    }
  }

  let flattenedCoordinatesAfterTransfer = null;
  let coordinatesAfterTransfer = [];
  if (polylinesAfterTransfer) {
    const newPolylinesAfterTransfer = [];
    polylinesAfterTransfer.map((decodedPolyline) => {
      newPolylinesAfterTransfer.push(decodedPolyline);
    });

    flattenedCoordinatesAfterTransfer = newPolylinesAfterTransfer.flat(2);

    for (let i = 0; i < flattenedCoordinatesAfterTransfer.length; i += 2) {
      coordinatesAfterTransfer.push({
        latitude: flattenedCoordinatesAfterTransfer[i],
        longitude: flattenedCoordinatesAfterTransfer[i + 1],
      });
    }
  }

  let flattenedCoordinatesTransfer = null;
  let coordinatesTransfer = [];
  if (transferPolylines) {
    const newTransferPolylines = [];
    transferPolylines.map((decodedPolyline) => {
      newTransferPolylines.push(decodedPolyline);
    });

    flattenedCoordinatesTransfer = newTransferPolylines.flat(2);

    for (let i = 0; i < flattenedCoordinatesTransfer.length; i += 2) {
      console.log("i:", flattenedCoordinatesTransfer[i]);
      console.log("i+1:", flattenedCoordinatesTransfer[i + 1]);
      coordinatesTransfer.push({
        latitude: flattenedCoordinatesTransfer[i],
        longitude: flattenedCoordinatesTransfer[i + 1],
      });
    }
  }

  const { routeBeforeTransfer, routeAfterTransfer } = routeData;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          // Set the initial region based on the first coordinate
          latitude: routeBeforeTransfer[0].lat,
          longitude: routeBeforeTransfer[0].long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Render markers for start, destination, and intermediate stops before transfer */}
        {routeBeforeTransfer.map((stop, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: stop.lat, longitude: stop.long }}
            title={stop.name}
          ><Image 
          source={busMarker} 
          style={{ width: 24, height: 24 }} 
          resizeMode="contain"
      /></Marker>
        ))}

        {/* Draw decoded polylines for the path before transfer */}
        <Polyline
          coordinates={coordinatesBeforeTransfer}
          strokeWidth={3}
          strokeColor="#008955"
        />

        {/* Render markers for start, destination, and intermediate stops after transfer */}
        {routeAfterTransfer.map((stop, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: stop.lat, longitude: stop.long }}
            title={stop.name}
          ><Image 
          source={busMarker} 
          style={{ width: 24, height: 24 }} 
          resizeMode="contain"
      /></Marker>
        ))}

        {/* Draw decoded polylines for the path after transfer */}
        <Polyline
          coordinates={coordinatesAfterTransfer}
          strokeWidth={3}
          strokeColor="red"
        />

        {/* Draw decoded polylines for the transfer route */}
        <Polyline
          coordinates={coordinatesTransfer}
          strokeWidth={3}
          strokeColor="green"
        />
      </MapView> 
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['39%', '39%']}
        borderRadius={10}
      >
         <View style={styles.bottomSheetContent}>
        <Text style={styles.title}> Local Transport Route Recommended</Text>   
        <Divider style={{ backgroundColor: 'grey', marginBottom:5, }} />
        <View style={styles.firstView} >
        <Text style={{color:"#5A5A5A",fontFamily:"Poppins-Regular",marginTop:15,}}> {"21 No \n Route"}</Text>

        <Text style={{color:"#A0A0A0",fontFamily:"Poppins-Regular",marginTop:21,marginLeft:10,}}> TChowk</Text>
        <Line/>
        <Text style={{color:"#A0A0A0",fontFamily:"Poppins-Regular",marginTop:21,marginRight:15,}}>Faizabad</Text>


        </View>
        <Divider style={{ backgroundColor: 'black', marginBottom:5, }} />

      <View style={styles.secondView} >
      <Text style={{color:"#000",fontFamily:"Poppins-Regular",marginTop:15,}}> {"26 No \n Route"}</Text>

      <Text style={{color:"#000",fontFamily:"Poppins-Regular",marginTop:21,marginLeft:10,}}> TChowk</Text>
       <Line1/>
       <Text style={{color:"#000",fontFamily:"Poppins-Regular",marginTop:21,marginRight:15,}}>Faizabad</Text>
        
      </View>
      <Divider style={{ backgroundColor: 'black', marginBottom:3, marginTop:5 }} />
  

        
         
         <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('NearStopScreen')}>
        <Text style={styles.buttonText1}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonProceed} onPress={() => navigation.navigate('TransportScreen')}>
        <Text style={styles.buttonText2}>Proceed</Text>
        </TouchableOpacity>
        </View>

        </View>
      
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({

  container:{
    flex: 1 ,
  },

  map: {
    // Define width and height as a percentage of the screen's dimensions
    width: Dimensions.get('window').width * 1.0, // 90% of screen width
    height: Dimensions.get('window').height * 0.6, // 50% of screen height
 },
 bottomSheetContent: {
    
 },
  title: {
   fontSize: 16,
   fontWeight: '600',
   marginBottom: 10,
   color:'#5A5A5A',
   marginLeft:5,
   marginTop:5,
   fontFamily:"Poppins-Regular",
 },
 
 Line:{
   height: 60, // Adjust the height as needed
   width: 1,
   backgroundColor: 'black',
   marginHorizontal: 10, // Add horizontal spacing around the line
    marginLeft: 20,
 },buttons: {
   flexDirection:"row",
  
   justifyContent: 'center',
   alignItems: 'center',
   
   backgroundColor: 'white',
 },
 buttonBack: {
   alignItems: 'center',
   backgroundColor: '#FFFF',
   padding: 10,
   width: 100,
   margin: 5,
   borderRadius: 10,
   borderColor:'#008955',
   borderWidth:1,
 },
 buttonProceed: {
   alignItems: 'center',
   backgroundColor: '#008955',
   padding: 10,
   width: 100,
   margin: 5,
   borderRadius: 10,
 },
 buttonText1: {
   fontWeight: 'bold',
   color:'#008955',
   fontFamily:"Poppins-Regular",

 },
 buttonText2: {
   fontWeight: 'bold',
   color:'white',
   fontFamily:"Poppins-Regular",

 },
 firstView: {
  marginLeft:8,
  width: 345,
  height: 70,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#08B783',
  backgroundColor: '#E2F5ED',
  marginBottom: 5, // Add some space between the two views
  flexDirection:"row",

},
secondView: {
  marginLeft:8,
  width: 345,
  height: 70,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: 'red',
  backgroundColor: '#E57373',
  flexDirection:"row",

},
})

export default MappingScreen;
