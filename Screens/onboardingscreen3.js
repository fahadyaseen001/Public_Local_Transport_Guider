import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import CustomButton2 from '../Components/CustomButton2';

export default function OnboardingScreen({ navigation }) {
  const [progress, setProgress] = useState(0);

  const handleSkip = () => {
    navigation.navigate('EnableLocationScreen'); // Replace 'NextScreen' with the actual next screen
  };

  const handlePress = () => {
    setProgress( 1.00); // Adjust progress as necessary
    setTimeout(() => {
    navigation.navigate('EnableLocationScreen');
}, 500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Adjust the source of the image accordingly */}
      <Image style={styles.image} source={require('../assets/Frame-1.png')} />
      <Text style={styles.title}>Welcome to Local Public Transport Guider</Text>
      <Text style={styles.subtitle1}>Discover the Best Routes and Fare Estimates For Local Public Transport</Text>
      <Text style={styles.subtitle1}>Let us be your ultimate guide to exploring your city efficiently and cost-effectively.</Text>
      <View style={styles.custombutton}><CustomButton2 progress={progress} onPress={handlePress} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'space-between', // Ensures that the button stays at the bottom
    paddingTop: StatusBar.currentHeight, // Automatically adjust the padding to match the status bar height
  },
  skipButton: {
    alignSelf: 'flex-end',
    margin: 16,
  },
  skipText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#414141',
  },
  image: {
    width: '100%', // Image takes the full width of the screen
    resizeMode: 'contain', // Ensures the image is fully visible
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    fontWeight: 'bold', // Assuming the title is bold as per the design
    color: '#414141',
    textAlign: 'center',
    
  },
  subtitle1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'center',
   
  },
  // The rest of your styles remain the same
  custombutton:{
    alignContent:'center',
    alignItems:'center',
  }
});
