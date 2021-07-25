import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
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

const SearchScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [searchInput, setSearchInput] = useState<string>('');
  const [places, setPlaces] = useState<StateType[]>([]);

  const fakeApi = async () => {
    try {
      const test = await new Promise(() => {
        return setTimeout(() => {
          console.log('is Faking');
          setPlaces(STATE_DATA);
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
    // filter places
    let clonePlaces: StateType[] = [];
    // console.log(searchInput, '-----------------------------------------------');
    STATE_DATA.forEach(place => {
      let cloneCities: CityType[] = [];

      place.cities.forEach(citi => {
        if (
          (citi.name + ' ' + place.name).search(searchInput) > -1 ||
          (place.name + ' ' + citi.name).search(searchInput) > -1
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
    // console.log(clonePlaces);
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
        {places &&
          places.map(place =>
            place.cities.map(citi => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Places Screen', {placeSelected: place})
                }
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  borderTopWidth: 1,
                  borderColor: 'gray',
                }}>
                <Text>
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
    backgroundColor: '#e29baa',
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
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
});

export default SearchScreen;
