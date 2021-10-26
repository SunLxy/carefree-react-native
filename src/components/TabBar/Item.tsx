import { Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { useTabBarContext } from './context'

export interface ItemProps {
  // 标题
  title: React.ReactNode | string | number
  // 唯一值
  id: number | string
  textStyle?: StyleProp<TextStyle>
  children?: React.ReactNode | string | number
}

const Item: React.FC<ItemProps> = props => {
  const { id } = props
  const { active } = useTabBarContext()
  const check = active === id
  let _render
  if (React.isValidElement(props.children)) {
    _render = props.children
  } else {
    _render = <Text style={props.textStyle}>{props.children}</Text>
  }
  const _re = React.useMemo(() => {
    if (check) {
      return _render
    }
    return <React.Fragment />
  }, [_render, check])

  return <React.Fragment>{_re}</React.Fragment>
}

export default Item
