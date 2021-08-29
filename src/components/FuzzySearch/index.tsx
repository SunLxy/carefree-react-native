import React, { useMemo, useState } from 'react'
import {
  View,
  Pressable,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextProps,
} from 'react-native'
import { XIcon } from './../Icons'
import styles from './styles'
import Search, { SearchProps } from './Search'
import ModalLay from '../ModalLay'

export interface FuzzySearchProps extends Omit<SearchProps, 'onRequestClose'> {
  /** 提示 */
  placeholder?: string
  /** 提示 颜色 */
  placeholderColor?: string

  /** 输入框中显示值 */
  value?: string

  /** 清空输入框 */
  isClear?: boolean
  /**  清空图标大小 */
  clearIconSize?: number
  /**  清空图标颜色 */
  clearIconColor?: string

  /** 是否禁用 */
  disabled?: boolean
  /** 禁用显示颜色 */
  disabledColor?: string
  /** 边框 */
  bordered?: boolean
  /** 边框颜色 */
  borderColor?: string
  /** 外层样式 */
  warpStyle?: StyleProp<ViewStyle>
  /** 输入框样式 */
  inputStyle?: StyleProp<ViewStyle>
  /** 输入框文字样式 */
  inputTextStyle?: StyleProp<TextStyle>
  /**输入框文本Text标签属性 */
  inputTextProps?: Omit<TextProps, 'style'>
}
const FuzzySearch: React.FC<FuzzySearchProps> = props => {
  const {
    value,
    placeholder = '请选择',
    placeholderColor = '#ccc',
    clearIconSize = 20,
    clearIconColor = 'rgba(197,197,197,0.7)',
    isClear,
    disabled = false,
    disabledColor,
    bordered = true,
    borderColor = '#d6d6d6',
    warpStyle,
    inputStyle,
    inputTextStyle,
    onCheckValue = () => {},
    ...other
  } = props

  const [visible, setVisible] = useState<boolean>(false)
  // 输入框值显示
  const _redner = useMemo(() => {
    if (value) {
      return value
    }
    return <Text style={{ color: placeholderColor }}>{placeholder}</Text>
  }, [value, placeholder, placeholderColor])

  // 清空图标
  const clearRender = useMemo(() => {
    if (isClear && value && !disabled) {
      return (
        <Pressable
          onPress={() => {
            onCheckValue(undefined)
          }}>
          <XIcon size={clearIconSize} color={clearIconColor} />
        </Pressable>
      )
    }
    return <React.Fragment />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isClear, clearIconSize, clearIconColor, disabled])

  const disabledShowColor = useMemo(() => {
    if (disabledColor && disabled) {
      return { color: disabledColor }
    } else if (disabled) {
      return { opacity: 0.6 }
    }
    return {}
  }, [disabled, disabledColor])

  return (
    <View
      style={[
        styles.warp,
        bordered && styles.warpBorder,
        bordered && { borderColor: borderColor },
        warpStyle,
      ]}>
      <Pressable
        disabled={disabled}
        style={styles.pressable}
        onPress={() => setVisible(true)}>
        <View style={[styles.input, inputStyle]}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[inputTextStyle, disabledShowColor]}>
            {_redner}
          </Text>
        </View>
        {clearRender}
      </Pressable>
      <ModalLay
        visible={visible}
        mode="bottom"
        transparent
        animationType="fade"
        modalHeight="60%"
        onRequestClose={() => setVisible(false)}>
        <Search
          {...other}
          onCheckValue={onCheckValue}
          onRequestClose={() => setVisible(false)}
        />
      </ModalLay>
    </View>
  )
}

export default FuzzySearch
