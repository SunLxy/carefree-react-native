import React from 'react'
import { ItemProps } from './Item'

export interface TabProps extends ItemProps {
  node: React.ReactNode
  key: string
  id: string | number
  // 标题
  title: React.ReactNode | string | number
}

export const parseTabList = (children: React.ReactNode): TabProps[] => {
  return React.Children.toArray(children)
    .map((node: React.ReactNode) => {
      if (React.isValidElement(node)) {
        const { title, id } = node.props
        return {
          key: id,
          ...node.props,
          label: title,
        }
      }
      return null
    })
    .filter(tab => tab)
}
