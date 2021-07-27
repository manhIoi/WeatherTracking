import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import rootApi from '../api/query';
import removeTones from '../utils/removeTones';
import {useState} from 'react';
import {LocationType, TemperatureType} from '../types';
import dimensions from '../constants/dimension';
import TempItem from '../components/TempItem';
import {useRef} from 'react';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import rootColor from '../constants/color';

const tempClone = {
  cloudcover: 50,
  feelslike: 37,
  humidity: 56,
  is_day: 'no',
  observation_time: '11:53 AM',
  precip: 0,
  pressure: 1000,
  temperature: 32,
  uv_index: 8,
  visibility: 10,
  weather_code: 116,
  weather_descriptions: ['Partly cloudy'],
  weather_icons: [
    'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png',
  ],
  wind_degree: 190,
  wind_dir: 'S',
  wind_speed: 9,
};

const locationClone = {
  country: 'Vietnam',
  lat: '16.068',
  localtime: '2021-07-25 18:53',
  localtime_epoch: 1627239180,
  lon: '108.221',
  name: 'Da Nang',
  region: '',
  timezone_id: 'Asia/Ho_Chi_Minh',
  utc_offset: '7.0',
};

const DisplayTempScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [temperatures, setTemperatures] = useState<TemperatureType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<ScrollView>(null);
  const place = useSelector(state => state.place);

  const fetchWeatherData = async (place: {
    state: any;
    cityIndex: number;
    city: any;
  }) => {
    console.log('is calling');
    setIsLoading(false);
    const result = await place.state.cities.map((city: any) =>
      rootApi.weatherByName(removeTones(city.name)),
    );
    const responsives: any[] = await Promise.all(result);
    console.log(responsives);

    if (responsives.length) {
      if (responsives[responsives.length - 1].data.error) {
        // Alert.alert(
        //   'Error',
        //   responsives[responsives.length - 1].data.error.info,
        // );
      } else {
        const cloneLocations: LocationType[] = [];
        const cloneTemperatures: TemperatureType[] = [];
        responsives.map(responsive => {
          console.log(responsive);

          const {current, location} = responsive.data;
          cloneLocations.push(location);
          cloneTemperatures.push(current);
        });
        console.log(cloneLocations, cloneTemperatures);

        setLocations(cloneLocations);
        setTemperatures(cloneTemperatures);
        ref.current.scrollTo({
          x: place.cityIndex * dimensions.widthWindow,
          y: 0,
          animated: true,
        });
        setIsLoading(true);
      }
    }
  };

  useEffect(() => {
    console.log(place);
    if (place.state.isoCode) {
      fetchWeatherData(place);
    }
  }, [place]);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  useEffect(() => {
    console.log(temperatures);
  }, [temperatures]);
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.headerBox}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.toggleDrawer()}>
          <Feather name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate('Places Stack', {screen: 'Search Place Screen'})
          }>
          <Feather name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {!isLoading && (
        <View style={styles.overLayLoading}>
          <View style={styles.containerLoadding}>
            <Text
              style={{
                color: rootColor.whiteColor,
                marginBottom: 6,
                fontFamily: 'BalooChettan2-SemiBold',
              }}>
              Loadding...
            </Text>
            <ActivityIndicator size="large" color={rootColor.whiteColor} />
          </View>
        </View>
      )}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={ref}>
        {temperatures.length > 0 &&
          temperatures.map((temperature, index) => (
            <TempItem temperature={temperature} location={locations[index]} />
          ))}
      </ScrollView>
    </>

    // <>
    //   <StatusBar
    //     translucent
    //     backgroundColor="transparent"
    //     barStyle="light-content"
    //   />
    //   <View style={styles.headerBox}>
    //     <TouchableOpacity
    //       style={styles.btn}
    //       onPress={() => navigation.toggleDrawer()}>
    //       <Feather name="menu" size={24} color="#fff" />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={styles.btn}
    //       onPress={() =>
    //         navigation.navigate('Places Stack', {screen: 'Search Place Screen'})
    //       }>
    //       <Feather name="search" size={24} color="#fff" />
    //     </TouchableOpacity>
    //   </View>
    //   <ScrollView
    //     horizontal
    //     pagingEnabled
    //     showsHorizontalScrollIndicator={false}
    //     ref={ref}>
    //     <TempItem temperature={tempClone} location={locationClone} />
    //   </ScrollView>
    // </>
  );
};

const styles = StyleSheet.create({
  overLayLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    width: dimensions.widthWindow,
    height: dimensions.heighWindow,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  containerLoadding: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 20,
  },
  headerBox: {
    width: dimensions.widthWindow,
    top: 25,
    height: 65,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DisplayTempScreen;
