import React from 'react';
import {View, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import MapView, {Callout} from 'react-native-maps';
import dimensions from '../constants/dimension';
import {Marker} from 'react-native-maps';
import STATE_DATA from '../data/state';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {setPlace} from '../redux/actions/placeAction';
import {PlaceType, StateType} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const PlacesScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const dispatch = useDispatch();

  const viewTemp = async (state: StateType) => {
    const place: PlaceType = {
      state: state,
      city: {},
      cityIndex: 0,
    };
    dispatch(setPlace(place));
    navigation.navigate('Display Temp Screen');
  };

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.btnSidebar}>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => navigation.toggleDrawer()}>
            <Feather name="menu" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Feather name="search" size={18} color="gray" />
          <TextInput placeholder="Tìm kiếm nơi muốn xem" textAlign="center" />
        </View>
      </View>
      {/* Map View */}
      <MapView
        style={{flex: 1}}
        initialCamera={{
          zoom: 7,
          center: {latitude: 21.027, longitude: 105.834},
          pitch: 0.8,
          heading: 0.8,
        }}
        initialRegion={{
          latitude: 21.027,
          longitude: 105.834,
          latitudeDelta: 0.0922,
          longitudeDelta:
            0.0922 + dimensions.widthWindow / dimensions.heighWindow,
        }}>
        {STATE_DATA.map(state => (
          <Marker
            style={{maxWidth: 100, maxHeight: 100, backgroundColor: 'orange'}}
            key={state.isoCode}
            coordinate={{
              latitude: parseFloat(state.latitude),
              longitude: parseFloat(state.longitude),
            }}>
            <Callout onPress={() => viewTemp(state)}>
              <Text
                style={{
                  color: '#e29baa',
                  maxWidth: 100,
                }}>
                Xem thời tiết {state.name}
              </Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 120,
    paddingTop: 25,
    backgroundColor: '#e29baa',
    justifyContent: 'center',
    position: 'relative',
  },
  btnSidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    marginTop: 25,
  },
  inputContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    width: '60%',
    borderRadius: 4,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PlacesScreen;
