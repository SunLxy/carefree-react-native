import React, { useMemo, useState } from 'react'
import { getParentChildKey, getCheckedTrue, getCheckedFalse } from './utils'
import Item from './Item'
import { TreeChildContext } from './useTree'
import { ValueType, ValueArrType } from './interface'
export interface TreeProps {
  labelField?: string
  valueField?: string
  childrenField?: string
  treeData: Array<any>
  selectAllKeys?: ValueType | ValueType[]
  halfKeys?: Array<any>
  onChange?: (
    value: TreeProps['selectAllKeys'],
    check: number,
    item: any,
  ) => void
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

const Tree: React.FC<TreeProps> = props => {
  const {
    labelField = 'label',
    valueField = 'value',
    childrenField = 'children',
    treeData = [],
    isCancelParenthalf = false, // 子集取消选择，父级是否联动取消半选状态
    onChange = () => {},
    multiple = true,
    isParentCheck = false,
    isReadOnly = false,
    layout = 'right',
    isRowClick = true,
  } = props
  // 选中
  const [selectAllKeys, setSelectAllKeys] = useState<ValueType | ValueType[]>(
    multiple ? [] : undefined,
  )
  // 半选
  const [halfKeys, setHalfKeys] = useState<Array<ValueType>>([])

  // 对传递的 选中值和半选值进行处理
  const initSelectKeys = useMemo(() => {
    let obj: {
      halfKeys: Array<ValueType>
      selectAllKeys: ValueType | ValueType[]
    } = {
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

  const getCheckedSatus = (value: ValueType) => {
    // 操作单选判断
    if (!multiple) {
      if (
        !Array.isArray(initSelectKeys.selectAllKeys) &&
        value === initSelectKeys.selectAllKeys
      ) {
        return 2
      }
    }
    // 操作多选判断
    if (
      multiple &&
      Array.isArray(initSelectKeys.selectAllKeys) &&
      initSelectKeys.selectAllKeys.includes(value)
    ) {
      return 2
    }
    if (multiple && initSelectKeys.halfKeys.includes(value)) {
      return 1
    }
    return 0
  }

  const onCheck = (item: any) => {
    // 只读 只用于展示
    if (isReadOnly) {
      return
    }
    const { [valueField]: value } = item
    const check = getCheckedSatus(value)
    // 单选操作
    if (!multiple) {
      let saveValue = value
      if (check === 2) {
        saveValue = undefined
      }
      if (!props.selectAllKeys) {
        setSelectAllKeys(saveValue)
      }
      onChange(saveValue, check, item)
      return
    }

    // isParentCheck 不进行父级选中
    if (!isParentCheck) {
      let saveList = initSelectKeys.selectAllKeys as ValueArrType
      if (check === 2) {
        saveList = saveList.filter(it => it !== value)
      } else {
        const list = (initSelectKeys.selectAllKeys as ValueArrType).concat([
          value,
        ])
        saveList = Array.from(new Set(halfKeys.concat(list)))
      }
      if (!props.selectAllKeys) {
        setSelectAllKeys(saveList)
      }
      onChange(saveList, check, item)
      return
    }

    // 下面这些是操作 父级 选中 和 半选
    const rowItem: {
      item: any
      check: number
      halfKeys: Array<ValueType>
    } = {
      item,
      check,
      halfKeys: [],
    }
    let result: {
      AllKeys: Array<ValueType>
      HalfKeys: Array<ValueType>
    } = {
      AllKeys: [],
      HalfKeys: [],
    }
    if (check === 2) {
      result = getCheckedFalse({
        selectAllKeys: initSelectKeys.selectAllKeys as ValueArrType,
        halfKeys: initSelectKeys.halfKeys,
        key: value,
        ParentMap,
        ChildParentMap,
      })
    } else {
      result = getCheckedTrue({
        selectAllKeys: initSelectKeys.selectAllKeys as ValueArrType,
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
        multiple,
        isParentCheck,
        isReadOnly,
        layout,
        isRowClick,
      }}>
      {treeData.map((item, key) => {
        return <Item key={key} item={item} />
      })}
    </TreeChildContext.Provider>
  )
}
export default Tree
