import React from 'react'
export interface TabBarContextProps {
  active: number | string
  layout: 'default' | 'vertical'
}

export const TabBarContext = React.createContext<TabBarContextProps>({
  active: '',
  layout: 'default',
})

export const useTabBarContext = () => React.useContext(TabBarContext)
