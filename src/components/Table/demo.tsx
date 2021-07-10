import React from 'react'
import { SafeAreaView } from 'react-native'
import Table from './'
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
