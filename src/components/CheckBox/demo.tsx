import React from 'react'
import { SafeAreaView } from 'react-native'
import CheckBox from './'

const VirtualizedListExample = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CheckBox
        onChange={value => {
          // eslint-disable-next-line no-console
          console.log(value)
        }}>
        <CheckBox.Item value={12}>单标签</CheckBox.Item>
        <CheckBox.Item value={13}>单标签</CheckBox.Item>
        <CheckBox.Item value={14}>单标签</CheckBox.Item>
      </CheckBox>
      <CheckBox
        onChange={value => {
          // eslint-disable-next-line no-console
          console.log(value)
        }}
        options={[
          { label: '哈哈', value: '1' },
          { label: '哈哈', value: '2' },
          { label: '哈哈', value: '3' },
          { label: '哈哈', value: '4' },
          { label: '哈哈', value: '5' },
        ]}
      />
    </SafeAreaView>
  )
}

export default VirtualizedListExample
