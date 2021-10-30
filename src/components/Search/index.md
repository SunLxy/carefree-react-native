---
title: Search
order: 6
---

> 在模糊查询组件[FuzzySearch](/components/fuzzy-search)中使用

## 模糊查询输入框

### 参数

```ts 
export interface SearchProps {
  /** 整个外层样式 **/
  warpProps?: ViewProps
  /** 查询输内容区域外层View样式 */
  bodyWarpProps?: ScrollViewProps
  /** 查询输入框整体外层View样式 */
  searchWarpStyle?: StyleProp<ViewStyle>
  /** 查询输入框外层View样式 */
  searchInputWarpStyle?: StyleProp<ViewStyle>
  /** 查询输入框属性 */
  searchInputProps?: Omit<InputProps, 'onChange' | 'value'>
  /** 查询按钮属性 */
  buttonProps?: ButtonProps
  buttonText?: React.ReactNode
  /** 内容展示区域 */
  children?: React.ReactNode
  /** 底部区域 */
  footer?: React.ReactNode
  /** 输入框值 */
  value?: string | number
  /** 输入框值变更事件 */
  onChange?: (value: string | number | undefined) => void
  /** 点击查询按钮事件 */
  onSearch?: (value: string | number | undefined) => void
  /** 是否显示左侧按钮 */
  leftButton?: boolean
  /** 左侧按钮属性 */
  leftButtonProps?: ButtonProps
  /** 左侧按钮内容 */
  leftButtonText?: React.ReactNode
  /** 左侧按钮事件 */
  leftOnPress?: () => void
}

```

### demo

```js
import {Search} from 'carefree-react-native'
import React from 'react'
import { View, Text } from 'react-native'
export default () => {
  return (
    <React.Fragment>
      <Search>
        <View>
          <Text>测试展示</Text>
        </View>
      </Search>
    </React.Fragment>
  )
}


```
