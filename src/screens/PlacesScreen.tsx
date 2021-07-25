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
import {useNavigation, useRoute} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {setPlace} from '../redux/actions/placeAction';
import {PlaceType, StateType} from '../types';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import MyMarker from '../components/MyMarker';
import {useRef} from 'react';

const PlacesScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const dispatch = useDispatch();
  const route = useRoute();
  const {params} = route;
  const [selectedPlace, setSelectedPlace] = useState<StateType | null>(
    params !== undefined ? params.placeSelected : null,
  );
  const refMapView = useRef<MapView>(null);

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
    if (params) {
      if (params.placeSelected) {
        console.log('set Param', params.placeSelected);
        setSelectedPlace({
          ...params.placeSelected,
        });
      }
    }
  }, [params]);

  useEffect(() => {
    console.log(selectedPlace);
    if (selectedPlace?.isoCode) {
      console.log('???', refMapView);
      refMapView.current?.animateToRegion({
        latitude: parseFloat(selectedPlace?.latitude),
        longitude: parseFloat(selectedPlace?.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta:
          0.0922 + dimensions.widthWindow / dimensions.heighWindow,
      });
    }
  }, [selectedPlace]);

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
        ref={refMapView}
        style={{flex: 1, zIndex: -1}}
        initialCamera={{
          zoom: 6,
          center: {latitude: 16.749, longitude: 107.185},
          pitch: 0.8,
          heading: 0.8,
        }}
        initialRegion={{
          latitude: 16.749,
          longitude: 107.185,
          latitudeDelta: 0.0922,
          longitudeDelta:
            0.0922 + dimensions.widthWindow / dimensions.heighWindow,
        }}>
        {STATE_DATA.map(state => (
          <MyMarker
            callbackMarker={() => setSelectedPlace(state)}
            state={state}
            callbackCallout={() => viewTemp(state)}
            showCallout={state.isoCode === selectedPlace?.isoCode}
          />
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
