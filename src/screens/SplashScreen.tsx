import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, ActivityIndicator} from 'react-native';
import rootColor from '../constants/color';

const SplashScreen = () => {
  return (
    <View style={styles.screen}>
      <ActivityIndicator
        style={styles.loading}
        size="large"
        color={rootColor.rootColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {},
});

export default SplashScreen;
