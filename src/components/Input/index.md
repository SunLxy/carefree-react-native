---
title: Input
order: 9
---

## 输入框

> Input 继承 TextInput ,简单处理了 value 数值类型、默认内边距、onChange 事件覆盖 onChangeText (这种方式简单用于form 表单处理数据)

### demo

```js
import React from "react"
import Input from "carefree-react-native"

export default () => {
  const [value, setValue] = React.useState<string | number>(12)
  return <Input value={value} onChange={setValue} />
}
```
