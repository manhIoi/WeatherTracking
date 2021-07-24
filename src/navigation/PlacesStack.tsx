import React from 'react';
import {View, Text} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import PlacesScreen from '../screens/PlacesScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

const PlacesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Places Screen" component={PlacesScreen} />
      <Stack.Screen name="Search Place Screen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default PlacesStack;
