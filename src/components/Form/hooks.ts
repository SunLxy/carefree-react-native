import React from 'react'
import { ItemWarpProps } from './Item'
export interface FormContextProps extends Omit<ItemWarpProps, 'style'> {
  /** 布局 */
  layout?: 'vertical' | 'horizontal' | 'space'
  /** 输入框外层样式 */
  inputStyle?: ItemWarpProps['style']
  colon?: boolean
  name?: string
  /** 每个 item 下加 下划线 */
  bottomBorder?: boolean
  bottomBorderColor?: string
}

export const FormContext = React.createContext<FormContextProps>({})

export const useFormContext = () => React.useContext(FormContext)
