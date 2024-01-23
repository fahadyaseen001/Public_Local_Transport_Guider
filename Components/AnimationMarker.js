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
      <MaterialCommunityIcons name="map-marker" size={20} color="black" />
    </View>
  );
};

export default function AnimatedMarker() {
  return (
    <View style={styles.container}>
      <Ring delay={0} startSize={1} endSize={1.5} />
      <Ring delay={600} startSize={1} endSize={1.75} />
      <Ring delay={1200} startSize={1} endSize={2} />
      <Ring delay={1800} startSize={1} endSize={2.75} />
      <Ring delay={2400} startSize={1} endSize={3} />
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
    width: 50, // Starting size of the animated rings
    height: 50, // Starting size of the animated rings
    borderRadius: 75, // Ensure it's a circle
    borderColor: "#08B783",
    backgroundColor:"#08B783"
  },
  markerContainer: {
    position: "absolute",
  },
});
