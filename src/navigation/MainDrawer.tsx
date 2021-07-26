import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ChooseScreen from '../screens/ChooseScreen';
import DisplayTempScreen from '../screens/DisplayTempScreen';
import PlacesStack from './PlacesStack';
import rootFont from '../constants/fonts';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#fff',
        drawerLabelStyle: {
          fontFamily: rootFont.semiBold,
          fontSize: 15,
        },
        drawerActiveTintColor: '#242424',
        drawerInactiveTintColor: '#fff',
        drawerStyle: {backgroundColor: '#242424'},
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
