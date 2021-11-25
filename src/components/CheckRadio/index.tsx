import React, { useState, useMemo } from 'react'
import { View } from 'react-native'
import Item from './Item'
import { CheckRadioContext } from './useContext'
import { CheckRadioProps, ValueType, ItemProps } from './interface'

export type { CheckRadioProps, ValueType, ItemProps }

const CheckRadio: React.FC<CheckRadioProps> & { Item: React.FC<ItemProps> } =
  props => {
    const {
      value,
      options = [],
      type = 'default',
      checkFontColor = '#fff',
      iconSize = 20,
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
      checkBorderColor = 'transparent',
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
      const lg = options.length - 1
      return options.map((item, key) => {
        return (
          <Item
            {...item}
            key={key}
            number={key === 0 ? 'first' : key === lg ? 'last' : key}
          />
        )
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
          iconSize,
          checkFontColor,
          type,
          multiple,
          checkBorderColor,
          onParentChange: handleValue,
        }}
      >
        <View
          style={[
            { flexWrap: 'wrap', paddingTop: 5 },
            warpSatyle,
            { flexDirection },
          ]}
        >
          {children ? children : _optionsRender()}
        </View>
      </CheckRadioContext.Provider>
    )
  }

CheckRadio.Item = Item

export default CheckRadio
