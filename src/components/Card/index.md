---
title: Card
order: 2
---


### 参数

```ts
// 组件参数
export interface CardProps {
  /** 外层 View 样式 */
  warpStyle?: StyleProp<ViewStyle>
  /** 卡片标题 title */
  title?: React.ReactNode | string
  /** 标题 View 样式 */
  titleStyle?: StyleProp<ViewStyle>
  /** 标题 Text 样式 */
  titleTextStyle?: StyleProp<TextStyle>
  /** 渲染数据 列表  */
  list?: Array<ItemProps>
  itemWarpStyle?: StyleProp<ViewStyle>
  /** 公共的 item 样式 */
  comItemStyle?: StyleProp<ViewStyle>
  /** 公共 的 label 样式 */
  comLabelStyle?: StyleProp<TextStyle>
  /** 公共 的 value 样式 */
  comValueStyle?: StyleProp<TextStyle>
}

// 组件 list 参数数据参数
interface ItemProps {
  /** 名称 */
  label?: string
  /** 内容 */
  value?: string | number | boolean | undefined
  /** 自定义 渲染 ，如果存在 render 字段 则以渲染 render ,如果 render 是一个字符串 取 label 的 labelTextStyle 样式 渲染字 */
  render?: React.ReactNode | string
  /** 名称 Text 样式 */
  labelTextStyle?: StyleProp<TextStyle>
  /** 内容 Text 样式 */
  valueTextStyle?: StyleProp<TextStyle>
  /** 当前这个 Item 占据宽度 默认 50% */
  width?: string | number
  /** 最右侧显示内容 */
  right?: React.ReactNode | string
  /** 每一小项 View 样式  */
  style?: StyleProp<ViewStyle>
}


```

### demo

```js
import React from 'react'
import {Card} from 'carefree-react-native'

export default () => {
  return (
    <React.Fragment>
      <Card
        list={[
          { label: '测试：', value: '33' },
          { label: '测试：', value: '22' },
          { label: '测试：', value: '222' },
          { label: '测试：', value: '323' },
        ]}
      />
      <Card
        title="啊哈哈哈"
        list={[
          { label: '测试：', value: '44' },
          { label: '测试：', value: '22' },
          { label: '测试：', value: '222' },
          { label: '测试：', value: '323' },
        ]}
      />
      <Card />
    </React.Fragment>
  )
}

```
