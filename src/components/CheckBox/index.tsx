import React from 'react'
import CheckRadio from './../CheckRadio'
import { Item } from './../CheckRadio/Item'
import CheckRadioContext from './../CheckRadio/useContext'
import {
  ItemProps,
  ChildItemProps,
  CheckRadioProps,
} from './../CheckRadio/interface'

export interface CheckBoxProps extends Omit<CheckRadioProps, 'multiple'> {}
const WarpItem = (props: ItemProps) => {
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
      multiple={true}
    />
  )
}

const CheckBox: React.FC<CheckBoxProps> & { Item: React.FC<ItemProps> } =
  props => {
    return <CheckRadio {...props} multiple={true} />
  }

CheckBox.Item = WarpItem

export default CheckBox
