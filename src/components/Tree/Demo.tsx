import React, { useState } from 'react'
import Tree from '.'

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
