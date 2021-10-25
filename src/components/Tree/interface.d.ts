export interface TreeChildContextProps {
  labelField: string
  valueField: string
  childrenField: string
  onCheck: (...arg: any) => void
  getCheckedSatus: (it: any) => number
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

export interface ItemProps {
  item: any
}
export interface CheckBoxHalfProps {
  checked: number
  onClick?: (...arg: any) => void
}
export interface UpDownProps {
  visible: boolean
}

export type ValueType = number | string | boolean | undefined
export type ValueArrType = ValueType[]