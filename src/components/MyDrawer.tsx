import React, {useState} from 'react';
import {View, Text, Animated} from 'react-native';
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
import {StyleSheet} from 'react-native';
import dimensions from '../constants/dimension';

const listDrawerItem = [
  {
    name: 'Display Temp Screen',
    label: 'Xem thời tiết',
    icon: (color: string) => <Feather name="cloud" size={20} color={color} />,
  },
  {
    name: 'Places Stack',
    label: 'Chọn vị trí',
    icon: (color: string) => <Feather name="map" size={20} color={color} />,
  },
];

const MyDrawer = ({...props}: DrawerContentComponentProps) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [isFocused, setIsFocused] = useState(0);

  return (
    <Animated.View
      style={{
        flex: 1,
      }}>
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
        {listDrawerItem.map((drawerItem, index) => (
          <DrawerItem
            key={drawerItem.name}
            label={drawerItem.label}
            onPress={() => {
              setIsFocused(index);
              navigation.navigate(drawerItem.name);
            }}
            inactiveTintColor={rootColor.whiteColor}
            activeTintColor={rootColor.rootColor}
            activeBackgroundColor={rootColor.whiteColor}
            labelStyle={styles.label}
            focused={isFocused === index}
            icon={({color}) => drawerItem.icon(color)}
          />
        ))}
      </DrawerContentScrollView>
      <View>
        <DrawerItem
          label="Chỉnh sửa"
          icon={() => (
            <Feather name="settings" size={20} color={rootColor.whiteColor} />
          )}
          labelStyle={{
            color: rootColor.whiteColor,
            fontFamily: rootFont.semiBold,
          }}
          onPress={() => navigation.navigate('Choose Screen', {setting: true})}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: rootFont.semiBold,
    fontSize: 16,
    marginLeft: -12,
  },
});

export default MyDrawer;
