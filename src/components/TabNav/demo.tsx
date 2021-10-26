import React from 'react'
import { SafeAreaView, View } from 'react-native'
import TabNav from './'

const Demo = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ margin: 10 }}>
        <TabNav>
          <TabNav.Item id="23">测试1</TabNav.Item>
          <TabNav.Item id="233">测试2</TabNav.Item>
          <TabNav.Item id="234">测试3</TabNav.Item>
        </TabNav>
        <View style={{ marginVertical: 10 }} />
        <TabNav layout="vertical">
          <TabNav.Item id="23">测试1</TabNav.Item>
          <TabNav.Item id="233">测试2</TabNav.Item>
          <TabNav.Item id="234">测试3</TabNav.Item>
        </TabNav>
        <View style={{ marginVertical: 10 }} />

        <TabNav
          config={[
            { id: '233', children: '测试1' },
            { id: '34', children: '测试2' },
            { id: '23453', children: '测试3' },
            { id: '56', children: '测试4' },
          ]}
        />
      </View>
    </SafeAreaView>
  )
}

export default Demo
