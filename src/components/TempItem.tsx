import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {LocationType, TemperatureType} from '../types';
import rootImages from '../assets/images/index';
import dimensions from '../constants/dimension';
import Description from './Description';
import DisplayTemperature from './DisplayTemperature';

interface TempItemProps {
  temperature: TemperatureType;
  location: LocationType;
}

const TempItem = ({temperature, location}: TempItemProps) => {
  return (
    <ImageBackground
      source={
        Math.random() > 0.25
          ? rootImages.first
          : Math.random() > 0.5
          ? rootImages.second
          : Math.random() > 0.75
          ? rootImages.third
          : rootImages.four
      }
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {location && (
            <View
              style={{
                marginTop: dimensions.heightHeaderDisplayTempScreen,
              }}>
              <Text style={[styles.text, {fontSize: 18}]}>
                {location.name} / {location.country}
              </Text>
              <Text style={[styles.text, {fontSize: 16}]}>25/3/2021</Text>
            </View>
          )}
        </View>
        <View style={[styles.center, {flex: 6}]}>
          <DisplayTemperature temperature={temperature} />
        </View>
        <View
          style={{
            flex: 6,
            justifyContent: 'flex-end',
            marginBottom: 30,
          }}>
          <Description temperature={temperature} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: dimensions.widthWindow,
    height: dimensions.heighWindow,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  wrapper: {
    minHeight: dimensions.heightHeaderDisplayTempScreen,
    justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
});

export default TempItem;
