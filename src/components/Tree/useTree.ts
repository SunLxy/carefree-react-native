import React from 'react'
import { TreeChildContextProps } from './interface'
export const TreeChildContext = React.createContext<TreeChildContextProps>({
  labelField: 'label',
  valueField: 'value',
  childrenField: 'children',
  onCheck: () => {},
  getCheckedSatus: () => 0,
  multiple: true,
  isParentCheck: true,
  isReadOnly: false,
})

export const useTreeChild = () => React.useContext(TreeChildContext)
