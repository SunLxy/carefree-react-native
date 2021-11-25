/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import './components/global'
import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import Animated from './components/Animated'
import RadioDemo from './components/Radio/demo'
import CheckBox from './components/CheckBox/demo'
import Select from './components/Select/demo'
import ModalLay from './components/ModalLay'
import Tree from './components/Tree/Demo'
import FuzzySearch from './components/FuzzySearch/demo'
import Card from './components/Card/demo'
import Form from './components/Form/demo'
import Form2 from './components/SimpleForm/demo'
import Input from './components/Input/demo'
import Button from './components/Button/demo'
import TabBar from './components/TabBar/demo'
import TabNav from './components/TabNav/demo'
import Search from './components/Search/demo'
import Swiper from './components/Swiper/demo'
import PaneDate from './components/PaneDate/demo'
import Pagination from './components/Pagination/demo'

// global.Person = "222"
// global.request = (url: RequestInfo, options?: RequestInit) => {
//   // eslint-disable-next-line no-console
//   console.log(url, options)
//   return fetch(url, options)
// }

const App = () => {
  const [visible, setVisible] = useState(false)

  // eslint-disable-next-line no-console
  console.log(global.Person)
  // eslint-disable-next-line no-console
  console.log(global.request('abdc', {}))

  // return <Demo />
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ minHeight: 100 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>动画图标</Text>
          <Animated />
        </View>

        <View style={{ minHeight: 100 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            单选框
          </Text>
          <RadioDemo />
        </View>
        <View style={{ minHeight: 100 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            多选框
          </Text>
          <CheckBox />
        </View>
        <View style={{ minHeight: 100 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            下拉选择框
          </Text>
          <Select />
        </View>
        <View style={{ minHeight: 100 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            模糊查询
          </Text>
          <FuzzySearch />
        </View>
        <Card />
        <TouchableOpacity
          onPress={() => {
            setVisible(true)
          }}
        >
          <Text>点击</Text>
        </TouchableOpacity>
        <ModalLay visible={visible} onRequestClose={() => setVisible(false)} />
        <View style={{ paddingLeft: 20 }}>
          <Tree />
        </View>
        <Button />
        <TabBar />
        <TabNav />
        <Text>输入框</Text>
        <Input />
        <Form />
        <Form2 />
        <Search />
        <Swiper />
        <PaneDate />
        <Pagination />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
