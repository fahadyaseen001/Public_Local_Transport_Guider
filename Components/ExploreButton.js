import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';

export default function ExploreButton() {
  const handlePress = () => {
    // Assuming you want to open Google Maps to a specific location or the explore tab
    // For example, to open the explore tab in Google Maps you might use a general URL
    // This URL just opens Google Maps, you would replace it with a URL scheme for the explore tab if available
    const url = 'https://maps.google.com/';
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Explore</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 10,
  },
  button: {
    height: 54,
    width: 170,
    backgroundColor: '#008955',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // adjust as necessary to match the provided image
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily:"Poppins-Regular",
  },
});
