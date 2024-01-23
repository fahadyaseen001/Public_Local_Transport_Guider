import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons , FontAwesome5  } from '@expo/vector-icons';

import HomeScreen from '../Screens/homeScreen';
import SearchScreen from '../Screens/SearchScreen';
import FavouriteScreen from '../Screens/FavouriteScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    
      <Tab.Navigator
        initialRouteName="Home" // Add this to ensure Home is the initial tab

        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let IconComponent = Ionicons; // Default to Ionicons

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline'; // Adjusted for home icon
            } else if (route.name === 'Search') {
              IconComponent = FontAwesome5;
              iconName = 'search-location'; 
            } else if (route.name === 'Favourite') {
              iconName = focused ? 'ios-heart' : 'ios-heart-outline'; // Adjusted for settings icon
            } 
            
          
            // Return the icon component
            return <IconComponent  name={iconName} size={size} color={color} />;
          },
          
          tabBarActiveTintColor: '#08B783',
          tabBarInactiveTintColor: '#414141',
          tabBarStyle: {
            backgroundColor: '#ffffff', // Adjust to match your design's background color
            borderTopLeftRadius: 50, // Set the radius size to your preference
            borderTopRightRadius: 50, // Set the radius size to your preference
            height: 50, // Optional: Adjust the height if needed
            position: 'absolute', // Needed to ensure the background doesn't block other elements
            bottom: 0,
            padding: 10,
            zIndex: 8,
            borderTopWidth: 0, // Hide the default border
            elevation: 0, // Remove shadow on Android
          }
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Favourite" component={FavouriteScreen} />
       
      </Tab.Navigator>
   
  );
}

