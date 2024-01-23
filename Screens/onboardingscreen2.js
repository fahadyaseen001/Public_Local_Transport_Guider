import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import CustomButton from '../Components/CustomButton'; // Adjust path accordingly


export default function OnboardingScreen({ navigation }) {
  const [progress, setProgress] = useState(0);

  const handleSkip = () => {
    navigation.navigate('OnboardingScreen3'); // Replace 'NextScreen' with the actual next screen
  };

  const handlePress = () => {
    setProgress(0.66); // Adjust progress as necessary
    setTimeout(() => {
    navigation.navigate('OnboardingScreen3');
}, 500);
  };

  


  return (
    <View style={styles.container}>
        
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Adjust the source of the image accordingly */}
      <Image style={styles.image} source={require('../assets/At-anytime.png')} />
      <Text style={styles.title}>At anytime</Text>
      <Text style={styles.subtitle}>Want to know how to reach your destination in time cheaply & effectively?</Text>
      <View style={styles.custombutton}><CustomButton progress={progress} onPress={handlePress} /></View>
      
      
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
  subtitle: {
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
