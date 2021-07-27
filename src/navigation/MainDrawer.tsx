import React from 'react';
import {View, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import DisplayTempScreen from '../screens/DisplayTempScreen';
import PlacesStack from './PlacesStack';
import rootFont from '../constants/fonts';
import MyDrawer from '../components/MyDrawer';
import Feather from 'react-native-vector-icons/Feather';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <MyDrawer {...props} />
      )}
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
        options={{
          drawerLabel: 'Thời tiết',
          drawerIcon: ({color, focused}) => (
            <Feather name="cloud" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Places Stack"
        component={PlacesStack}
        options={{
          drawerLabel: 'Chọn vị trí',
          drawerIcon: ({color, focused}) => (
            <Feather name="map" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
