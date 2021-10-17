---
title: FuzzySearch
order: 6
---

### 参数

```ts 
// 组价参数
export interface FuzzySearchProps extends Omit<SearchProps, 'onRequestClose'> {
  /** 提示 */
  placeholder?: string
  /** 提示 颜色 */
  placeholderColor?: string

  /** 输入框中显示值 */
  value?: string

  /** 清空输入框 */
  isClear?: boolean
  /**  清空图标大小 */
  clearIconSize?: number
  /**  清空图标颜色 */
  clearIconColor?: string

  /** 是否禁用 */
  disabled?: boolean
  /** 禁用显示颜色 */
  disabledColor?: string
  /** 边框 */
  bordered?: boolean
  /** 边框颜色 */
  borderColor?: string
  /** 外层样式 */
  warpStyle?: StyleProp<ViewStyle>
  /** 输入框样式 */
  inputStyle?: StyleProp<ViewStyle>
  /** 输入框文字样式 */
  inputTextStyle?: StyleProp<TextStyle>
  /**输入框文本Text标签属性 */
  inputTextProps?: Omit<TextProps, 'style'>
}

// 搜索和展示区域参数
export interface SearchProps {
  /** 模糊查询输入框提示 */
  placeholderSearch?: string
  /** 模糊查询输入框提示 颜色 */
  placeholderColorSearch?: string
  /** 模糊查询输入框默认显示值 */
  searchValue?: string
  /** 模糊查询列表数据选中事件 */
  onCheckValue?: (v: any) => void
  /** 模糊查询输入框输入值变化事件 */
  onSearchValueChange?: (v: string) => void
  /** 模糊查询输入框 点击查询按钮事件 */
  onSearch?: (v: string) => void

  /** 模糊查询列表渲染字段 */
  renderField?: string
  /** 模糊查询列表自定义渲染 */
  render?: (v: any) => React.ReactNode
  /** 列表数据 */
  dataList?: Array<any>

  /** 是否一打开弹框调用一次OnSearch方法或onSearchValueChange方法 */
  isFirstRequest?: boolean

  /** 模糊查询输入框样式  */
  searchInputStyle?: StyleProp<TextStyle>
  /** 模糊查询按钮占据宽度 */
  searchBtnWidth?: number
  /** 查询按钮图标大小 */
  searchIconSize?: number

  /** 关闭弹框 X 图标大小 */
  closeModalIconSize?: number
  closeModalIconColor?: string
  /** 模糊查询列表样式 */
  checkItemStyle?: StyleProp<ViewStyle>
  /** 模糊查询列表字体样式 */
  checkItemTextStyle?: StyleProp<TextStyle>
  /**  加载状态 */
  loading?: boolean
  /**  加载状态 颜色 */
  loadingColor?: string
  /**  加载状态 大小 */
  loadingSize?: 'small' | 'large'

  /** 关闭弹框 */
  onRequestClose?: () => void
}

```

### demo

```js
import React, { useState } from 'react'
import {FuzzySearch} from 'carefree-react-native'
export default () => {
  const [value, setValue] = useState(undefined)
  const [searchValue, setSearchValue] = useState(undefined)

  return (
    <FuzzySearch
      isClear
      value={value}
      searchValue={searchValue}
      loading={false}
      onCheckValue={item => {
        if (item) {
          setValue(item.label)
          setSearchValue(item.value)
        } else {
          setValue(undefined)
          setSearchValue(undefined)
        }
      }}
      dataList={[
        { label: '测试1', value: '1' },
        { label: '测试2', value: '2' },
        { label: '测试3', value: '3' },
      ]}
    />
  )
}

```
