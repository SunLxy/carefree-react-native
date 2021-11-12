---
title: DatePicker
order: 6
---

> 日期面板 只能选择年月日

### 日期面板参数

```ts 

export interface DatePickerProps {
  value?: string;
  onChange?: (value: string, item: any) => void
}

```

### 案例

```js
import React from 'react'
import { SafeAreaView } from 'react-native'
import {DatePicker} from 'carefree-react-native'

const Demo = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DatePicker />
    </SafeAreaView>
  )
}

export default Demo


```
