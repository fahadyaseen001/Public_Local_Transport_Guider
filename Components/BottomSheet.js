import React, {  forwardRef, useState, useEffect,useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons,MaterialIcons,MaterialCommunityIcons,AntDesign  } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { Divider } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { useLocation } from '../States/LocationContext'; // Import useLocation
import { useDestination } from '../States/DestinationContext'; // Update the path accordingly



const MyBottomSheet = forwardRef(({ }, ref) => {
  const { toAddress, setToAddress } = useDestination();

  const [fromAddressInput, setFromAddressInput] = useState('');
  const [toAddressInput, setToAddressInput] = useState('');
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [snapPoints, setSnapPoints] = useState(['25%', '75%']);
  const { locationCoords } = useLocation(); // Access locationCoords from context


  const swiperRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
  setToAddressInput(toAddress);
}, [toAddress]);

useEffect(() => {
  setToAddress(toAddressInput);
}, [toAddressInput]);


  useEffect(() => {
    if (swiperIndex === 1) {
      setSnapPoints(['50%', '50%']); // Set first snap point to 25% for the second view
    } else {
      setSnapPoints(['1%', '75%']); // Set first snap point to 1% for the first view
    }
  }, [swiperIndex]);
  

  // Dummy data for the list of places
  const places = [
    { key: '1', name: 'Office', address: 'Scheme 3 Rawalpindi, Punjab 46200, Pakistan', distance: '2.7km' },
    { key: '2', name: 'Coffee shop', address: '1901 Thornridge Cir. Shiloh, Hawaii 81063', distance: '1.1km' },
    // ... add other places here
  ];

 
  

  // Method to close the bottom sheet
  const handleClose = () => {
    ref.current?.close(); // Make sure the ref is forwarded properly to use this
  };

  const handleProceed = () => {
    const nextIndex = swiperIndex + 1;
    swiperRef.current?.scrollBy(nextIndex);
  };
  
  const handleBack = () => {
    swiperRef.current?.scrollTo(0);
  };
  

  return (

    

<BottomSheet ref={ref} index={-1} snapPoints={snapPoints} enablePanDownToClose={true}>

<Swiper ref={swiperRef} loop={false} index={swiperIndex} onIndexChanged={(index) => setSwiperIndex(index)} showsPagination={false}>
             {/* 1st View  */}

       <View style={styles.View1}>
      <View style={styles.sheetContainer}>
        
         {/* Close Button */}
         <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <AntDesign name="closesquare" size={18} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Select Your Location</Text>   

        
         {/* Consider View1 for Swiper from here */}

        <Divider style={{ backgroundColor: 'grey', marginVertical: 13 ,}} />


        <View style={styles.inputContainer}>
          <MaterialCommunityIcons  name="target" size={24} color="#F44336" style={styles.icon} />
          <TextInput placeholder="From" style={styles.input} value={fromAddressInput} onChangeText={setFromAddressInput} />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="location-pin" size={24} color="#008955" style={styles.icon} />
          <TextInput placeholder="To" style={styles.input} value={toAddress} onChangeText={setToAddress} />
          

        </View>
        <Divider style={{ backgroundColor: 'grey', marginBottom:10, }} />
        <Text style={styles.subTitle}>Recent places</Text>
        {places.map((place) => (
          <View key={place.key} style={styles.placeItem}>
            <Ionicons name="time-outline" size={24} color="black" style={styles.icon} />
            <View style={styles.placeText}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeAddress}>{place.address}</Text>
            </View>
            <Text style={styles.distance}>{place.distance}</Text>
          </View>
        ))}
      </View>
      <Divider style={{ backgroundColor: 'grey', marginBottom:10, }} />
      <View style={styles.bottom}>
      <TouchableOpacity style={styles.bottomButton} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
      </View>
      </View>
      {/* 2nd View  */}
      <View styles={styles.View2}>
      

        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
         <AntDesign name="closesquare" size={18} color="black" />
       </TouchableOpacity>

       <TouchableOpacity style={styles.backButton} onPress={handleBack}>
       <Ionicons name="md-arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

       <Text style={styles.title}>Select Your Location</Text>   
       
       <Divider style={{ backgroundColor: 'grey', marginVertical: 13 ,}} />
     
       <View style={styles.container}>
      {/* First Icon and Text */}
      <View style={styles.iconTextWrapper}>
        <MaterialIcons name="location-pin" size={24} color="#F44336" />
        <View style={styles.textWrapper}>
        <Text style={styles.placeName}>Current Location</Text>
        <Text style={styles.placeAddress}>{fromAddressInput}</Text>
        </View>
       </View>
      {/* Vertical Dotted Line */}
      <View style={styles.dottedLine} />

      {/* Second Icon and Text */}
      <View style={styles.iconTextWrapper}>
        <MaterialIcons name="location-pin" size={24} color="#008955" />
        <View style={styles.textWrapper}>
        <Text style={styles.placeName}>Destination Location</Text>
        <Text style={styles.placeAddress}>{toAddress}</Text> 
        </View>
    </View>
       </View> 
          
       <Divider style={{ backgroundColor: 'grey', marginVertical: 13 ,}} />
       <View style={styles.bottom}>
       <TouchableOpacity 
  style={styles.bottomButton} 
  onPress={() => navigation.navigate('NearStopScreen', {
    fromAddress: fromAddressInput, 
    
    locationCoords: locationCoords,
  })}
>
  <Text style={styles.buttonText}>Confirm Location</Text>
</TouchableOpacity>
     
      </View>
      </View>
      </Swiper>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  sheetContainer: {
    padding: 20,
    
  },
  handleIndicator: {
    alignSelf: 'center',
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00000030',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color:'#5A5A5A',
    fontFamily:"Poppins-Regular",


  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color:'#5A5A5A',
    fontFamily:"Poppins-Regular",


  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  placeText: {
    flex: 1,
    marginLeft: 10,
    fontFamily:"Poppins-Regular",

  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily:"Poppins-Regular",

  },
  placeAddress: {
    fontSize: 12,
    color: '#666',
    fontFamily:"Poppins-Regular",

  },
  distance: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    fontFamily:"Poppins-Regular",

  },
  bottomButton: {
    backgroundColor: '#008955',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width:200,
    height:50,
    padding: 7, // Add padding for better touch area
    left:80,
    top:10,
  },
  buttonText: {
    color: '#FFFFFF', // White text color
    fontFamily:"Poppins-Regular",

  },
  
  closeButton: {
    position: 'absolute', // Position the button over the content
    right: 20, // Distance from the right
    zIndex: 1, // Make sure it's above other elements
    
  },

  View1:{
    
  },

  View2:{
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    left: 12, // Adjust as needed
    zIndex: 1, // Ensure it's above other elements
  },
  line: {
    flexDirection: 'column', // Align items in a row
  },
  iconTextWrapper: {
    flexDirection: 'row', // Align icon and text in a row
    alignItems: 'center', // Center items vertically
    marginLeft: 8,
  },
  text: {
    marginLeft: 10, // Add some spacing to the left of the text
  },
  dottedLine: {
    height: 60, // Adjust the height as needed
    width: 1,
    backgroundColor: 'black',
    marginHorizontal: 10, // Add horizontal spacing around the line
     marginLeft: 20,
  },
  textWrapper: {
    flexDirection: 'column', // Align texts in a column
    marginLeft: 5, // Add some spacing to the left of the texts
  },

});

export default MyBottomSheet;
