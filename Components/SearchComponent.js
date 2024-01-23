import React , { useState,useEffect }  from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native'; // Make sure to install @react-navigation/native

const GOOGLE_PLACES_API_KEY = 'AIzaSyA-kcU5fzpAMLYniNWH0nFBZUejg_rhKco'; // Replace this with your actual API key

const SearchComponent = ({ }) => {
  const [address, setAddress] = useState('');
  const [confirmedLatitude, setConfirmedLatitude] = useState(null);
  const [confirmedLongitude, setConfirmedLongitude] = useState(null);
  const navigation = useNavigation();

  const handleLocationSelect = (data, details = null) => {
    const city = details?.address_components?.find(component =>
      component.types.includes('locality')
    )?.long_name;
    if (city === 'Rawalpindi' || city === 'Islamabad') {
      // Navigate to the DestinationConfirmationScreen with selected coordinates
      navigation.navigate('DestinationConfirmationScreen', {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        city: city,
      });
    } else {
      Alert.alert('Service Area Restriction', 'This service is only available in Rawalpindi and Islamabad region.');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const routeParams = navigation.getState().routes.slice(-1)[0].params; 
      console.log('Route Params:', routeParams); // Log the route params

      if (routeParams?.confirmedLatitude && routeParams?.confirmedLongitude) {
        setConfirmedLatitude(routeParams.confirmedLatitude);
        setConfirmedLongitude(routeParams.confirmedLongitude);
        reverseGeocodeLocation(routeParams.confirmedLatitude, routeParams.confirmedLongitude);
      }
    });

    return unsubscribe;
  }, [navigation, confirmedLatitude, confirmedLongitude]);

  const reverseGeocodeLocation = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`
      );
      const json = await response.json();
      console.log('Reverse Geocode Response:', json); // Log the response from the API

      if (json.results && json.results.length > 0) {
        setAddress(json.results[0].formatted_address);

      }
    } catch (error) {
      console.error(error);
    }
  };


 return (
  <View style={styles.container}>
  <View style={styles.searchContainer}>
    <GooglePlacesAutocomplete
      placeholder={"Where do u want to go"}
      onPress={handleLocationSelect}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: 'en',
        components: 'country:pk',
      }}
      styles={{
        textInput: styles.input,
        container: styles.autocompleteContainer,
        listView: styles.listView,
      }}
      fetchDetails={true}
      onFail={error => console.error(error)}
      textInputProps={{
        value: address,
        onChangeText: setAddress,
      }}
    />
        <TouchableOpacity>
          <FontAwesome name="heart-o" size={20} color="#A0A0A0" style={styles.heartIcon} />
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
 
  textInput: {
    height: 50,
    borderColor: '#8AD4B5',
    borderWidth: 1,
    paddingLeft: 10,
  },
  heartIcon: {
    padding:3,
  },
 
   container: {
    padding: 5,
    justifyContent: 'center',
    backgroundColor:'#B9E5D1',
    borderRadius:10,    //// change the corner of the search component
    width:330,
    height: 100,
    alignItems: 'center', 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C2CCDE40',
    borderRadius: 8,
    padding: 10,
    backgroundColor:'#E2F5ED',
    width: 300,
    height: 73,
    zIndex: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color:'#A0A0A0',
  },
  listView: {
    // ... your other listView styles
    position:'absolute',
    zIndex: 10, // this will ensure it stacks on top of other components
    top: 43, // Adjust as needed
    left: 10, // Adjust as needed
    right:0,
  },
});

export default SearchComponent;
