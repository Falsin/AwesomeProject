import { View, Text, StyleSheet, SectionList, Pressable } from 'react-native';

export default function List({ list, onSelect }) {
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