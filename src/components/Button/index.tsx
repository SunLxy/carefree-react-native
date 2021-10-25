/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
} from 'react-native'
import Group from './Group'
import styles from './styles'
import Item from './Item'

export interface ButtonProps extends TouchableOpacityProps {
  /** 只有一个字符串子项 字体样式 */
  textStyle?: StyleProp<TextStyle>
}

const Button: React.FC<ButtonProps> & {
  Group: typeof Group
  Item: typeof Item
} = props => {
  const { children, textStyle, style, ...rest } = props
  let childNode = children
  if (typeof children === 'string') {
    childNode = <Text style={[styles.btnText, textStyle]}>{children}</Text>
  }
  if (typeof children === 'function') {
    childNode = children()
  }

  return (
    <TouchableOpacity {...rest} style={[styles.btn, style]}>
      {childNode}
    </TouchableOpacity>
  )
}

Button.Group = Group
Button.Item = Item

export default Button
