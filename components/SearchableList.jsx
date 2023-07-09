/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable,
} from 'react-native';

//import { Searchbar } from 'react-native-paper';
import { SearchBar } from '@rneui/themed';
import List from './List';
import useCreateSectionList from '../hooks/useCreateSectionList';

export default function SearchableList({
  list, onCancel, onSelect, ...handlers
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const sectionList = useCreateSectionList(list, searchQuery);
  //console.log(sectionList)

  return (
    <View style={styles.container} testID='searchable-list'>

      <View {...handlers}>
        <Text style={styles.info}>Выберите город, чтобы посмотреть меню</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          inputContainerStyle={{height: "100%", backgroundColor: "#efefef", borderRadius: 10}}
          containerStyle={styles.searchBar}
          selectionColor="#ababab"
          placeholder="Искать"
          onChangeText={setSearchQuery}
          value={searchQuery}
          testID='searchBar'
        />
{/*         <Searchbar
          style={styles.searchBar}
          placeholder="Искать"
          onChangeText={setSearchQuery}
          value={searchQuery}
          inputStyle={styles.inputStyle}
          testID='searchBar'
        /> */}
        <Pressable onPress={onCancel} style={styles.cancelBtn}>
          <Text>Отменить</Text>
        </Pressable>
      </View>

      <List list={sectionList} onSelect={onSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
  },
  info: {
    textAlign: 'center',
    padding: 5,
  },
  searchContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
/*   searchBar: {
    flexGrow: 1,
    marginRight: 10,
    height: 40,
  }, */
  searchBar: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginRight: 10,
    height: 40,
    flexGrow: 1,
    backgroundColor: "#ffffff00",
    padding: 0,
  },
  inputStyle: {
    minHeight: 40,
  },
  cancelBtn: {
    alignSelf: 'center',
  },
});
