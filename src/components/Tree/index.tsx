import React, { useMemo, useState } from 'react'
import { getParentChildKey, getCheckedTrue, getCheckedFalse } from './utils'
import Item from './Item'
import { TreeChildContext } from './useTree'
export interface TreeProps {
  labelField?: string
  valueField?: string
  childrenField?: string
  treeData: Array<any>
  selectAllKeys?: Array<any>
  halfKeys?: Array<any>
  onChange?: (...arg: any) => void
  isCancelParenthalf?: boolean
}

const Tree: React.FC<TreeProps> = props => {
  const {
    labelField = 'label',
    valueField = 'value',
    childrenField = 'children',
    treeData = [],
    isCancelParenthalf = false, // 子集取消选择，父级是否联动取消半选状态
    onChange = () => {},
  } = props
  // 选中
  const [selectAllKeys, setSelectAllKeys] = useState<Array<any>>([])
  // 半选
  const [halfKeys, setHalfKeys] = useState<Array<any>>([])

  const initSelectKeys = useMemo(() => {
    let obj: { halfKeys: Array<any>; selectAllKeys: Array<any> } = {
      selectAllKeys,
      halfKeys,
    }
    if (props.halfKeys) {
      obj.halfKeys = props.halfKeys
    }
    if (props.selectAllKeys) {
      obj.selectAllKeys = props.selectAllKeys
    }
    return obj
  }, [props.halfKeys, props.selectAllKeys, selectAllKeys, halfKeys])

  const initMap = useMemo(() => {
    return getParentChildKey({
      valueField,
      childrenField,
      treeData,
    })
  }, [treeData, valueField, childrenField])
  const { ParentMap, ChildParentMap, ChildDeepParentMap } = initMap

  const getCheckedSatus = (value: any) => {
    if (initSelectKeys.selectAllKeys.includes(value)) {
      return 2
    }
    if (initSelectKeys.halfKeys.includes(value)) {
      return 1
    }
    return 0
  }

  const onCheck = (item: any) => {
    const { [valueField]: value } = item
    const check = getCheckedSatus(value)
    const rowItem: {
      item: any
      check: number
      halfKeys: Array<any>
    } = {
      item,
      check,
      halfKeys: [],
    }
    let result: {
      AllKeys: Array<any>
      HalfKeys: Array<any>
    } = {
      AllKeys: [],
      HalfKeys: [],
    }
    if (check === 2) {
      result = getCheckedFalse({
        selectAllKeys: initSelectKeys.selectAllKeys,
        halfKeys: initSelectKeys.halfKeys,
        key: value,
        ParentMap,
        ChildParentMap,
      })
    } else {
      result = getCheckedTrue({
        selectAllKeys: initSelectKeys.selectAllKeys,
        halfKeys: initSelectKeys.halfKeys,
        key: value,
        ParentMap,
        ChildParentMap,
      })
    }
    if (result && Object.keys(result).length) {
      const { AllKeys, HalfKeys } = result
      let selectKeys = AllKeys
      let halfKey = HalfKeys
      // 判断是否存在子项
      if (check && isCancelParenthalf) {
        const parentKeys = ChildDeepParentMap.get(value)
        halfKey = Array.from(new Set(halfKeys.concat(parentKeys)))
      }
      if (!props.selectAllKeys) {
        setSelectAllKeys(selectKeys)
      }
      if (!props.halfKeys) {
        setHalfKeys(halfKey)
      }
      rowItem.halfKeys = halfKey
      onChange(selectKeys, check, rowItem)
    }
  }
  return (
    <TreeChildContext.Provider
      value={{
        labelField: labelField,
        valueField: valueField,
        childrenField: childrenField,
        onCheck: onCheck,
        getCheckedSatus: getCheckedSatus,
      }}>
      {treeData.map((item, key) => {
        return <Item key={key} item={item} />
      })}
    </TreeChildContext.Provider>
  )
}
export default Tree
