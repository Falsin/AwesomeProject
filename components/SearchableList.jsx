import { useEffect, useMemo, useState } from 'react';
import { View, Text, Modal, StyleSheet, SectionList, Pressable } from 'react-native';

import { Searchbar } from 'react-native-paper';

export default function SearchableList({ visible, list, onCancel, onSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    setSearchQuery('');
  }, [visible])

  const sectionList = useCreateSectionList(list, searchQuery);

  const [onTouchStart, onTouchMove, onTouchEnd] = useVerticalSwipe(onCancel);

  return (
    <Modal
      onRequestClose={onCancel}
      visible={visible}
      animationType="slide"
      presentationStyle='pageSheet'
    >
      <View style={styles.container}>

        <View
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Text style={styles.info}>Выберите город, чтобы посмотреть меню</Text>
        </View>

        <View style={styles.searchContainer}>
          <Searchbar
            style={styles.searchBar}
            placeholder="Искать"
            onChangeText={setSearchQuery}
            value={searchQuery}
            inputStyle={{minHeight: 40}}
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

const useVerticalSwipe = (onCancel) => {
  let touchStart = null;
  let touchEnd = null;
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEnd = null;
    touchStart = e.nativeEvent.pageY;
  }

  const onTouchMove = e => touchEnd = e.nativeEvent.pageY;

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return null;

    const distance = touchEnd - touchStart;
    if (distance >= minSwipeDistance) {
      onCancel(false)
    }
  }

  return [onTouchStart, onTouchMove, onTouchEnd];
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

    return Object.entries(obj).map(([key, arr], id) => {
      return {
        title: key,
        data: arr,
        sectionId: id
      }
    })
  }, [filterArr])
}

function List({ list, onSelect }) {
  const renderHeader = ({section: { title }}) => (
    <View style={styles.header}>
      <Text>{title.toUpperCase()}</Text>
    </View>
  )

  const renderCityItem = ({item, index, section: { data, sectionId }}) => (
    <Pressable onPress={() => onSelect(item)}>
      <View
        style={[
          styles.item,
          (index === data.length - 1 && sectionId === list.length - 1) ? styles.lastItem : null
        ]}
      >
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
      keyboardShouldPersistTaps={'handled'}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%"
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
    height: 40
  },
  cancelBtn: {
    alignSelf: "center"
  },
  header: {
    padding: 15,
    borderBottomWidth: 2,
    backgroundColor: "white"
  },
  item: {
    borderBottomWidth: 2,
    padding: 15,
    backgroundColor: "white"
  },
  lastItem: {
    borderBottomWidth: 0
  }
})