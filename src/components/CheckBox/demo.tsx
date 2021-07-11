import React from 'react'
import { SafeAreaView } from 'react-native'
import CheckBox from './'

const VirtualizedListExample = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CheckBox
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
