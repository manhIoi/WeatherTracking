import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ChooseScreen from '../screens/ChooseScreen';
import DisplayTempScreen from '../screens/DisplayTempScreen';
import PlacesScreen from '../screens/PlacesScreen';
import PlacesStack from './PlacesStack';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#fff',
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: '#e29baa',
        drawerInactiveTintColor: '#fff',
        drawerStyle: {backgroundColor: '#e29baa'},
      }}>
      <Drawer.Screen
        name="Display Temp Screen"
        component={DisplayTempScreen}
        options={{drawerLabel: 'Thời tiết'}}
      />
      <Drawer.Screen
        name="Places Stack"
        component={PlacesStack}
        options={{drawerLabel: 'Chọn vị trí'}}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
