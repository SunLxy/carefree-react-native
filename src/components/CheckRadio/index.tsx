import React, { useState, useMemo } from 'react'
import { View } from 'react-native'
import Item from './Item'
import { CheckRadioContext } from './useContext'
import { CheckRadioProps, ValueType, ItemProps } from './interface'

const CheckRadio: React.FC<CheckRadioProps> & { Item: React.FC<ItemProps> } =
  props => {
    const {
      value,
      options = [],
      type = 'default',
      checkFontColor = '#000',
      checkSize = 20,
      checkAlign = 'left',
      flexDirection = 'row',
      checkColor = '#1890ff',
      isCancel = false,
      onChange,
      itemBtnStyle = {},
      itemTextStyle = {},
      disabled = false,
      disabledBG = 'rgba(0,0,0,0.1)',
      disabledFontColor = '#000',
      multiple = false,
      children,
      warpSatyle,
      itemWarpStyle,
      ...rest
    } = props
    const [actionValue, setActionValue] = useState<ValueType | ValueType[]>()
    const checkActionValue = useMemo(() => {
      if (Reflect.has(props, 'value')) {
        return value
      }
      return actionValue
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actionValue, value])

    const handleValue = (valu: ValueType | ValueType[], item: any) => {
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
        return <Item {...item} key={key} />
      })
    }
    return (
      <CheckRadioContext.Provider
        value={{
          ...rest,
          checkColor,
          isCancel,
          itemBtnStyle,
          itemTextStyle,
          disabled,
          disabledBG,
          disabledFontColor,
          itemWarpStyle,
          checkValue: checkActionValue,
          flexDirection,
          checkAlign,
          checkSize,
          checkFontColor,
          type,
          multiple,
          onParentChange: handleValue,
        }}>
        <View
          style={[
            { flexWrap: 'wrap', paddingTop: 5 },
            warpSatyle,
            { flexDirection },
          ]}>
          {children ? children : _optionsRender()}
        </View>
      </CheckRadioContext.Provider>
    )
  }

CheckRadio.Item = Item

export default CheckRadio
