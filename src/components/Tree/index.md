---
title: Tree
order: 12
---

> 树形选择

### 参数

```ts
export interface TreeProps {
  /**  展示 汉字字段 默认 label */
  labelField?: string
  /**  选中 保存的字段 默认 value */
  valueField?: string
  /** 子项存储的字段 默认 children */
  childrenField?: string
  /** 树形选择数据 */
  treeData: Array<any>
  /** 选中的数据  */
  selectAllKeys?: ValueType | ValueType[]
  /** 半选的数据   */
  halfKeys?: Array<any>
  /** 选中 触发的事件 */
  onChange?: (
    value: TreeProps['selectAllKeys'],
    /** 0 未选 1 半选  2 选中  */
    check: number,
    /**当前选中的item 数据 */
    item: any,
  ) => void
  /** 是否 取消子项 触发取消父级半选 默认 false */
  isCancelParenthalf?: boolean
  // 单选和多选 父级是否可选  是否只用于展示
  /** 多选或单选 */
  multiple?: boolean
  /** 父级是否可选  */
  isParentCheck?: boolean
  /** 是否只用于展示  */
  isReadOnly?: boolean

  /** 选中图标展示位置 */
  layout?: 'left' | 'right'
  isRowClick?: boolean
}


```

### demo

```js
import React, { useState } from 'react'
import {Tree} from 'carefree-react-native'

const initValueData = [
  {
    label: '测试1',
    value: '1',
    children: [
      {
        label: '测试二级1',
        value: '1-0',
        children: [
          {
            label: '测试三级1',
            value: '1-0-0',
            children: [
              {
                label: '测试四级1',
                value: '1-0-0-1',
              },
              {
                label: '测试四级2',
                value: '1-0-0-2',
              },
            ],
          },
          {
            label: '测试三级2',
            value: '1-0-1',
          },
        ],
      },
    ],
  },
  {
    label: '测试2',
    value: '2',
    children: [
      {
        label: '测试二级2',
        value: '2-0',
        children: [
          {
            label: '测试三级3',
            value: '2-0-0',
          },
        ],
      },
      {
        label: '测试二级',
        value: '2-1',
      },
    ],
  },
  {
    label: '测试3',
    value: '3',
    children: [
      {
        label: '测试二级3',
        value: '3-0',
        children: [
          {
            label: '测试三级4',
            value: '3-0-0',
          },
          {
            label: '测试三级5',
            value: '3-0-1',
          },
        ],
      },
      {
        label: '测试二级4',
        value: '3-1',
      },
      {
        label: '测试二级5',
        value: '3-2',
      },
    ],
  },
]
export default () => {
  const [selectAllKeys, setSelectAllKeys] = useState([])
  return (
    <Tree
      onChange={selectAll => {
        // eslint-disable-next-line no-console
        console.log('全选数据', selectAllKeys)
        setSelectAllKeys(selectAll)
      }}
      treeData={initValueData}
    />
  )
}

```
