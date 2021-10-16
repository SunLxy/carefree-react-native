import React, { useMemo, useState } from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { getOptionsValue } from './../utils'
import { CheckRadioProps } from '../CheckRadio'
import { XIcon, UpIcon, DownIcon } from './../Icons'
import ModalSelect from './Modal'
import styles from './styles'
export interface OptionsProps {
  label: number | string
  value: number | string
}

export interface SelectProps {
  /** 值 */
  value?: Array<string | number> | string | number | undefined
  /** 选择数据 */
  options?: Array<OptionsProps>
  /** 值变化事件  */
  onChange?: (t: any) => void
  /** 是否多选 */
  multiple?: boolean
  /** 提示 */
  placeholder?: string
  placeholderTextColor?: string
  /** 是否存在清除按钮 */
  isClean?: boolean
  /** 边框 */
  bordered?: boolean
  /** 图标大小 */
  iconSize?: number
  /** 图标颜色 */
  iconColor?: string
  /** 清空图标颜色 */
  cleanColor?: string
  /** 清空图标大小 */
  cleanSize?: number
  /** 样式 */
  style?: StyleProp<ViewStyle>
  /** 禁用 */
  disabled?: boolean
  /** 禁用背景色 */
  disabledBG?: string
  /** 禁用字体颜色*/
  disabledFontColor?: string
  /** 弹框选择区域高度 */
  height?: number | string
  /** 选中图标显示位置 */
  checkAlign?: 'left' | 'right'
  /** 其他 选项配置 */
  checkOther?: Omit<CheckRadioProps, 'multiple'>
}

export interface CheckOptionsProps {
  label: string | React.ReactNode | undefined
  value: string | number | undefined
  [k: string]: any
}

const Select: React.FC<SelectProps> = props => {
  const {
    style,
    value,
    options = [],
    multiple = true,
    placeholder = '请选择',
    placeholderTextColor = '#ccc',
    isClean = true,
    bordered = true,
    cleanColor = 'rgba(197,197,197,0.7)',
    iconColor = '#1890ff',
    iconSize = 20,
    cleanSize = 14,
    disabled = false,
    disabledBG = 'rgba(0,0,0,0.1)',
    disabledFontColor = '#000',
    onChange = () => {},
    checkOther = {},
    height = 400,
    checkAlign = 'right',
  } = props
  const [visible, setVisible] = useState(false)

  const showValue = useMemo(() => {
    return getOptionsValue(value, options, multiple)
  }, [value, options, multiple])

  const render = useMemo(() => {
    if (showValue) {
      return showValue
    }
    return <Text style={{ color: placeholderTextColor }}>{placeholder}</Text>
  }, [placeholder, showValue, placeholderTextColor])

  const handleOk = (
    val: Array<string | number> | string | number | undefined,
  ) => {
    if (onChange) {
      onChange(val)
    }
    setVisible(false)
  }
  const handleClean = () => {
    if (multiple) {
      onChange([])
    } else {
      onChange(undefined)
    }
  }

  return (
    <React.Fragment>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => setVisible(!visible)}
        style={[
          styles.inputWarp,
          style,
          bordered && styles.inputWarpBorder,
          disabled && { backgroundColor: disabledBG },
        ]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            { flex: 1, color: '#000' },
            disabled && { color: disabledFontColor },
          ]}>
          {render}
        </Text>
        {(isClean && showValue && (
          <TouchableOpacity onPress={handleClean} style={styles.clear}>
            <XIcon size={iconSize} color={cleanColor} />
          </TouchableOpacity>
        )) || <React.Fragment />}
        <View style={{ paddingHorizontal: 5, justifyContent: 'center' }}>
          {visible ? (
            <UpIcon size={cleanSize} color={iconColor} />
          ) : (
            <DownIcon size={cleanSize} color={iconColor} />
          )}
        </View>
      </TouchableOpacity>
      {visible && (
        <ModalSelect
          value={value}
          multiple={multiple}
          visible={visible}
          options={options}
          handleOk={handleOk}
          handleCancel={() => setVisible(false)}
          height={height}
          checkOther={checkOther}
          checkAlign={checkAlign}
        />
      )}
    </React.Fragment>
  )
}

export default Select
