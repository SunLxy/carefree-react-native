import React from 'react'
import { ItemWarpProps } from './Item'
export interface FormContextProps extends Omit<ItemWarpProps, 'style'> {
  /** 布局 */
  layout?: 'vertical' | 'horizontal'
  /** 输入框外层样式 */
  inputStyle?: ItemWarpProps['style']
  /** 是否有边框   */
  bordered?: boolean
  colon?: boolean
  name?: string
}

export const FormContext = React.createContext<FormContextProps>({})

export const useFormContext = () => React.useContext(FormContext)
