import React, { useEffect } from "react";
import { StyleSheet, View,  } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const Ring = ({ delay, startSize, endSize }) => {
  const ring = useSharedValue(0);

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 1 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [startSize, endSize]),
        },
      ],
      borderWidth: interpolate(ring.value, [0, 1], [2, 0]),
    };
  });

  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 2000,
        }),
        -1,
        false
      )
    );
  }, [delay, ring]);

  return <Animated.View style={[styles.ring, ringStyle]} />;
};

const MarkerIcon = () => {
  return (
    <View style={styles.markerContainer}>
      {/* Replace with your actual marker icon */}
      <MaterialCommunityIcons name="map-marker" size={16} color="black" />
    </View>
  );
};

export default function AnimatedMarker1() {
  return (
    <View style={styles.container}>
      <Ring delay={0} startSize={1} endSize={1.5} />
      <Ring delay={600} startSize={1} endSize={1.75} />
      <Ring delay={1200} startSize={1} endSize={2} />
      <Ring delay={1800} startSize={1} endSize={2.75} />
      <Ring delay={2400} startSize={1} endSize={3.0} />
      <Ring delay={3000} startSize={1} endSize={3.75} />
      <Ring delay={3600} startSize={1} endSize={4.0} />
      <Ring delay={4100} startSize={1} endSize={4.75} />
      <Ring delay={4700} startSize={1} endSize={5.0} />
      

      <MarkerIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    width: 35, // Starting size of the animated rings
    height: 35, // Starting size of the animated rings
    borderRadius: 100, // Ensure it's a circle
    borderColor: "#8AD4B5",
    backgroundColor:"#8AD4B5"
  },
  markerContainer: {
    position: "absolute",
  },
});
