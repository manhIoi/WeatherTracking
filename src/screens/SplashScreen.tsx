import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, ActivityIndicator} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.screen}>
      <ActivityIndicator style={styles.loading} size="large" color="#e29baa" />
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
