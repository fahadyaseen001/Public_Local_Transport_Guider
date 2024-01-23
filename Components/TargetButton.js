import React, { useState } from 'react';
import { View, StyleSheet, Platform, Linking, Alert, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  
  const getLocationAndOpenMaps = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Allow location access to use this feature.');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    openGoogleMaps(currentLocation); // Pass the location object here
  };

  const openGoogleMaps = (currentLocation) => { // Function now takes location as a parameter
    let url = `http://maps.google.com/?q=${currentLocation.coords.latitude},${currentLocation.coords.longitude}`;
    if (Platform.OS === 'ios') {
      url = `http://maps.apple.com/?ll=${currentLocation.coords.latitude},${currentLocation.coords.longitude}`;
    }
    Linking.openURL(url);
  };

  return (
    <View >
      <TouchableOpacity
        style={styles.button}
        onPress={getLocationAndOpenMaps}>
        <MaterialCommunityIcons name="target" size={24} color="#5A5A5A" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
 
  button: {
    height: 34,
    width: 34,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // for Android shadow
    shadowOpacity: 0.3, // for iOS shadow
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  }
});
