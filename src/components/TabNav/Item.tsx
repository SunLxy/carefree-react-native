import React from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleProp,
  TextStyle,
} from 'react-native'

import { useTabNavContext } from './context'

import styles from './styles'

export interface ItemProps extends TouchableOpacityProps {
  textStyle?: StyleProp<TextStyle>
  id: number | string
  children?: React.ReactNode
}

const Item: React.FC<ItemProps> = props => {
  const { textStyle, id, ...rest } = props
  const {
    active,
    onChange,
    layout,
    defaultBg,
    defaultBorderColor,
    defaultColor,
    checkBg,
    checkColor,
    checkBorderColor,
    borderWidth,
  } = useTabNavContext()
  const check = active === id
  const onPress = () => {
    if (!check) {
      onChange(id)
    }
  }
  const borderWidths = React.useMemo(() => {
    if (layout === 'default') {
      return {
        borderBottomWidth: borderWidth,
      }
    } else if (layout === 'vertical') {
      return {
        borderRightWidth: borderWidth,
      }
    }
    return {}
  }, [borderWidth, layout])

  const borderBottomOrRight = React.useMemo(() => {
    if (layout === 'default') {
      return 'borderBottomColor'
    } else if (layout === 'vertical') {
      return 'borderRightColor'
    }
    return
  }, [layout])

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...rest}
      style={[
        { borderWidth: 0 },
        props.style,
        styles[`${layout}Item`],
        styles[`${layout}${check}Item`],
        styles.item,
        { backgroundColor: check ? checkBg : defaultBg },
        borderBottomOrRight && {
          [borderBottomOrRight]: check ? checkBorderColor : defaultBorderColor,
        },
        borderWidths,
      ]}
      onPress={onPress}
      key={id}>
      <Text style={[textStyle, { color: check ? checkColor : defaultColor }]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  )
}
export default Item
