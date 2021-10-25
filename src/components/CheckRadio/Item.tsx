import React, { useMemo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { RadioIcon, CheckMarkIcon, CheckBoxIcon } from './../Icons'

import CheckRadioContext from './useContext'
import { getItemTouchStyle } from './utils'
import { ChildItemProps, ValueType, ItemProps } from './interface'

const checkValueFig = (
  current: ValueType,
  value: ChildItemProps['checkValue'],
  multiple: boolean,
) => {
  if (multiple) {
    if (value && Array.isArray(value)) {
      const list = value || []
      return list.includes(current)
    }
    return false
  }
  if (typeof current === 'number') {
    if (typeof value === 'number') {
      return current === value
    }
    return false
  }
  return current === value
}

export const Item: React.FC<ChildItemProps> = props => {
  const {
    label,
    value,
    onChange = () => {},
    onParentChange = () => {},
    itemBtnStyle = {},
    itemTextStyle = {},
    type = 'default',
    layout = 'default',
    checkFontColor = '#fff',
    checkSize = 20,
    checkAlign = 'left',
    flexDirection = 'row',
    checkColor = '#1890ff',
    isCancel = false,
    checkValue,
    disabled = false,
    disabledBG = 'rgba(0,0,0,0.1)',
    disabledFontColor = '#000',
    multiple = false,
    children,
    itemWarpStyle,
    number,
  } = props

  const check = useMemo(() => {
    return checkValueFig(value, checkValue, multiple)
  }, [value, checkValue, multiple])

  const handleOnValue = () => {
    if (disabled) {
      return
    }
    if (multiple) {
      let list = []
      let checkValues = checkValue || []
      if (Array.isArray(checkValues)) {
        if (check) {
          list = checkValues.filter(it => it !== value)
        } else {
          list = (checkValues || []).concat([value])
        }
        onChange(list, props)
        onParentChange(list, props)
      }
      return
    }
    if (isCancel && check) {
      onChange(undefined, props)
      onParentChange(undefined, props)
    } else {
      if (!check) {
        onChange(value, props)
        onParentChange(value, props)
      }
    }
  }

  const styTouch = React.useMemo(() => {
    return getItemTouchStyle({
      type,
      flexDirection,
      checkColor,
      disabled,
      disabledBG,
      check,
      layout,
      number,
      multiple,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    type,
    number,
    layout,
    flexDirection,
    checkColor,
    disabled,
    disabledBG,
    check,
  ])

  const BoxIcon = multiple ? CheckBoxIcon : RadioIcon

  return (
    <View style={[disabled ? { opacity: 0.6 } : {}, itemWarpStyle]}>
      <TouchableOpacity
        onPress={handleOnValue}
        disabled={disabled}
        style={[{ marginHorizontal: 5 }, itemBtnStyle, styTouch]}>
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
              <BoxIcon size={checkSize} color={checkColor} visible={check} />
            </View>
          ) : (
            <React.Fragment />
          )}
          <Text
            style={[
              { color: '#000' },
              itemTextStyle,
              disabled ? { color: disabledFontColor } : {},
              check && type === 'button' ? { color: checkFontColor } : {},
            ]}>
            {children ? children : label}
          </Text>
          {checkAlign === 'right' && type === 'default' ? (
            <View style={{ marginRight: 5 }}>
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
const Warp = (props: ItemProps) => {
  const {
    checkColor,
    isCancel,
    flexDirection,
    checkAlign,
    checkSize,
    type,
    checkFontColor,
    onParentChange,
    disabledFontColor,
    multiple,
    ...rest
  } = props as ChildItemProps
  const cont = CheckRadioContext()
  return (
    <Item
      {...{
        checkColor,
        isCancel,
        flexDirection,
        checkAlign,
        checkSize,
        type,
        checkFontColor,
        onParentChange,
        disabledFontColor,
        multiple,
      }}
      {...(cont || {})}
      {...rest}
    />
  )
}
export default Warp
