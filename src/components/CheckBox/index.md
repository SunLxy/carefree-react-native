---
title: CheckBox
order: 3
---

### 参数

> 去除 `multiple` 其他参数与 `CheckRadio` 组件传递参数一致

### demo

```js
import React from 'react'
import { SafeAreaView } from 'react-native'
import {CheckBox} from 'carefree-react-native'

const VirtualizedListExample = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CheckBox
        onChange={value => {
          // eslint-disable-next-line no-console
          console.log(value)
        }}>
        <CheckBox.Item value={12}>单标签</CheckBox.Item>
        <CheckBox.Item value={13}>单标签2</CheckBox.Item>
        <CheckBox.Item value={14}>单标签3</CheckBox.Item>
      </CheckBox>
      <CheckBox
        onChange={value => {
          // eslint-disable-next-line no-console
          console.log('demo--->', value)
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

```
