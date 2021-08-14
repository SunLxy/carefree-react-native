import React, { useState, useMemo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native'
import { RadioIcon, CheckMarkIcon } from './../Icons'

export interface RadioOptionsProps {
  label: string | React.ReactNode | undefined
  value: string | number | undefined
  [k: string]: any
}

export interface RadioItemProps {
  /** 选项内容 */
  label?: string | React.ReactNode | undefined
  /** 选中值 */
  checkValue?: string | number | undefined
  /** 当前项 值 */
  value: string | number | undefined
  /** 选中 颜色 */
  radioColor?: string
  /** 是否可取消 */
  isCancel?: boolean
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
  /** 值 变化事件 */
  onChange?: (v: string | number | undefined, t: any) => void
  /** 是否禁用 */
  disabled?: boolean
  /** 禁用背景色 */
  disabledBG?: string
  /** 禁用字体颜色 */
  disabledFontColor?: string
  children?: React.ReactNode
  /** 每个选项最外层样式 */
  itemWarpStyle?: StyleProp<ViewStyle>
}

export interface RadioProps {
  /** 选择数据 */
  options?: Array<RadioOptionsProps>
  /** 选中颜色 */
  radioColor?: string
  /** 按钮时横向还是竖向 */
  flexDirection?: 'column' | 'row'
  /** 是否可取消 */
  isCancel?: boolean
  /** 选中值 */
  value?: string | number | undefined
  /** 值 变化事件 */
  onChange?: (v: string | number | undefined, t: any) => void
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
  children?: React.ReactNode
  /** 最外层样式 */
  warpSatyle?: StyleProp<ViewStyle>
  /** 每个选项最外层样式 */
  itemWarpStyle?: StyleProp<ViewStyle>
}

const checkValueFig = (
  current: string | number | undefined,
  value: string | number | undefined,
) => {
  if (typeof current === 'number') {
    if (typeof value === 'number') {
      return current === value
    }
    return false
  }
  return current === value
}

const Item: React.FC<RadioItemProps> = props => {
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
    radioColor = '#1890ff',
    isCancel = false,
    checkValue,
    disabled = false,
    disabledBG = 'rgba(0,0,0,0.1)',
    disabledFontColor = '#000',
    children,
    itemWarpStyle,
  } = props
  const check = useMemo(() => {
    return checkValueFig(value, checkValue)
  }, [value, checkValue])

  const handleOnValue = () => {
    if (disabled) {
      return
    }
    if (isCancel && check) {
      onChange(undefined, props)
    } else {
      if (!check) {
        onChange(value, props)
      }
    }
  }

  return (
    <View style={[disabled ? { opacity: 0.6 } : {}, itemWarpStyle]}>
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
                backgroundColor: radioColor,
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
              <RadioIcon size={checkSize} color={radioColor} visible={check} />
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
            <View style={{ marginRight: 5 }}>
              <CheckMarkIcon
                size={checkSize}
                color={radioColor}
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

const Radio: React.FC<RadioProps> & { Item: React.FC<RadioItemProps> } =
  props => {
    const {
      value,
      options = [],
      type = 'default',
      checkFontColor = '#000',
      checkSize = 20,
      checkAlign = 'left',
      flexDirection = 'row',
      radioColor = '#1890ff',
      isCancel = false,
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

    const handleValue = (valu: number | string | undefined, item: any) => {
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
            radioColor={radioColor}
            isCancel={isCancel}
            disabled={disabled}
            disabledBG={disabledBG}
            disabledFontColor={disabledFontColor}
            itemTextStyle={itemTextStyle}
            itemBtnStyle={itemBtnStyle}
            {...item}
            key={key}
            checkValue={checkActionValue}
            label={item.label}
            value={item.value}
            onChange={handleValue}
            flexDirection={flexDirection}
            checkAlign={checkAlign}
            checkSize={checkSize}
            type={type}
            checkFontColor={checkFontColor}
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
              radioColor,
              isCancel,
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

Radio.Item = Item

export default Radio
