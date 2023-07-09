/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import {
  Text, View, StyleSheet, Pressable, Modal,
} from 'react-native';
import { useEffect, useState } from 'react';
import _ from 'lodash';

import SearchableList from './components/SearchableList';
import useVerticalSwipe from './hooks/useVerticalSwipe';

const items = [
  { name: 'Новокузнецк', id: 1 },
  { name: 'Кемерово', id: 2 },
  { name: 'Новосибирск', id: 3 },
  { name: 'Калтан', id: 4 },
  { name: 'Томск', id: 5 },
  { name: 'Барабинск', id: 6 },
  { name: 'Барнаул', id: 7 },
  { name: 'Хабаровск', id: 8 },
  { name: 'Архангельск', id: 9 },
  { name: 'Санкт-Петербург', id: 10 },
  { name: 'Нижний Новгород', id: 11 },
  { name: 'Железногорск', id: 12 },
  { name: 'Железногорск', id: 13 }
];

const fetchCities = async () => {
  try {
    const request = await fetch("https://raw.githubusercontent.com/aZolo77/citiesBase/master/cities.json");
    const response = await request.json();
    return response.city
      .filter(cityObj => cityObj.country_id === '3159')
      .map(item => ({
        name: _.trim(item.name),
        id: item.city_id
      }))    
  } catch {
    return null;
  }
}

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [city, selectCity] = useState(null);
  const [cities, setCities] = useState([]);

  const onSelect = (cityObj) => {
    selectCity(cityObj);
    setModalVisible(false);
  };

  useEffect(() => {
    setCitiesArr()
  }, [])

  const setCitiesArr = async () => {
    const arr = await fetchCities();
    setCities(arr || items);
  }

  const [onTouchStart, onTouchMove, onTouchEnd] = useVerticalSwipe(() => setModalVisible(false));

  return (
    <>
      <View style={styles.searchField}>
        <Text>{city?.name || null}</Text>

        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text>{!city ? 'Выберите город' : 'Изменить город'}</Text>
        </Pressable>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <SearchableList
          list={cities}
          onCancel={() => setModalVisible(false)}
          onSelect={onSelect}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  searchField: {
    padding: 10,
    marginTop: 40,
    width: "100%"
  },
  button: {
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    width: "100%"
  },
});