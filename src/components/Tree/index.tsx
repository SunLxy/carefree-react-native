import React, { useMemo } from 'react'
import { Tree as TreeCalss } from 'carefree-utils'
import Item from './Item'
import { TreeChildContext } from './useTree'
import { ValueType } from './interface'
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

  disableId?: (number | string)[]

  /** 选中 触发的事件 */
  onChange?: (
    value: TreeProps['selectAllKeys'],
    /** 0 未选 1 半选  2 选中  */
    checked: { check: boolean; checkHalf: boolean; disabled: boolean },
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
    layout = 'left',
    isRowClick = true,
    disableId = [],
    selectAllKeys = [],
    halfKeys = [],
  } = props
  const [, setUpdate] = React.useState('')
  const initMap = useMemo(() => {
    return new TreeCalss({
      rowKey: valueField,
      childField: childrenField,
      isCancelParenthalf,
      treeData,
      disableId,
      isParentCheck,
      multiple,
      AllKeys: selectAllKeys,
      HalfKeys: halfKeys,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(treeData),
    valueField,
    childrenField,
    isCancelParenthalf,
    isParentCheck,
    multiple,
  ])

  const onCheck = (item: any) => {
    // 只读 只用于展示
    if (isReadOnly) {
      return
    }
    const check = initMap.isCheck(item)
    const isCheckHalf = initMap.isCheckHalf(item)
    const isDisabled = initMap.isDisabled(item)
    const result = initMap.onCheck(item)
    onChange(
      result.AllKeys,
      { check, checkHalf: isCheckHalf, disabled: isDisabled },
      item,
    )
    if (!props.selectAllKeys) {
      // 状态值更新
      setUpdate(new Date().getTime().toString())
    }
  }
  return (
    <TreeChildContext.Provider
      value={{
        labelField: labelField,
        valueField: valueField,
        childrenField: childrenField,
        onCheck: onCheck,
        initMap,
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
