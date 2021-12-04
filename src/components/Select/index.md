---
title: Select
order: 13
---

## 下拉选择

### 参数

```ts 
export interface OptionsProps {
  label: string | React.ReactNode | undefined | number
  value: string | number | undefined
  [k: string]: any
}
// 组件参数
export interface SelectProps {
  /** 值 */
  value?: Array<string | number> | string | number | undefined
  /** 选择数据 */
  options?: Array<OptionsProps>
  /** 值变化事件  */
  onChange?: (t: any) => void
  /** 是否多选 */
  multiple?: boolean
  /** 提示 */
  placeholder?: string
  placeholderTextColor?: string
  /** 是否存在清除按钮 */
  isClean?: boolean
  /** 边框 */
  bordered?: boolean
  /** 图标大小 */
  iconSize?: number
  /** 图标颜色 */
  iconColor?: string
  /** 清空图标颜色 */
  cleanColor?: string
  /** 清空图标大小 */
  cleanSize?: number
  /** 样式 */
  style?: StyleProp<ViewStyle>
  /** 禁用 */
  disabled?: boolean
  /** 禁用背景色 */
  disabledBG?: string
  /** 禁用字体颜色*/
  disabledFontColor?: string
  /** 弹框选择区域高度 */
  height?: number | string
  /** 选中图标显示位置 */
  checkAlign?: 'left' | 'right'
  /** 其他 选项配置 */
  checkOther?: Omit<CheckRadioProps, 'multiple'>
}
```

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
