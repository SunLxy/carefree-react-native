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
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native'
import Animated from "./components/Animated"

const App = () => {
  return (
    <SafeAreaView >
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <Animated />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
