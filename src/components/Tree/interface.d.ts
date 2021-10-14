export interface TreeChildContextProps {
  labelField: string
  valueField: string
  childrenField: string
  onCheck: (...arg: any) => void
  getCheckedSatus: (it: any) => number
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
