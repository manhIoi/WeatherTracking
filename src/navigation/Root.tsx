import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import ChooseScreen from '../screens/ChooseScreen';
import MainDrawer from './MainDrawer';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const Root = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Splash Screen" component={SplashScreen} />
      <Stack.Screen
        name="Choose Screen"
        component={ChooseScreen}
        options={{
          headerShown: true,
          title: 'Bạn đang ở đâu ?',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="Main Drawer" component={MainDrawer} />
    </Stack.Navigator>
  );
};

export default Root;
