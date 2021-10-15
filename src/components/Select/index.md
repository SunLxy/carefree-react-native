---
title: Select
order: 10
---

### demo

```js
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import {Select} from 'carefree-react-native'

const VirtualizedListExample = () => {
  const [value, setValue] = useState('')
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Select
        value={value}
        onChange={val => {
          setValue(val)
        }}
        options={[
          { label: '哈哈1', value: '1' },
          { label: '哈哈2', value: '2' },
          { label: '哈哈3', value: '3' },
          { label: '哈哈4', value: '4' },
          { label: '哈哈5', value: '5' },
        ]}
      />
    </SafeAreaView>
  )
}

export default VirtualizedListExample

```
