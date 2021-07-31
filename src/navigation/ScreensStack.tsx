import React, {useState} from 'react';
import {View, Text, Animated} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import DisplayTempScreen from '../screens/DisplayTempScreen';
import PlacesStack from './PlacesStack';
import {useDrawerProgress} from '@react-navigation/drawer';
import {useEffect} from 'react';
import {useRef} from 'react';

const Stack = createStackNavigator();

interface ScreensStackProps {
  isOpen: boolean;
}

const ScreensStack = ({isOpen}: ScreensStackProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const borderRadiusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.timing(scaleAnim, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(borderRadiusAnim, {
        toValue: 20,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(borderRadiusAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  return (
    <Animated.View
      style={{
        flex: 1,
        borderRadius: borderRadiusAnim,
        overflow: 'hidden',
        transform: [
          {
            scale: scaleAnim,
          },
        ],
      }}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Display Temp Screen"
          component={DisplayTempScreen}
        />
        <Stack.Screen name="Places Stack" component={PlacesStack} />
      </Stack.Navigator>
    </Animated.View>
  );
};

export default ScreensStack;
