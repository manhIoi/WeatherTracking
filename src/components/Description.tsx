import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TemperatureType} from '../types';
import FontAweSome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialC from 'react-native-vector-icons/MaterialCommunityIcons';

interface DescriptionPropsType {
  temperature: TemperatureType;
}

const Description = (props: DescriptionPropsType) => {
  const {temperature} = props;

  return (
    <>
      <Text style={styles.title}>Description</Text>
      <View style={styles.descriptionContainer}>
        <View style={styles.row}>
          <View style={styles.containerText}>
            <FontAweSome5
              style={styles.icon}
              name="temperature-high"
              color="#fff"
              size={20}
            />
            <Text style={styles.text}>Nhiệt độ</Text>
          </View>
          <Text style={styles.text}>{temperature.temperature}°</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.containerText}>
            <FontAweSome5
              style={styles.icon}
              name="hand-holding-water"
              color="#fff"
              size={20}
            />
            <Text style={styles.text}>Độ ẩm</Text>
          </View>
          <Text style={styles.text}>{temperature.humidity}%</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.containerText}>
            <FontAweSome5
              style={styles.icon}
              name="cloud"
              color="#fff"
              size={20}
            />
            <Text style={styles.text}>Mây che phủ</Text>
          </View>
          <Text style={styles.text}>{temperature.cloudcover}%</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.containerText}>
            <Feather style={styles.icon} name="wind" color="#fff" size={20} />
            <Text style={styles.text}>Gió</Text>
          </View>
          <Text style={styles.text}>{temperature.wind_speed}km</Text>
        </View>

        <View style={[styles.row, {paddingBottom: 0}]}>
          <View style={styles.containerText}>
            <MaterialC
              style={styles.icon}
              name="eye-check-outline"
              size={20}
              color="#fff"
            />
            <Text style={styles.text}>Tầm nhìn</Text>
          </View>
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
    paddingBottom: 10,
  },
  title: {
    marginLeft: 20,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  descriptionContainer: {
    width: Dimensions.get('window').width - 40,
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#ffffff26',
  },
  text: {
    color: '#fff',
    marginLeft: 8,
  },
  containerText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    minWidth: 35,
  },
});

export default Description;
