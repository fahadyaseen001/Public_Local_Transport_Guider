import React from 'react';
import { View, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dottedLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft:10,
    backgroundColor: '#fff',
  },
  dottedLine: {
    width: 130, // width of the line
    borderTopWidth: 1, // thickness of the line
    borderTopColor: 'black', // color of the line
    borderStyle: 'dotted', // style of the border
  },
});

export default App;
