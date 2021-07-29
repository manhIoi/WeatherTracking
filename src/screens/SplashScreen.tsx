import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import rootColor from '../constants/color';
import rootFont from '../constants/fonts';
import {setPlace} from '../redux/actions/placeAction';

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();

  const initScreen = async () => {
    try {
      const place = await AsyncStorage.getItem('placeDefault');
      if (place) {
        dispatch(setPlace(JSON.parse(place)));
        navigation.replace('Main Drawer');
      } else {
        navigation.replace('Choose Screen');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      initScreen();
    }, 1000);
  }, []);

  return (
    <View style={styles.screen}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.wrapper}>Weather Tracking</Text>
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={rootColor.whiteColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: rootColor.rootColor,
  },
  wrapper: {
    fontFamily: rootFont.bold,
    fontSize: 30,
    color: rootColor.whiteColor,
    marginBottom: 20,
  },
  loading: {},
});

export default SplashScreen;
