---
title: Pagination
order: 9
---

## 分页

### 参数

```ts
export interface PaginationProps {
   /** 总条数 */
  total: number
  /** 每页数 */
  pageSize: number
  /** 当前页数 */
  page: number
  /** 展示范围 */
  around?: number
  /** 禁用 */
  disabled?: boolean
  /** 禁用颜色 */
  disabledColor?: boolean
  /** 按钮样式 */
  btnStyle?: StyleProp<ViewStyle>
  /** 按钮配置样式 */
  btnProps?: Omit<ButtonProps, 'style'>
  /** 选中字体颜色 */
  checkFontColor?: string
  /** 选中背景色 */
  checkBgColor?: string
  /*** 选中边框颜色 */
  checkBorderColor?: string
  /** 翻页事件 */ 
  onChange?: (page: number) => void
}
```

### demo

```js
import React from 'react'
import { View } from 'react-native'
import {Pagination} from 'carefree-react-native'

export default () => {
  return (
    <React.Fragment>
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <Pagination total={100} page={10} pageSize={5} />
      </View>
    </React.Fragment>
  )
}

```
