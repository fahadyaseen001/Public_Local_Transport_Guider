import React, { useState, useEffect,useRef } from 'react';
import { View, Text, StyleSheet ,Dimensions,TouchableOpacity,Image  } from 'react-native';
import { Divider } from 'react-native-paper';
import MapView, { Marker, Polyline } from 'react-native-maps';
import polyline from '@mapbox/polyline';
import { MaterialCommunityIcons,Entypo,Ionicons   } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import DottedLine from '../Components/DottedLine'
import { useLocation } from '../States/LocationContext'; // Import useLocation
import busMarker from '../assets/bus-pointer.png'; // Adjust the path as necessary


const NearStopScreen = ({ navigation  }) => {
  const { locationCoords } = useLocation(); // Access locationCoords from context
  const [nearestStop, setNearestStop] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  

  const bottomSheetRef = useRef(null);
  
 
  useEffect(() => {
    const fetchNearestStop = async () => {
      try {
        const response = await fetch('https://routeplanning.vercel.app/findNearestStop', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            latitude: locationCoords.latitude,
            longitude: locationCoords.longitude
          })
        });

        const data = await response.json();
        setNearestStop(data.nearestStop);

        // After fetching nearest stop, get the route
        getRoute(data.nearestStop);
      } catch (error) {
        console.error('Failed to fetch nearest stop:', error);
      }
    };

    fetchNearestStop();
  }, [locationCoords]);

  const getRoute = async (nearestStop) => {
    try {
      const routeResponse = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${locationCoords.latitude},${locationCoords.longitude}&destination=${nearestStop.lat},${nearestStop.long}&key=AIzaSyA-kcU5fzpAMLYniNWH0nFBZUejg_rhKco`);
      const routeData = await routeResponse.json();
      const points = routeData.routes[0].overview_polyline.points;
      setRouteCoordinates(polyline.decode(points).map(([lat, lng]) => ({ latitude: lat, longitude: lng })));
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const renderMap = () => {
    if (!nearestStop || routeCoordinates.length === 0) return <Text>Loading...</Text>;

    return (
      <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: locationCoords.latitude,
          longitude: locationCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={locationCoords} title={"Your Location"}><Entypo  name="location-pin" size={24} color="red" /></Marker>
        <Marker coordinate={{ latitude: nearestStop.lat, longitude: nearestStop.long }} title={nearestStop.name}><Image 
                source={busMarker} 
                style={{ width: 24, height: 24 }} 
                resizeMode="contain"
            /></Marker>

        <Polyline
          coordinates={routeCoordinates}
          strokeColor="black" // black
          strokeColors={['black']} // dotted line
          strokeWidth={2}
          lineDashPattern={[5, 5]} // pattern for dotted lin
        />
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['39%', '39%']}
        borderRadius={10}
      >
        {/* Your bottom sheet content here */}
        <View style={styles.bottomSheetContent}>
        <Text style={styles.title}> Route To Reach Nearest Local Stop</Text>   
        <Divider style={{ backgroundColor: 'grey', marginBottom:15, }} />
           {/* walk */}
          <View style={styles.walk}><Ionicons name="ios-location-sharp" size={24} color="black" />
          <Text style={{marginLeft:10,marginRight:10}}> Walk to</Text>
          <MaterialCommunityIcons name="walk" size={24} color="black" />
          <DottedLine/>
          <Text style={{marginRight:8}}>7 Min Away</Text>
</View>
          {/* bike */}
          <Divider style={{ backgroundColor: 'grey', marginBottom:15,marginTop:10, }} />
          <View style={styles.walk}><Ionicons name="ios-location-sharp" size={24} color="black" />
          <Text style={{marginLeft:10,marginRight:10}}> Ride to</Text>
          <MaterialCommunityIcons name="bike" size={24} color="black" />
          <DottedLine/>
          <Text style={{marginRight:8}}>10 Min Away</Text>
         </View>

         {/* drive */}
         <Divider style={{ backgroundColor: 'grey', marginBottom:15,marginTop:10, }} />
          <View style={styles.walk}><Ionicons name="ios-location-sharp" size={24} color="black" />
          <Text style={{marginLeft:10,marginRight:10}}> Drive to</Text>
          <MaterialCommunityIcons name="car-hatchback" size={24} color="black" />
          <DottedLine/>
          <Text style={{marginRight:8}}>13 Min Away</Text>
         </View>
         <Divider style={{ backgroundColor: 'grey' ,marginBottom:5, marginTop:10, }} />
         
         <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.buttonText1}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonProceed} onPress={() => navigation.navigate('RouteMapScreen',{ nearestStopName: nearestStop ? nearestStop.name : '' })}>
        <Text style={styles.buttonText2}>Proceed</Text>
        </TouchableOpacity>
        </View>



          
        </View>
      </BottomSheet>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderMap()}
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex:1
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
  walk:{
    marginLeft:10,
    flexDirection:'row',

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
});

export default NearStopScreen;
