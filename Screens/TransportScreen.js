import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons,Ionicons  } from '@expo/vector-icons';
import { Divider} from 'react-native-paper';


const TransportScreen = (navigation) => {
  const [selectedTransport, setSelectedTransport] = useState(null);

  const transports = [
    { id: '21NO', name: '21 NO' },
    { id: '26NO', name: '26 NO' },
  
  ];

  const handleSelectTransport = (id) => {
    setSelectedTransport(id);
  };

  const handleSubmit = () => {
    console.log('Selected Transport:', selectedTransport);
  };
  
  const handleBack = () => {
    // Implement your back action
  };

  return (
    
    <View style={styles.container}>
<View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('RouteMapScreen')} style={styles.backButton}>
          <Ionicons name="ios-chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.btntxt}>{"Back"}</Text>

      </View>
      
      <Text style={styles.title}>{"Select Your Local Route Transport"}</Text>
      
      
      <View style={styles.transportContainer}>
        {transports.map((transport) => (
          <TouchableOpacity
            key={transport.id}
            style={[
              styles.transportOption,
              selectedTransport === transport.id && styles.selectedOption,
            ]}
            onPress={() => handleSelectTransport(transport.id)}
          >
            <MaterialCommunityIcons name="van-passenger" size={80} color="black" />
            <Text>{transport.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: "center", 
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:150,
    color:'#5A5A5A',
    fontFamily: "Poppins-Regular",

  },
  transportContainer: {
    flexDirection: 'row',
    
    
  },
  transportOption: {
    width: 150,
    height: 160,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2F5ED',
    borderColor: '#08B783',
    borderWidth: 1,
    borderRadius: 8,
  },
  selectedOption: {
    borderColor: '#08B783',
    borderWidth: 2,
  },
  submitButton: {
    backgroundColor: "#008955", // Color picked from the image
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    marginTop: 130

  },
  submitButtonText: {
    fontFamily: "Poppins-Regular",
    color: "#FFF",
    textAlign: "center",
  },
  header:{
    flexDirection: "row",
    
  }, 
  btntxt:{
    marginTop: 3,
    marginLeft:5,
    fontFamily: "Poppins-Regular",

  }
  
});

export default TransportScreen;
