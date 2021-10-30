import React from 'react'

export interface ButtonContextProps {
  /** 选中背景色 */
  activeBg?: string
  /** 选中字体颜色背景色  */
  activeColor?: string
  /** 选中边框颜色  */
  activeBorderColor?: string
  /** 布局  分开/合并在一起 */
  layout?: 'space' | 'merge'
  /** 圆角大小 */
  borderRadius?: number
  /** layout===space 按钮间隔宽度  */
  spaceWidth?: number
  active?: number | string
  onChange?: (value: string | number) => void

  /** 是否 开启选中状态 */
  isOpenCheck?: boolean
  bordered?: boolean
  borderColor?: string
}

export const ButtonContext = React.createContext<ButtonContextProps>({
  activeBg: 'transparent',
  activeColor: '#1890ff',
  activeBorderColor: '#1890ff',
  layout: 'merge',
  borderRadius: 3,
  spaceWidth: 10,
  isOpenCheck: false,
  bordered: true,
  borderColor: '#ccc',
})

export const useButtonContext = () => React.useContext(ButtonContext)
