import React, { useState, useEffect, useMemo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native'
import { RadioIcon, CheckMarkIcon } from './../Icons'

// 1. 单选按钮
// 2. button 形式

export interface RadioOptionsProps {
  label: string | React.ReactNode | undefined;
  value: string | number | undefined;
  [k: string]: any;
}

export interface RadioItemProps {
  /** 选项内容 */
  label?: string | React.ReactNode | undefined;
  /** 选中值 */
  checkValue?: string | number | undefined;
  /** 当前项 值 */
  value: string | number | undefined;
  /** 选中 颜色 */
  radioColor?: string;
  /** 是否可取消 */
  isCancel?: boolean;
  /** 按钮时横向还是竖向 */
  flexDirection?: 'column' | 'row';
  /** 选中图标显示位置 */
  checkAlign?: 'left' | 'right';
  /** 图标的大小 */
  checkSize?: number;
  /** 是显示按钮形式还是默认 */
  type?: 'button' | 'default';
  /** 选中时字体颜色 */
  checkFontColor?: string;
  /** 每项的按钮样式 */
  itemBtnStyle?: StyleProp<ViewStyle>;
  /** 每项的text样式 */
  itemTextStyle?: StyleProp<TextStyle>;
  /** 值 变化事件 */
  onChange: (v: string | number | undefined, t: any) => void;
  children?: React.ReactNode;
}

export interface RadioProps {
  /** 选择数据 */
  options?: Array<RadioOptionsProps>;
  /** 选中颜色 */
  radioColor?: string;
  /** 按钮时横向还是竖向 */
  flexDirection?: 'column' | 'row';
  /** 是否可取消 */
  isCancel?: boolean;
  /** 选中值 */
  value?: string | number | undefined;
  /** 值 变化事件 */
  onChange?: (v: string | number | undefined, t: any) => void;
  /** 选中图标显示位置 */
  checkAlign?: 'left' | 'right';
  /** 图标的大小 */
  checkSize?: number;
  /** 是显示按钮形式还是默认 */
  type?: 'button' | 'default';
  /** 选中时字体颜色 */
  checkFontColor?: string;
  /** 每项的按钮样式 */
  itemBtnStyle?: StyleProp<ViewStyle>;
  /** 每项的text样式 */
  itemTextStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
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
    onChange,
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
    children,
  } = props
  const check = useMemo(() => {
    return checkValueFig(value, checkValue)
  }, [value, checkValue])

  const handleOnValue = () => {
    if (isCancel && check) {
      onChange(undefined, props)
    } else {
      if (!check) {
        onChange(value, props)
      }
    }
  }

  return (
    <TouchableOpacity
      onPress={handleOnValue}
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
              paddingVertical: 5,
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
          <View style={{ marginHorizontal: 5 }}>
            <RadioIcon size={checkSize} color={radioColor} visible={check} />
          </View>
        ) : (
          <React.Fragment />
        )}
        <Text style={[itemTextStyle, check ? { color: checkFontColor } : {}]}>
          {children ? children : label}
        </Text>
        {checkAlign === 'right' && type === 'default' ? (
          <View>
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
  )
}

const Radio: React.FC<RadioProps> & { Item: React.FC<RadioItemProps> } =
  props => {
    const {
      value,
      options = [],
      type = 'button',
      checkFontColor = '#fff',
      checkSize = 20,
      checkAlign = 'left',
      flexDirection = 'column',
      radioColor = '#1890ff',
      isCancel = true,
      onChange,
      itemBtnStyle = {},
      itemTextStyle = {},
      children,
    } = props

    const [actionValue, setActionValue] = useState(value)

    const handleValue = (valu: number | string | undefined, item: any) => {
      if (onChange) {
        onChange(valu, item)
      } else {
        setActionValue(valu)
      }
    }
    useEffect(() => {
      setActionValue(value)
    }, [value])

    const _optionsRender = () => {
      return options.map((item, key) => {
        return (
          <Item
            {...props}
            radioColor={radioColor}
            checkValue={actionValue}
            key={key}
            label={item.label}
            value={item.value}
            onChange={handleValue}
            flexDirection={flexDirection}
            checkAlign={checkAlign}
            checkSize={checkSize}
            type={type}
            isCancel={isCancel}
            checkFontColor={checkFontColor}
            itemTextStyle={itemTextStyle}
            itemBtnStyle={itemBtnStyle}
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
              ...(child.props || {}),
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
      <View style={{ flexDirection }}>
        {children ? _children() : _optionsRender()}
      </View>
    )
  }

Radio.Item = Item

export default Radio
