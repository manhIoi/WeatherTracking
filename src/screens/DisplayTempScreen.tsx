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
import {StackNavigationProp} from '@react-navigation/stack';

const DisplayTempScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [temperatures, setTemperatures] = useState<TemperatureType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);
  const place = useSelector(state => state.place);

  const fetchWeatherData = async (place: {
    state: any;
    cityIndex: number;
    city: any;
  }) => {
    console.log('is calling');

    const result = await place.state.cities.map((city: any) =>
      rootApi.weatherByName(removeTones(city.name)),
    );
    const responsives: any[] = await Promise.all(result);
    console.log(responsives);

    if (responsives.length) {
      if (responsives[responsives.length - 1].data.error) {
        Alert.alert(
          'Error',
          responsives[responsives.length - 1].data.error.info,
        );
      } else {
        const cloneLocations = locations;
        const cloneTemperatures = temperatures;
        responsives.map(responsive => {
          console.log(responsive);

          const {current, location} = responsive.data;
          cloneLocations.push(location);
          cloneTemperatures.push(current);
        });
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

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {!isLoading && (
        <View style={styles.overLayLoading}>
          <View style={styles.containerLoadding}>
            <Text style={{color: '#e29baa', marginBottom: 6}}>Loadding...</Text>
            <ActivityIndicator size="large" color="#e29baa" />
          </View>
          <TouchableOpacity
            style={{padding: 10, backgroundColor: 'orange'}}
            onPress={() => navigation.navigate('Places Screen')}>
            <Text>Move to place Screen</Text>
          </TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
  overLayLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    width: dimensions.widthWindow,
    height: dimensions.heighWindow,
  },
  containerLoadding: {
    height: 100,
    width: 100,
    backgroundColor: '#1111119c',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DisplayTempScreen;
