import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TemperatureType} from '../types';

interface DescriptionPropsType {
  temperature: TemperatureType;
}

const Description = (props: DescriptionPropsType) => {
  const {temperature} = props;

  return (
    <>
      <Text
        style={{
          marginLeft: 20,
          marginBottom: 20,
          fontSize: 20,
          fontWeight: 'bold',
          color: '#fff',
        }}>
        Description
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#e3e3e3',
          width: Dimensions.get('window').width - 40,
          padding: 20,
          borderRadius: 10,
          alignSelf: 'center',
          backgroundColor: '#ffffff26',
        }}>
        <View style={styles.row}>
          <Text style={styles.text}>Nhiệt độ</Text>
          <Text style={styles.text}>{temperature.temperature}°</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Độ ẩm</Text>
          <Text style={styles.text}>{temperature.humidity}%</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Mây che phủ</Text>
          <Text style={styles.text}>{temperature.cloudcover}%</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Gió</Text>
          <Text style={styles.text}>{temperature.wind_speed}km</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Tầm nhìn</Text>
          <Text style={styles.text}>{temperature.visibility}km</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
  },
});

export default Description;
