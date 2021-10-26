import React from 'react'
export interface TabBarContextProps {
  active: number | string
  onChange: (active: number | string) => void
  layout: 'default' | 'vertical'
  // 默认背景整体颜色
  defaultBg?: string
  // 默认边框颜色
  defaultBorderColor?: string
  // 默认边框颜色
  defaultColor?: string
  // 选中背景颜色
  checkBg?: string
  // 选中字体颜色
  checkColor?: string
  // 选中边框颜色
  checkBorderColor?: string
  // 边框宽度
  borderWidth?: number
}

export const TabNavContext = React.createContext<TabBarContextProps>({
  active: '',
  onChange: () => {},
  layout: 'default',
  borderWidth: 1.5,
  defaultBg: 'transparent',
  defaultBorderColor: '#ccc',
  defaultColor: '#000',
  checkBg: 'transparent',
  checkColor: '#1890ff',
  checkBorderColor: '#1890ff',
})

export const useTabNavContext = () => React.useContext(TabNavContext)
