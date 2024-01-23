import React from 'react';
import { View, TouchableOpacity, Text,StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function CustomButton2({ progress, onPress }) {
  const strokeWidth = 4;
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress);

  return (
    <View style={styles.container}>
      <Svg width={64} height={64} style={{ position: 'absolute', transform: [{ rotateZ: '-90deg' }] }}>
        <Circle
          cx="32"
          cy="32"
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#08B783"
          fill="#B9E5D1"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.textStyle}>Go</Text>
      </TouchableOpacity>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#08B783',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  textStyle: {  // Add this style for the text
    color: '#FFF',
    fontFamily:'Poppins-Medium',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
