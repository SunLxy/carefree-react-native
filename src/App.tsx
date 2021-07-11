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
import { SafeAreaView, ScrollView, StatusBar } from 'react-native'
import Animated from './components/Animated'
import RadioDemo from './components/Radio/demo'
import CheckBox from './components/CheckBox/demo'

// import Demo from "./Demo"
// import Demo from "./components/Table/demo"
const App = () => {
  // return <Demo />
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Animated />
        <RadioDemo />
        <CheckBox />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
