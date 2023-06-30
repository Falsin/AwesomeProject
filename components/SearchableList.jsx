import _ from 'lodash';
import { useMemo, useState } from 'react';
import { View, Text, Modal, StyleSheet, SectionList, TouchableOpacity, ScrollView, Pressable } from 'react-native';

import { Searchbar } from 'react-native-paper';

export default function SearchableList({ visible, list, onCancel, onSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const sectionList = useCreateSectionList(list, searchQuery);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle='pageSheet'
      statusBarTranslucent={false}
    >
      <View style={styles.container}>
        <Text style={styles.info}>Выберите город, чтобы посмотреть меню</Text>

        <View style={styles.searchContainer} >
          <Searchbar
            style={styles.searchBar}
            placeholder="Искать"
            onChangeText={onChangeSearch}
            value={searchQuery}
            inputStyle={{color: "red", margin: 0, padding: 0}}
          />
          <Pressable onPress={onCancel} style={styles.cancelBtn}>
            <Text>Отменить</Text>
          </Pressable>
        </View>

          <List list={sectionList} onSelect={onSelect}/>
      </View>
    </Modal>
  )
}

const useCreateSectionList = (list, searchQuery) => {
  const sortedArr = useMemo(()  => {
    return list.sort((a, b) => a.name.localeCompare(b.name))
  }, [list]);

  const filterArr = useMemo(() => {
    return !searchQuery
      ? sortedArr
      : sortedArr.filter(obj => obj.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [sortedArr, searchQuery])

  return useMemo(() => {
    const obj = {};

    filterArr.forEach(item => {
      if (!obj[item.name.slice(0, 1).toLowerCase()]) {
        obj[item.name.slice(0, 1).toLowerCase()] = [item]
      } else {
        obj[item.name.slice(0, 1).toLowerCase()].push(item)
      }
    });

    return Object.entries(obj).map(([key, arr]) => {
      return {
        title: key,
        data: arr
      }
    })
  }, [filterArr])
}

function List({ list, onSelect}) {
  const renderHeader = ({section: {title}}) => (
    <Text style={styles.header}>{title.toUpperCase()}</Text>
  )

  const renderCityItem = ({item}) => (
    <Pressable onPress={() => onSelect(item)}>
      <View style={styles.item}>
        <Text>{item.name}</Text>
      </View>
    </Pressable>
  )

  return (
    <SectionList
      sections={list}
      keyExtractor={item => item.id}
      renderItem={renderCityItem}
      renderSectionHeader={renderHeader}
      stickySectionHeadersEnabled={true}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
  },
  info: {
    textAlign: "center",
    padding: 5
  },
  searchContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  searchBar: {
    flexGrow: 1,
    marginRight: 10,
    //borderRadius: 10
  },
  cancelBtn: {
    alignSelf: "center"
  },
  header: {
    padding: 15,
    borderBottomWidth: 0.5,
    backgroundColor: "white"
  },
  item: {
    borderBottomWidth: 0.5,
    padding: 15,
  },
})