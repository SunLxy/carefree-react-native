import React from 'react'
import { TextInputProps } from 'react-native'
import { Rule } from 'rc-field-form/lib/interface'
import {
  InternalFormInstance,
  InternalNamePath,
  FormInstance,
} from 'rc-field-form/lib/interface'
import { CheckBoxProps } from './../CheckBox'
import { RadioProps } from './../Radio'
import { SelectProps } from './../Select'
import { ItemProps } from './../Form/Item'
import { CarefreeFormProps } from './../Form'

export type InternalNamePath = (string | number)[]
export type NamePath = string | number | InternalNamePath

export type ItemChildType =
  | 'Custom'
  | 'Input'
  | 'InputNumber'
  | 'Select'
  | 'CheckBox'
  | 'Radio'

export type ItemChildAttr =
  | TextInputProps
  | RadioProps
  | CheckBoxProps
  | SelectProps

/** config 配置项  */
export interface SimpleFormConfigProps {
  /** 类型 */
  type: ItemChildType
  /** formItem 表单 label 值 */
  label?: string | React.ReactNode
  /** formItem 表单 name 值 */
  name?: string | number | (string | number)[]
  /** formItem 表单 其他属性值*/
  itemAttr?: Omit<ItemProps, 'rules' | 'label' | 'name'> & {
    /** 用于当前的Item项是否用于监听，(前提是watchList设置了) */ watch?: boolean
  }
  /** 组件参数 */
  attr?: Partial<ItemChildAttr>
  /** formItem 表单 规则*/
  rules?: Rule[]
  render?: React.ReactNode | ((...arg: any) => React.ReactNode)
}

export interface SimpleFormProps extends CarefreeFormProps {
  config?: SimpleFormConfigProps[]
  children?: React.ReactNode
  /** 监听字段 */
  watchList?: WatchListProps
}

/** 外层嵌套的context的值 */
export interface FormContextProps {
  /** 第一次加载 */
  firstMont?: boolean
  /** 监听字段 */
  watchList?: WatchListProps
  /** Form.useForm() */
  form?: FormInstance<any>
  /**   Form.useForm() 与这个一致 */
  itemRefHook?: FormInstance<any>
}

export type ChildPropsType = (InternalFormInstance | {}) & {
  /** 更新字段值   */
  updateValue: (namePath: InternalNamePath, value: any) => void
}
export interface WatchListProps {
  /** 字段对应的 监听方法 */
  [s: string]: (value: any, formValue?: any, child?: ChildPropsType) => void
}
