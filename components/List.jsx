/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text, StyleSheet, SectionList, Pressable } from 'react-native';

export default function List({ list, onSelect }) {
  //console.log(list[1])
  const renderHeader = ({section: { title }}) => {

    return <View style={styles.header}>
      <Text style={styles.headerText}>{title.toUpperCase()}</Text>
    </View>
  }

  const renderCityItem = ({item, index, section: { data, sectionId }}) => (
    <Pressable onPress={() => onSelect(item)}>
      <View
        style={[
          styles.item,
          (index === data.length - 1 && sectionId === list.length - 1) ? styles.lastItem : null
        ]}
      >
        <Text testID={`list-item`}>{item.name}</Text>
      </View>
    </Pressable>
  )

  return (
    <SectionList
      testID='list'
      sections={list}
      keyExtractor={item => item.id}
      renderItem={renderCityItem}
      renderSectionHeader={renderHeader}
      stickySectionHeadersEnabled={true}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      initialNumToRender={100}
    />
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    backgroundColor: "white",
  },
  headerText: {
    color: "#ababab",
    fontWeight: "bold"
  },
  item: {
    borderBottomWidth: 1,
    padding: 15,
    borderBottomColor: "#efefef",
    backgroundColor: "white"
  },
  lastItem: {
    borderBottomWidth: 0
  }
})