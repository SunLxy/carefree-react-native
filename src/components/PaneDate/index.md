---
title: PaneDate
order: 6
---

> 日期面板 只能选择年月日

### 日期面板参数

```ts 
export interface PaneDateProps {
  value?: string
  onChange?: (value: string) => void
}
```

### 案例

```js
import React from 'react'
import { SafeAreaView } from 'react-native'
import {PaneDate} from 'carefree-react-native'

const Demo = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaneDate />
    </SafeAreaView>
  )
}

export default Demo


```
