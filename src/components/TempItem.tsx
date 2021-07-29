import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {LocationType, TemperatureType} from '../types';
import rootImages from '../assets/images/index';
import dimensions from '../constants/dimension';
import Description from './Description';
import DisplayTemperature from './DisplayTemperature';
import rootFont from '../constants/fonts';

interface TempItemProps {
  temperature: TemperatureType;
  location: LocationType;
}

const TempItem = ({temperature, location}: TempItemProps) => {
  const randomImage = Math.random();
  let today = new Date();
  const formatDate =
    String(today.getDate()).padStart(2, '0') +
    '/' +
    String(today.getMonth()).padStart(2, '0') +
    '/' +
    String(today.getFullYear()).padStart(2, '0');
  console.log(formatDate);

  return (
    <ImageBackground
      source={
        randomImage < 0.25
          ? rootImages.first
          : randomImage < 0.5
          ? rootImages.second
          : randomImage < 0.75
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
              <Text style={[styles.text, {fontSize: 20}]}>
                {location.name} / {location.country}
              </Text>
              <Text style={[styles.text, {fontSize: 18}]}>{formatDate}</Text>
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
    fontFamily: rootFont.semiBold,
    color: '#fff',
    marginBottom: 5,
  },
});

export default TempItem;
