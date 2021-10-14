import React, { useState } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import Radio from './'

type ValueType = string | number | undefined

const VirtualizedListExample = () => {
  const [value1, setValue1] = useState<ValueType | ValueType[]>('')
  const [value2, setValue2] = useState<ValueType | ValueType[]>('')
  const [value3, setValue3] = useState<ValueType | ValueType[]>('')
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
        <Radio.Item value="13">单标签2</Radio.Item>
      </Radio>
      <View style={{ paddingLeft: 20 }}>
        <Text>单个Item标签</Text>
        <View style={{ flexDirection: 'row' }}>
          <Radio.Item checkValue={value3} onChange={setValue3} value="13">
            单个标签1
          </Radio.Item>
          <Radio.Item checkValue={value3} onChange={setValue3} value="14">
            单个标签2
          </Radio.Item>
          <Radio.Item checkValue={value3} onChange={setValue3} value="15">
            单个标签3
          </Radio.Item>
        </View>
      </View>
      <Radio
        value={value2}
        onChange={value => {
          setValue2(value)
          // eslint-disable-next-line no-console
          console.log('value2-----', value)
        }}
        options={[
          { label: '哈哈1', value: '1' },
          { label: '哈哈2', value: '2' },
          { label: '哈哈3', value: '3' },
          { label: '哈哈4', value: '4' },
        ]}
      />
    </SafeAreaView>
  )
}

export default VirtualizedListExample
