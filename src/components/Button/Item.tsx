import React from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleProp,
  TextStyle,
  GestureResponderEvent,
} from 'react-native'
import { useButtonContext } from './context'
import styles from './styles'
export interface ItemProps extends TouchableOpacityProps {
  label: React.ReactNode | Function | string
  value: number | string
  /** 只有一个字符串子项 字体样式 */
  textStyle?: StyleProp<TextStyle>
  /** 第几个 用于按钮组边框设置 */
  number?: number | 'first' | 'last'
}
const Item: React.FC<ItemProps> = props => {
  const { label, textStyle, style, number, value, disabled, ...rest } = props
  const {
    activeBg,
    activeColor,
    activeBorderColor,
    layout,
    borderRadius,
    spaceWidth,
    active,
    onChange,
    isOpenCheck,
    bordered,
    borderColor,
    disabledColor = '#ccc',
  } = useButtonContext()

  // 选中
  const act = isOpenCheck && value === active

  let childNode = label
  if (typeof label === 'string') {
    childNode = (
      <Text
        style={[
          styles.btnText,
          textStyle,
          act && { color: activeColor },
          disabled && { color: disabledColor },
        ]}
      >
        {label}
      </Text>
    )
  }
  if (typeof label === 'function') {
    childNode = label()
  }

  // 圆角问题
  const cxStyle = React.useMemo(() => {
    if (number === 'first' && layout === 'merge') {
      // 左侧圆角
      return {
        borderRadius: 0,
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
      }
    } else if (number === 'last' && layout === 'merge') {
      // 右侧圆角
      return {
        borderRadius: 0,
        borderTopRightRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
      }
    } else if (layout === 'merge') {
      return {
        borderRadius: 0,
      }
    }
    if (layout === 'space' && number !== 'last') {
      return {
        borderRadius: borderRadius,
        marginRight: spaceWidth,
      }
    }
    // 这种 分开
    if (layout === 'space') {
      return {
        borderRadius: borderRadius,
      }
    }
    return {}
  }, [number, layout, borderRadius, spaceWidth])

  const onPress = (event: GestureResponderEvent) => {
    if (props.onPress) {
      props.onPress(event)
    }
    if (isOpenCheck) {
      onChange(value)
    }
  }

  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      disabled={disabled}
      style={[
        { alignItems: 'center', flex: 1 },
        bordered && { borderWidth: 0.5, borderColor: '#ccc' },
        borderColor && { borderColor: borderColor },
        styles.btnItem,
        style,
        cxStyle,
        act && { backgroundColor: activeBg, borderColor: activeBorderColor },
        disabled && { opacity: 0.5 },
      ]}
    >
      {childNode}
    </TouchableOpacity>
  )
}
export default Item
