import React from 'react'
import { ViewStyle, StyleProp, TextStyle } from 'react-native'

export type ValueType = string | number | undefined

export interface RadioOptionsProps {
  label: string | React.ReactNode | undefined
  value: ValueType
  [k: string]: any
}

export interface CheckRadioProps {
  /** 选择数据 */
  options?: Array<RadioOptionsProps>
  /** 选中颜色 */
  checkColor?: string
  /** 按钮时横向还是竖向 */
  flexDirection?: 'column' | 'row'
  /** 是否可取消 */
  isCancel?: boolean
  /** 选中值 */
  value?: ValueType | ValueType[]
  /** 值 变化事件 */
  onChange?: (v: ValueType | ValueType[], t: any) => void
  /** 选中图标显示位置 */
  checkAlign?: 'left' | 'right'
  /** 图标的大小 */
  checkSize?: number
  /** 是显示按钮形式还是默认 */
  type?: 'button' | 'default'
  /** 选中时字体颜色 */
  checkFontColor?: string
  /** 每项的按钮样式 */
  itemBtnStyle?: StyleProp<ViewStyle>
  /** 每项的text样式 */
  itemTextStyle?: StyleProp<TextStyle>
  /** 是否禁用 */
  disabled?: boolean
  /** 禁用背景色 */
  disabledBG?: string
  /** 禁用字体颜色 */
  disabledFontColor?: string
  children?: React.ReactNode
  /** 最外层样式 */
  warpSatyle?: StyleProp<ViewStyle>
  /** 每个选项最外层样式 */
  itemWarpStyle?: StyleProp<ViewStyle>
  /** 是否多选 */
  multiple?: boolean
  layout?: 'space' | 'default'
  /** 选中按钮边框样式 */
  checkBorderColor?: string
}

export interface ItemProps {
  /** 选项内容 */
  label?: string | React.ReactNode | undefined
  /** 选中值 */
  /** 当前项 值 */
  value: ValueType
  /** 每项的按钮样式 */
  itemBtnStyle?: StyleProp<ViewStyle>
  /** 每项的text样式 */
  itemTextStyle?: StyleProp<TextStyle>
  /** 是否禁用 */
  disabled?: boolean
  children?: React.ReactNode
  /** 每个选项最外层样式 */
  itemWarpStyle?: StyleProp<ViewStyle>
  /** 选中值 */
  checkValue?: ValueType | ValueType[]
  /** 值 变化事件 */
  onChange?: (v: ItemProps['checkValue'], t: any) => void
  /**  第几个 */
  number?: number | 'first' | 'last'
}

export interface ChildItemProps extends ItemProps {
  /** 选中 颜色 */
  checkColor?: string
  /** 是否可取消 */
  isCancel?: boolean
  /** 按钮时横向还是竖向 */
  flexDirection?: 'column' | 'row'
  /** 选中图标显示位置 */
  checkAlign?: 'left' | 'right'
  /** 图标的大小 */
  checkSize?: number
  /** 是显示按钮形式还是默认 */
  type?: 'button' | 'default'
  /** 选中时字体颜色 */
  checkFontColor?: string
  /** 值 变化事件 */
  onParentChange?: (v: ItemProps['checkValue'], t: any) => void
  /** 禁用背景色 */
  disabledBG?: string
  /** 禁用字体颜色 */
  disabledFontColor?: string
  /** 是否多选 */
  multiple?: boolean
  layout?: 'space' | 'default'
  /** 选中按钮边框样式 */
  checkBorderColor?: string
}
