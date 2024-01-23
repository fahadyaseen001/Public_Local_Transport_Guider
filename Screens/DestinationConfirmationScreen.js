import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native'; // Make sure to install @react-navigation/native

const DestinationConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [region, setRegion] = useState({
    latitude: route.params.latitude,
    longitude: route.params.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerPosition, setMarkerPosition] = useState({
    latitude: route.params.latitude,
    longitude: route.params.longitude,
  });

  useEffect(() => {
    setRegion({
      ...region,
      latitude: route.params.latitude,
      longitude: route.params.longitude,
    });
    setMarkerPosition({
      latitude: route.params.latitude,
      longitude: route.params.longitude,
    });
  }, [route.params]);

  const handleConfirmLocation = () => {
    Alert.alert('Location Confirmed', `Latitude: ${markerPosition.latitude}, Longitude: ${markerPosition.longitude}`);
    navigation.navigate('HomeScreen', {
      confirmedLatitude: markerPosition.latitude,
      confirmedLongitude: markerPosition.longitude,
    });
  };


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
      >
        <Marker
          coordinate={markerPosition}
          draggable
          onDragEnd={(e) => setMarkerPosition(e.nativeEvent.coordinate)}
        />
      </MapView>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLocation}>
        <Text style={styles.confirmButtonText}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  confirmButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginBottom: 20, // Adjusted for visibility
  },
  confirmButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default DestinationConfirmationScreen;
