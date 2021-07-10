import React from 'react'
import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native'
const DATA = Array.from({ length: 1000 }).map((_, i) => ({ key: i, title: i }))

const numColumns = 5

// 相当于每行返回的数据
const getItemS = (data, index) => {
  if (numColumns > 1) {
    const ret = []
    for (let kk = 0; kk < numColumns; kk++) {
      const item = data[index * numColumns + kk]
      if (item != null) {
        ret.push(item)
      }
    }
    return ret
  } else {
    return data[index]
  }
}

const getItem = (data, index) => {
  return getItemS(data, index)
}
const getItemCount = data => {
  // return data.length;
  if (data) {
    return numColumns > 1 ? Math.ceil(data.length / numColumns) : data.length
  } else {
    return 0
  }
}

const Item = ({ item }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {item.map((it, index) => {
        return (
          <View key={index} style={{ width: 150, borderWidth: 0.5 }}>
            <Text style={{ textAlign: 'center' }}>{it.title}</Text>
          </View>
        )
      })}
    </View>
  )
}
const VirtualizedListExample = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal>
        <View>
          <View style={{ flexDirection: 'row' }}>
            {Array.from({ length: numColumns }).map((_, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: 150,
                    borderLeftWidth: 0.5,
                    borderTopWidth: 0.5,
                    borderRightWidth: numColumns - 1 === index ? 0.5 : 0,
                    borderBottomWidth: 0.5,
                    marginBottom: -0.5,
                  }}>
                  <Text style={{ textAlign: 'center' }}>表头-{index}</Text>
                </View>
              )
            })}
          </View>
          <VirtualizedList
            data={DATA}
            initialNumToRender={10}
            renderItem={Item}
            keyExtractor={item => {
              if (Array.isArray(item)) {
                return item.map(it => it.key).join('-')
              }
              return item.key
            }}
            getItemCount={getItemCount}
            getItem={getItem}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
})
export default VirtualizedListExample
