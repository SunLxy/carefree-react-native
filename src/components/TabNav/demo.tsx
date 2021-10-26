import React from 'react'
import { SafeAreaView, View } from 'react-native'
import TabNav from './'

const Demo = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ margin: 10 }}>
        <TabNav defaultId="23">
          <TabNav.Item id="23">测试1</TabNav.Item>
          <TabNav.Item id="233">测试2</TabNav.Item>
          <TabNav.Item id="234">测试3</TabNav.Item>
        </TabNav>
        <View style={{ marginVertical: 10 }} />
        <TabNav layout="vertical" defaultId="23">
          <TabNav.Item id="23">测试1</TabNav.Item>
          <TabNav.Item id="233">测试2</TabNav.Item>
          <TabNav.Item id="234">测试3</TabNav.Item>
        </TabNav>
        <View style={{ marginVertical: 10 }} />

        <TabNav
          defaultId="233"
          config={[
            { id: '233', title: '测试1' },
            { id: '34', title: '测试2' },
            { id: '23453', title: '测试3' },
            { id: '56', title: '测试4' },
          ]}
        />
      </View>
    </SafeAreaView>
  )
}

export default Demo
