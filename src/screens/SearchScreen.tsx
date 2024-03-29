import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import dimensions from '../constants/dimension';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import STATE_DATA from '../data/state';
import {CityType, StateType} from '../types';
import rootColor from '../constants/color';
import rootFont from '../constants/fonts';
import standardize from '../utils/standardize';

const limit = 2;

const SearchScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [searchInput, setSearchInput] = useState<string>('');
  const [places, setPlaces] = useState<StateType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(true);
  const inputRef = useRef<TextInput>(null);

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
    setIsLoadingPlaces(true);
    if (inputRef.current) {
      clearTimeout(inputRef.current);
    }

    inputRef.current = setTimeout(() => {
      let clonePlaces: StateType[] = [];
      STATE_DATA.forEach(place => {
        let cloneCities: CityType[] = [];

        place.cities.forEach(citi => {
          if (
            standardize(citi.name + place.name).search(
              standardize(searchInput),
            ) > -1 ||
            standardize(place.name + citi.name).search(
              standardize(searchInput),
            ) > -1
          ) {
            cloneCities.push(citi);
          }
        });
        if (cloneCities.length) {
          clonePlaces.push({
            ...place,
            cities: cloneCities,
          });
        }
      });
      setPlaces(clonePlaces);
      setIsLoadingPlaces(false);
    }, 100);
  }, [searchInput]);

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={rootColor.rootColor} />
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
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Nhập nơi bạn muốn tìm kiếm"
            autoFocus
            value={searchInput}
            onChangeText={text => setSearchInput(text)}
          />
        </View>
      </View>
      {isLoadingPlaces && (
        <View
          style={{
            height: dimensions.heighWindow - 60,
            width: dimensions.widthWindow,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={rootColor.rootColor} />
        </View>
      )}
      <FlatList
        style={{width: dimensions.widthWindow}}
        data={places}
        keyExtractor={(item: StateType) => item.name}
        renderItem={({item}) =>
          item.cities.map((citi: CityType, index: number) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Places Screen', {
                  placeSelected: item,
                  cityIndex: index,
                })
              }
              style={styles.placeItem}>
              <Feather
                name="map-pin"
                size={18}
                color="#111"
                style={styles.placeItemIcon}
              />
              <Text style={styles.text}>
                {item.name}, {citi.name}
              </Text>
            </TouchableOpacity>
          ))
        }
      />
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
