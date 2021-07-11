import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import Radio from './'

const VirtualizedListExample = () => {
  const [value1, setValue1] = useState<string | number | undefined>('')
  const [value2, setValue2] = useState<string | number | undefined>('')
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Radio
        value={value1}
        onChange={value => {
          setValue1(value)
          // eslint-disable-next-line no-console
          console.log(value)
        }}>
        <Radio.Item value="12">单标签</Radio.Item>
        <Radio.Item value="13">单标签</Radio.Item>
      </Radio>
      <Radio
        value={value2}
        onChange={value => {
          setValue2(value)
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
