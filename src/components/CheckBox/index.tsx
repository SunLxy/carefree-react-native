import React, { useState, useMemo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native'
import { CheckBoxIcon, CheckMarkIcon } from './../Icons'
export interface CheckBoxOptionsProps {
  label: string | React.ReactNode | undefined
  value: string | number | undefined
  [k: string]: any
}

export interface CheckBoxItemProps {
  /** 选项内容 */
  label?: string | React.ReactNode | undefined
  /** 选中值 */
  checkValue?: Array<string | number | undefined>
  /** 当前项 值 */
  value: string | number | undefined
  /** 选中 颜色 */
  checkColor?: string
  /** 按钮时横向还是竖向 */
  flexDirection?: 'column' | 'row'
  /** 选中图标显示位置 */
  checkAlign?: 'left' | 'right'
  /** 图标的大小 */
  checkSize?: number
  /** 是显示按钮形式还是默认 */
  type?: 'button' | 'default'
  /** 选中时字体颜色 */
  checkFontColor?: string
  /** 每项的按钮样式 */
  itemBtnStyle?: StyleProp<ViewStyle>
  /** 每项的text样式 */
  itemTextStyle?: StyleProp<TextStyle>
  /** 是否禁用 */
  disabled?: boolean
  /** 禁用背景色 */
  disabledBG?: string
  /** 禁用字体颜色 */
  disabledFontColor?: string
  /** 值 变化事件 */
  onChange?: (v: Array<string | number | undefined>, t: any) => void
  children?: React.ReactNode
  /** 每个选项最外层样式 */
  itemWarpStyle?: StyleProp<ViewStyle>
}

export interface CheckBoxProps {
  /** 选择数据 */
  options?: Array<CheckBoxOptionsProps>
  /** 选中颜色 */
  checkColor?: string
  /** 按钮时横向还是竖向 */
  flexDirection?: 'column' | 'row'
  /** 选中值 */
  value?: Array<string | number | undefined>
  /** 值 变化事件 */
  /** 选中图标显示位置 */
  checkAlign?: 'left' | 'right'
  /** 图标的大小 */
  checkSize?: number
  /** 是显示按钮形式还是默认 */
  type?: 'button' | 'default'
  /** 选中时字体颜色 */
  checkFontColor?: string
  /** 每项的按钮样式 */
  itemBtnStyle?: StyleProp<ViewStyle>
  /** 每项的text样式 */
  itemTextStyle?: StyleProp<TextStyle>
  /** 是否禁用 */
  disabled?: boolean
  /** 禁用背景色 */
  disabledBG?: string
  /** 禁用字体颜色 */
  disabledFontColor?: string
  /** 选择变更值事件 */
  onChange?: (v: Array<string | number | undefined>, t: any) => void
  children?: React.ReactNode
  /** 最外层样式 */
  warpSatyle?: StyleProp<ViewStyle>
  /** 每个选项最外层样式 */
  itemWarpStyle?: StyleProp<ViewStyle>
}

const Item: React.FC<CheckBoxItemProps> = props => {
  const {
    label,
    value,
    onChange = () => {},
    itemBtnStyle = {},
    itemTextStyle = {},
    type = 'default',
    checkFontColor = '#000',
    checkSize = 20,
    checkAlign = 'left',
    flexDirection = 'row',
    checkColor = '#1890ff',
    checkValue = [],
    disabled = false,
    disabledBG = 'rgba(0,0,0,0.1)',
    disabledFontColor = '#000',
    children,
  } = props
  const check = useMemo(() => {
    return (checkValue || []).includes(value)
  }, [value, checkValue])

  const handleOnValue = () => {
    if (disabled) {
      return
    }
    let list = []
    if (check) {
      list = checkValue.filter(it => it !== value)
      onChange(list, props)
    } else {
      list = (checkValue || []).concat([value])
    }
    onChange(list, props)
  }

  return (
    <View style={disabled ? { opacity: 0.6 } : {}}>
      <TouchableOpacity
        onPress={handleOnValue}
        disabled={disabled}
        style={[
          { marginHorizontal: 5 },
          itemBtnStyle,
          flexDirection === 'column'
            ? {
                paddingVertical: 8,
                borderBottomWidth: 0.5,
                borderBottomColor: '#ccc',
              }
            : {},
          type === 'button'
            ? {
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: '#ccc',
                borderRadius: 5,
                marginVertical: 5,
              }
            : {},
          type === 'button' && check
            ? {
                backgroundColor: checkColor,
                borderColor: 'transparent',
              }
            : {},
          disabled && type === 'button' && { backgroundColor: disabledBG },
        ]}>
        <View
          style={[
            { flexDirection: 'row', alignItems: 'center' },
            checkAlign === 'right'
              ? {
                  justifyContent: 'space-between',
                }
              : {},
          ]}>
          {checkAlign === 'left' && type === 'default' ? (
            <View style={{ marginRight: 5 }}>
              <CheckBoxIcon
                size={checkSize}
                color={checkColor}
                visible={check}
              />
            </View>
          ) : (
            <React.Fragment />
          )}
          <Text
            style={[
              { color: '#000' },
              itemTextStyle,
              disabled ? { color: disabledFontColor } : {},
              check ? { color: checkFontColor } : {},
            ]}>
            {children ? children : label}
          </Text>
          {checkAlign === 'right' && type === 'default' ? (
            <View>
              <CheckMarkIcon
                size={checkSize}
                color={checkColor}
                visible={check}
              />
            </View>
          ) : (
            <React.Fragment />
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
}

const CheckBox: React.FC<CheckBoxProps> & {
  Item: React.FC<CheckBoxItemProps>
} = props => {
  const {
    value,
    options = [],
    type = 'default',
    checkFontColor = '#000',
    checkSize = 20,
    checkAlign = 'left',
    flexDirection = 'row',
    checkColor = '#1890ff',
    onChange,
    itemBtnStyle = {},
    itemTextStyle = {},
    disabled = false,
    disabledBG = 'rgba(0,0,0,0.1)',
    disabledFontColor = '#000',
    children,
    warpSatyle,
    itemWarpStyle,
  } = props

  const [actionValue, setActionValue] = useState(value)
  const checkActionValue = useMemo(() => {
    if (Reflect.has(props, 'value')) {
      return value
    }
    return actionValue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionValue, value])
  const handleValue = (valu: Array<string | number | undefined>, item: any) => {
    if (disabled) {
      return
    }
    if (onChange) {
      onChange(valu, item)
    }
    if (!Reflect.has(props, 'value')) {
      setActionValue(valu)
    }
  }
  const _optionsRender = () => {
    return options.map((item, key) => {
      return (
        <Item
          {...props}
          itemWarpStyle={itemWarpStyle}
          checkColor={checkColor}
          checkValue={checkActionValue}
          key={key}
          label={item.label}
          value={item.value}
          onChange={handleValue}
          flexDirection={flexDirection}
          checkAlign={checkAlign}
          checkSize={checkSize}
          type={type}
          checkFontColor={checkFontColor}
          itemTextStyle={itemTextStyle}
          itemBtnStyle={itemBtnStyle}
          disabled={disabled}
          disabledBG={disabledBG}
          disabledFontColor={disabledFontColor}
        />
      )
    })
  }
  const _children = () => {
    return (
      children &&
      React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            checkColor,
            itemBtnStyle,
            itemTextStyle,
            disabled,
            disabledBG,
            disabledFontColor,
            itemWarpStyle,
            ...(child.props || {}),
            checkValue: checkActionValue,
            flexDirection,
            checkAlign,
            checkSize,
            checkFontColor,
            type,
            onChange: handleValue,
          })
        }
        if (typeof child === 'function') {
          return child()
        }
        return <React.Fragment />
      })
    )
  }
  return (
    <View
      style={[
        { flexWrap: 'wrap', paddingTop: 5 },
        warpSatyle,
        { flexDirection },
      ]}>
      {children ? _children() : _optionsRender()}
    </View>
  )
}

CheckBox.Item = Item

export default CheckBox
