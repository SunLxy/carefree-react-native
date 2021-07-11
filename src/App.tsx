/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, View, Text } from 'react-native'
import Animated from './components/Animated'
import RadioDemo from './components/Radio/demo'
import CheckBox from './components/CheckBox/demo'
import Select from './components/Select/demo'

// import Demo from "./Demo"
// import Demo from "./components/Table/demo"
const App = () => {
  // return <Demo />
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ height: 100 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>动画图标</Text>
          <Animated />
        </View>

        <View style={{ height: 100 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            单选框
          </Text>
          <RadioDemo />
        </View>
        <View style={{ height: 100 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            多选框
          </Text>
          <CheckBox />
        </View>
        <View style={{ height: 100 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            下拉选择框
          </Text>
          <Select />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
