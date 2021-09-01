import React, { useMemo, useState, useEffect } from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  StyleProp,
  ViewStyle,
  Modal,
  ScrollView,
} from 'react-native'
import { getOptionsValue } from './../utils'
import CheckBox, { CheckBoxProps } from './../CheckBox'
import Radio, { RadioProps } from './../Radio'
import { XIcon, UpIcon, DownIcon } from './../Icons'
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
  checkOther?: CheckBoxProps | RadioProps
}

export interface CheckOptionsProps {
  label: string | React.ReactNode | undefined
  value: string | number | undefined
  [k: string]: any
}
export interface ModalSelectProps {
  visible: boolean
  options: Array<CheckOptionsProps>
  // onChange: (v: string | number | undefined, t: any) => void;
  /** 是否多选 */
  multiple: boolean
  /** 值 */
  value?: Array<string | number> | string | number | undefined
  handleOk: (v: Array<string | number> | string | number | undefined) => void
  handleCancel: () => void
  /** 弹框选择区域高度 */
  height?: number | string
  /** 选中图标显示位置 */
  checkAlign?: 'left' | 'right'
  /** 其他 选项配置 */
  checkOther?: CheckBoxProps | RadioProps
}

const ModalSelect: React.FC<ModalSelectProps> = props => {
  const {
    visible,
    options,
    value,
    multiple,
    handleOk,
    handleCancel,
    height = 400,
    checkOther = {},
    checkAlign,
  } = props
  const [actionValue, setActionValue] = useState(value)
  useEffect(() => {
    setActionValue(value)
  }, [value])

  const handleOnValue = (val: any) => {
    setActionValue(val)
  }

  const handleClose = () => {
    handleCancel()
    setActionValue(value)
  }

  const handleSubmit = () => {
    handleOk(actionValue)
  }

  const _render = () => {
    if (multiple) {
      const val = actionValue as Array<string | number>
      return (
        <CheckBox
          {...checkOther}
          checkAlign={checkAlign}
          warpSatyle={{ flexWrap: 'nowrap' }}
          flexDirection="column"
          value={val}
          options={options}
          onChange={handleOnValue}
        />
      )
    } else {
      const val = actionValue as string | number | undefined
      return (
        <Radio
          {...checkOther}
          checkAlign={checkAlign}
          warpSatyle={{ flexWrap: 'nowrap' }}
          flexDirection="column"
          value={val}
          options={options}
          onChange={handleOnValue}
        />
      )
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleClose}>
      <View style={styles.modal}>
        <View
          style={{
            width: '95%',
            backgroundColor: '#fff',
            height: height,
            borderRadius: 10,
            padding: 10,
          }}>
          <View style={styles.title}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>请选择</Text>
          </View>
          <ScrollView style={{ flex: 1 }}>{_render()}</ScrollView>
          <View style={styles.btnWarp}>
            <TouchableOpacity onPress={handleClose} style={styles.btnColse}>
              <Text style={{ fontSize: 18, color: '#000' }}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.btnOk}>
              <Text style={{ fontSize: 18, color: '#fff' }}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
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
          {
            height: 35,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8,
          },
          style,
          bordered && {
            borderWidth: 0.5,
            borderColor: '#ccc',
            marginHorizontal: 10,
            borderRadius: 5,
          },
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
          <TouchableOpacity
            onPress={handleClean}
            style={{
              height: '100%',
              justifyContent: 'center',
              paddingHorizontal: 3,
            }}>
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
