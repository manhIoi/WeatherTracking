import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import dimensions from '../constants/dimension';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import STATE_DATA from '../data/state';
import {useState} from 'react';
import {useEffect} from 'react';
import {CityType, StateType} from '../types';
import rootColor from '../constants/color';
import rootFont from '../constants/fonts';
import standardize from '../utils/standardize';

const SearchScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [searchInput, setSearchInput] = useState<string>('');
  const [places, setPlaces] = useState<StateType[]>([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(true);

  const fakeApi = async () => {
    try {
      const test = await new Promise(() => {
        return setTimeout(() => {
          console.log('is Faking');
          setPlaces(STATE_DATA);
          setIsLoadingPlaces(false);
        }, 500);
      });
      console.log('fake done');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initSearchScreen = () => {
      fakeApi();
    };
    initSearchScreen();
  }, []);

  useEffect(() => {
    let clonePlaces: StateType[] = [];
    STATE_DATA.forEach(place => {
      let cloneCities: CityType[] = [];

      place.cities.forEach(citi => {
        if (
          standardize(citi.name + place.name).search(standardize(searchInput)) >
            -1 ||
          standardize(place.name + citi.name).search(standardize(searchInput)) >
            -1
        ) {
          cloneCities.push(citi);
        }
      });
      if (cloneCities) {
        clonePlaces.push({
          ...place,
          cities: cloneCities,
        });
      }
    });
    setPlaces(clonePlaces);
  }, [searchInput]);

  return (
    <View style={styles.screen}>
      <View style={styles.headerBox}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="#fff" size={20} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Feather
            style={{paddingHorizontal: 10}}
            name="search"
            color="gray"
            size={18}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Nhập nơi bạn muốn tìm kiếm"
            autoFocus
            value={searchInput}
            onChangeText={text => setSearchInput(text)}
          />
        </View>
      </View>
      <ScrollView style={{width: dimensions.widthWindow}}>
        {isLoadingPlaces && (
          <View
            style={{
              height: 100,
              width: dimensions.widthWindow,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={rootColor.rootColor} />
          </View>
        )}
        {places &&
          places.map(place =>
            place.cities.map(citi => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Places Screen', {placeSelected: place})
                }
                style={styles.placeItem}>
                <Feather
                  name="map-pin"
                  size={18}
                  color="#111"
                  style={styles.placeItemIcon}
                />
                <Text style={styles.text}>
                  {place.name}, {citi.name}
                </Text>
              </TouchableOpacity>
            )),
          )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 25,
    flex: 1,
  },
  headerBox: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: rootColor.rootColor,
    flexDirection: 'row',
  },
  searchBar: {
    width: dimensions.widthWindow - 150,
    height: 40,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchInput: {
    backgroundColor: '#fff',
    flex: 1,
    fontFamily: rootFont.medium,
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  text: {
    fontFamily: rootFont.regular,
    fontSize: 15,
  },
  placeItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeItemIcon: {
    marginRight: 8,
    backgroundColor: 'lightgray',
    padding: 8,
    borderRadius: 50,
  },
});

export default SearchScreen;
