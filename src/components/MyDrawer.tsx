import React from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerNavigationProp,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import rootFont from '../constants/fonts';
import {useNavigation} from '@react-navigation/native';
import rootColor from '../constants/color';

const MyDrawer = ({...props}: DrawerContentComponentProps) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: rootColor.whiteColor,
            fontFamily: rootFont.extraBold,
            fontSize: 25,
          }}>
          Weather Tracking
        </Text>
      </View>
      <DrawerContentScrollView style={{flex: 1}}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        <DrawerItem
          style={{
            marginBottom: 20,
          }}
          label="Chỉnh sửa"
          icon={() => (
            <Feather name="settings" size={20} color={rootColor.whiteColor} />
          )}
          labelStyle={{
            color: rootColor.whiteColor,
            fontFamily: rootFont.semiBold,
          }}
          onPress={() => navigation.navigate('Choose SCreen', {setting: true})}
        />
      </View>
    </View>
  );
};

export default MyDrawer;