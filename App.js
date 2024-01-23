//App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';

// Screens 
import OnboardingScreen from './Screens/onboardingscreen1'; // Adjust the path as needed
import OnboardingScreen2 from './Screens/onboardingscreen2';
import OnboardingScreen3 from './Screens/onboardingscreen3';
import EnableLocationScreen from './Screens/enableLocationScreen';
import HomeScreen from './Screens/homeScreen';
import DestinationConfirmationScreen from './Screens/DestinationConfirmationScreen';
import RouteMapScreen from './Screens/RouteMapScreen';
import NearStopScreen from './Screens/NearestStop';
import TransportScreen from './Screens/TransportScreen';

// Other components
import { loadFonts } from './Components/Fontloader';
import BottomNavBar from './Components/BottomNavBar';
import { LocationProvider } from './States/LocationContext';
import { DestinationProvider } from './States/DestinationContext';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync(); // Prevent auto-hiding the splash screen

 export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts(); // Load fonts
        // Load other resources if needed
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync(); // Hide the splash screen
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return null; // Return nothing while fonts are loading
  }

  return (
    <DestinationProvider>
    <LocationProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }} // No header for onboarding screens
        />
       <Stack.Screen
      name="OnboardingScreen2"
      component={OnboardingScreen2}
      options={{ headerShown: false }} // No header for onboarding screens
      />
      <Stack.Screen
      name="OnboardingScreen3"
      component={OnboardingScreen3}
      options={{ headerShown: false }} // No header for onboarding screens
      />
       <Stack.Screen
      name="EnableLocationScreen"
      component={EnableLocationScreen}
      options={{ headerShown: false }} // No header for onboarding screens
      />
      <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }} // No header for onboarding screens
      />
      <Stack.Screen
      name="DestinationConfirmationScreen"
      component={DestinationConfirmationScreen}
      options={{ headerShown: false }} // No header for onboarding screens
      />
      <Stack.Screen
          name="NearStopScreen"
          component={NearStopScreen}
          options={{ headerShown: false }}
      />
       <Stack.Screen
          name="RouteMapScreen"
          component={RouteMapScreen}
          options={{ headerShown: false }}
      />
       <Stack.Screen
          name="TransportScreen"
          component={TransportScreen}
          options={{ headerShown: false }}
      />
    
      </Stack.Navigator>

    </NavigationContainer>
    </LocationProvider>
    </DestinationProvider>

  );
}



