import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons'; 

// Assuming you have an image called 'bus-icon.png' in your assets folder

const LineComponent = () => {
  return (
    <View style={styles.container}>
    <MaterialCommunityIcons name="bus-side" size={24} color="black" style={styles.icon} />   
    <View style={styles.lineContainer}>
        <View style={styles.dashedLine} />
        <MaterialIcons 
          name="keyboard-arrow-right" 
          size={24} 
          color="black" 
          style={styles.arrow}
        />
      </View>
      <Text style={styles.text}>45 mins</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft:10,
  },
  icon: {marginLeft:45,top:10,
  },
  dashedLine: {
    width: 120, // width of the line
    borderTopWidth: 1, // thickness of the line
    borderTopColor: 'black', // color of the line
    borderStyle: 'dotted', // style of the border
    
  },
  text: {marginLeft:35,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    bottom:10,

  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    marginLeft: -10, // Adjust so that the arrow overlaps the dashed line
  },
});

export default LineComponent;