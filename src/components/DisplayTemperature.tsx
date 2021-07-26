import React from 'react';
import {View, Text} from 'react-native';
import rootFont from '../constants/fonts';
import {TemperatureType} from '../types';

interface DisplayTemperaturePropsType {
  temperature: TemperatureType;
}

const DisplayTemperature = (props: DisplayTemperaturePropsType) => {
  const {temperature} = props;
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{fontSize: 100, color: '#fff', fontFamily: rootFont.regular}}>
        {temperature.temperature}°C
      </Text>
      <Text style={{fontSize: 30, color: '#fff', fontFamily: rootFont.regular}}>
        {temperature.weather_descriptions[0]}
      </Text>
    </View>
  );
};

export default DisplayTemperature;
