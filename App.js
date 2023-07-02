import { Text, View, StyleSheet, Button, Pressable, Platform, Modal } from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';

import SearchableList from './components/SearchableList.jsx';

const items = [
  {name: 'Новокузнецк', id: 1},
  {name: 'Кемерово', id: 2},
  {name: 'Новосибирск', id: 3},
  {name: 'Калтан', id: 4},
  {name: 'Томск', id: 5},
  {name: 'Барабинск', id: 6},
  {name: 'Барнаул', id: 7},
  {name: 'Хабаровск', id: 8},
  {name: 'Архангельск', id: 9},
];

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [city, selectCity] = useState(null);

  const onSelect = (cityObj) => {
    selectCity(cityObj);
    setModalVisible(false);
  }

  return (
    <View style={[styles.container, (modalVisible && Platform.OS === "android") ? styles.active : null]}>
      <View>
        <Text>{city?.name || null}</Text>

        <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
          <Text>{!city ? "Выберите город" : "Изменить город"}</Text>
        </Pressable>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle='pageSheet'
        onRequestClose={() => setModalVisible(false)}
      >
        <SearchableList
          visible={modalVisible}
          list={items}
          onCancel={() => setModalVisible(false)}
          onSelect={onSelect}
        />
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    height: "100%"
  },
  active: {
    backgroundColor: "gray"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  }
});