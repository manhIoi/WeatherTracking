import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
} from 'react-native';
import MapView, {Callout} from 'react-native-maps';
import dimensions from '../constants/dimension';
import {Marker} from 'react-native-maps';
import STATE_DATA from '../data/state';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {setPlace} from '../redux/actions/placeAction';
import {PlaceType, StateType} from '../types';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const PlacesScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [searchInput, setSearchInput] = useState<string>('');
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

  useEffect(() => {
    console.log(searchInput);
  }, [searchInput]);

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.btnSidebar}
          onPress={() => navigation.toggleDrawer()}>
          <Feather name="menu" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Tìm kiếm quoanh đây ?</Text>
        <TouchableOpacity
          style={styles.btnSidebar}
          onPress={() => navigation.navigate('Search Place Screen')}>
          <Feather name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapView
        style={{flex: 1, zIndex: -1}}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnSidebar: {
    padding: 10,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PlacesScreen;