---
title: Table
order: 11
---

> 使用 `FlatList` 进行封装的表格 继承`FlatList`部分参数

### 参数

```ts
// columns 表头单项配置参数
export interface TableItemProps {
  /** 标题 */
  title: string | React.ReactNode;
  /** 展示字段 */
  dataIndex: string;
  /** 宽度 */
  width: number;
  /** 内容展示位置 */
  algin?: 'left' | 'center' | 'right';
  /** 内容样式 */
  style?: StyleProp<ViewStyle>;
  /**自己写渲染 */
  render?: (text: any, record: any, index: number) => React.ReactNode;
}

// 表格传递参数
export interface TableProps
  extends Omit<FlatListProps<any>, 'data' | 'renderItem'> {
  /**展示数据  */
  dataSource: Array<any>;
  /** 表头 */
  columns: Array<TableItemProps>;
  /** 主键 */
  rowKey: string | Function;
  /** 边框颜色 */
  borderColor?: string;
  /** 边框宽度 */
  borderWidth?: number;
  /** 没一项 样式*/
  itemStyle?: StyleProp<ViewStyle>;
  /** 表头样式 */
  titleStyle?: StyleProp<ViewStyle>;
}
```

### demo

```js
import React from 'react'
import { SafeAreaView } from 'react-native'
import {Table} from 'carefree-react-native'
const DATA = Array.from({ length: 100 }).map((_, i) => ({
  key: i,
  a: i,
  b: i,
  c: i,
  d: i,
  e: i,
  f: i,
  g: i,
}))

const columns = [
  {
    title: '表头-1',
    dataIndex: 'a',
    width: 100,
  },
  {
    title: '表头-2',
    dataIndex: 'b',
    width: 100,
  },
  {
    title: '表头-3',
    dataIndex: 'c',
    width: 100,
  },
  {
    title: '表头-4',
    dataIndex: 'd',
    width: 100,
  },
  {
    title: '表头-5',
    dataIndex: 'e',
    width: 100,
  },
  {
    title: '表头-6',
    dataIndex: 'f',
    width: 100,
  },
  {
    title: '表头-7',
    dataIndex: 'g',
    width: 100,
  },
]

const VirtualizedListExample = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Table columns={columns} dataSource={DATA} rowKey="key" />
    </SafeAreaView>
  )
}

export default VirtualizedListExample


```
