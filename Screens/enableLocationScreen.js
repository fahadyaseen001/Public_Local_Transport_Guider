import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Modal // Import Modal for overlay
} from "react-native";
import AnimatedMarker from "../Components/AnimationMarker";
import { useLocation } from '../States/LocationContext';
import * as Location from "expo-location";

export default function EnableLocationScreen({ navigation }) {
  const { setLocationCoords } = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleUseMyLocation = async () => {
    setIsLoading(true);
  
    let status;
    try {
      const permissionResponse = await Location.requestForegroundPermissionsAsync();
      status = permissionResponse.status;
    } catch (error) {
      console.error("Error requesting location permissions:", error);
      setIsLoading(false);
      Alert.alert("Error", "An error occurred while requesting location permissions. Please try again.");
      return;
    }
  
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Allow location access to use this feature.");
      setIsLoading(false);
      return;
    }
  
    try {
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      };
      
      console.log(coords);
      setLocationCoords(coords);
      navigation.navigate("HomeScreen");
    } catch (error) { 
      console.error("Error getting current position:", error);
      Alert.alert("Error", "Unable to get location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


   

  return (
    <ImageBackground
      source={require("../assets/Map.png")}
      style={styles.backgroundImage}
      blurRadius={1}
    >
      {isLoading && (
        <Modal
          transparent={true}
          animationType="none"
          visible={isLoading}
        >
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <AnimatedMarker />
            </View>
          </View>
        </Modal>
      )}

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <AnimatedMarker />
          <Text style={styles.title}>Enable your location</Text>
          <Text style={styles.subtitle}>
            Choose your location to start finding the nearest local stops around
            you
          </Text>
          <TouchableOpacity
            style={styles.useLocationButton}
            onPress={handleUseMyLocation}
          >
            <Text style={styles.buttonText}>Use My Location</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "85%", // Adjust the width as necessary
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 5,
    height: "80%",
    width: "100%", // Card takes the full width of cardContainer
    // Define a specific height if necessary or let it be determined by its children
  },
  locationIcon: {
    width: 110, // Adjust according to your image
    height: 110, // Adjust according to your image
    marginBottom: 23,
  },
  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 22,
    fontWeight: "bold", // Assuming the title is bold as per the design
    color: "#414141",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#A0A0A0",
    textAlign: "center",
    marginBottom: 30,
  },
  useLocationButton: {
    backgroundColor: "#008955", // Color picked from the image
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    color: "#FFF",
    textAlign: "center",
  },
  skipButton: {},
  skipButtonText: {
    fontFamily: "Poppins-Regular",
    color: "#B8B8B8", // Color picked from the image for the "Skip for now" text
    textAlign: "center",
    marginTop: 20,
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    marginBottom:172,
    display: 'flex',
    justifyContent: 'space-around'
  },
});