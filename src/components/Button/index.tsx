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
  /** 边框 */
  bordered?: boolean
  /** 边框颜色 */
  borderColor?: string
  /** 禁用 字体颜色 */
  disabledColor?: string
}

const Button: React.FC<ButtonProps> & {
  Group: typeof Group
  Item: typeof Item
} = props => {
  const {
    children,
    textStyle,
    style,
    bordered = true,
    borderColor,
    disabled,
    disabledColor = '#ccc',
    ...rest
  } = props
  let childNode = children
  if (['boolean', 'string', 'number'].includes(typeof children)) {
    childNode = (
      <Text
        style={[
          styles.btnText,
          textStyle,
          disabled && { color: disabledColor },
        ]}
      >
        {children}
      </Text>
    )
  }
  if (typeof children === 'function') {
    childNode = children()
  }

  return (
    <TouchableOpacity
      {...rest}
      disabled={disabled}
      style={[
        styles.btn,
        bordered && styles.bordered,
        borderColor && { borderColor: borderColor },
        style,
        disabled && { opacity: 0.5 },
      ]}
    >
      {childNode}
    </TouchableOpacity>
  )
}

Button.Group = Group
Button.Item = Item

export default Button
