import React from 'react'
import {
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  StyleProp,
} from 'react-native'
import styles from './styles'
import { XIcon } from './../Icons'

export interface InputProps extends Omit<TextInputProps, 'value' | 'onChange'> {
  /** 值 */
  value?: string | number
  /** 边框 */
  bordered?: boolean
  /** 值更新 */
  onChange?: (value: string | number | undefined) => void
  /** 外层样式 */
  warpStyle?: StyleProp<ViewStyle>
  /** 清除图标大小 */
  clearSize?: number
  /** 清除图标颜色 */
  clearColor?: string
  /** 清除按钮属性 */
  clearProps?: TouchableOpacityProps
}

const Input: React.FC<InputProps> = props => {
  const {
    bordered,
    style,
    value,
    warpStyle,
    clearProps,
    clearSize = 20,
    clearColor = 'rgba(0,0,0,0.1)',
    ...rest
  } = props

  const [store, setStore] = React.useState(props.value)
  const state = React.useMemo(() => {
    if (Reflect.has(props, 'value') && value !== undefined && value !== null) {
      return value
    }
    return store
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, store])

  const values = React.useMemo(() => {
    if (typeof state === 'number') {
      return `${state}`
    }
    return state || ''
  }, [state])

  const onChangeText = (target: string | number | undefined) => {
    if (props.onChange) {
      props.onChange(target)
    }
    setStore(target)
  }
  const clearValue = React.useMemo(() => {
    if (values && `${values}`.length) {
      return (
        <TouchableOpacity
          activeOpacity={1}
          {...clearProps}
          style={[styles.closeBtn, clearProps.style]}
          onPress={() => onChangeText(undefined)}>
          <XIcon size={clearSize} color={clearColor} />
        </TouchableOpacity>
      )
    }
    return <React.Fragment />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  return (
    <View style={[styles.warp, warpStyle, bordered && styles.border]}>
      <TextInput
        {...rest}
        onChange={va => {
          return va
        }}
        onChangeText={onChangeText}
        value={values}
        style={[styles.input, style, { borderWidth: 0, flex: 1 }]}
      />
      {clearValue}
    </View>
  )
}

export default Input
