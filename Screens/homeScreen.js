import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";

// import screens
import ExploreButton from "../Components/ExploreButton";
import TargetButton from "../Components/TargetButton";
import SearchComponent from "../Components/SearchComponent";
import AnimatedMarker from "../Components/AnimationMarker1";
import BottomSheet from "../Components/BottomSheet";
import { useLocation } from '../States/LocationContext'; // Import useLocation
import {useDestination} from "../States/DestinationContext";

export default function HomeScreen({}) {
  // Ref for controlling the bottom sheet

  const bottomSheetRef = useRef(null);
  const { locationCoords } = useLocation(); // Access locationCoords from context
  const { toAddress } = useDestination(); // Access locationCoords from context



  // Function to open the bottom sheet
  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home-map.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.markerContainer}>
          <AnimatedMarker />
        </View>
        <View style={styles.buttonsContainer}>
          <ExploreButton style={styles.exploreButton} />
          <TargetButton style={styles.targetButton} />
        </View>
        <View style={styles.SearchContainer}>
          <SearchComponent
          onUpdate={() => {}}
          />
        </View>
      </ImageBackground>
      {/* Button to trigger the bottom sheet */}
      <View style={styles.buttoncontainer}>
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={handleOpenBottomSheet}
      >
        <Text style={styles.buttonText}>Go</Text>
      </TouchableOpacity>
      </View>
      {/* Bottom Sheet Component */}
      <BottomSheet
        ref={bottomSheetRef}
        toAddress={toAddress}
        locationCoords={locationCoords} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  markerContainer: {
    position: "absolute",
    top: 200, // Adjust based on your design
    alignSelf: "center", // Centers the marker on the X-axis
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 300, // Adjust based on your design
  },
  exploreButton: {},
  targetButton: {
    // Additional styling for the Target button
  },
  searchComponent: {},
  SearchContainer: {
    position: "absolute",
    bottom: 200, // Adjust based on your design
    left: 0,
    right: 0,
    alignItems: "center", // Center the search component horizontally

  },

  touchableButton: {
    position: "absolute",
    bottom: 20, // Adjust to position the button under the SearchComponent
    left: 115,
    right: 0,
    height: 45,
    width: 130,
    backgroundColor: "#008955",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, // adjust as necessary to match the provided image
  },
  buttonText: {
    color: "#FFF", // Text color
    fontSize: 16, // Text size
    fontFamily: "Poppins-Regular",
  },
  buttoncontainer:{
    justifyContent: "center",
    alignItems: "center",
  },
});