---
title: Input
order: 9
---

## 输入框

> Input 继承 TextInput ,简单处理了 value 数值类型、默认内边距、onChange 事件覆盖 onChangeText (这种方式简单用于form 表单处理数据)

### 参数

```ts

export interface InputProps extends Omit<TextInputProps, 'value' | 'onChange'> {
  /** 值 */ 
  value?: string | number;
  /** 边框 */
  bordered?: boolean;
  /** 值更新 */
  onChange?: (value: string | number | undefined) => void;
  /** 外层样式 */
  warpStyle?: StyleProp<ViewStyle>;
  /** 清除图标大小 */ 
  clearSize?: number;
  /** 清除图标颜色 */
  clearColor?: string;
  /** 清除按钮属性 */ 
  clearProps?: TouchableOpacityProps
}

```

### demo

```js
import React from "react"
import Input from "carefree-react-native"

export default () => {
  const [value, setValue] = React.useState<string | number>(12)
  return <Input value={value} onChange={setValue} />
}
```
