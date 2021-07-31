import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import rootFont from '../constants/fonts';
import MyDrawer from '../components/MyDrawer';
import ScreensStack from './ScreensStack';
import rootColor from '../constants/color';
import dimensions from '../constants/dimension';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => {
        const {history} = props.state;
        const lastHistory = history[history.length - 1];
        if (lastHistory?.type === 'drawer') {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }

        return <MyDrawer {...props} />;
      }}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#fff',
        drawerLabelStyle: {
          fontFamily: rootFont.semiBold,
          fontSize: 15,
        },
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: '#242424',
          width: dimensions.widthWindow > 400 ? '50%' : '70%',
        },
        sceneContainerStyle: {backgroundColor: '#242424'},
        overlayColor: 'transparent',
      }}>
      <Drawer.Screen name="Screens Stack">
        {props => <ScreensStack isOpen={isOpen} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default MainDrawer;
