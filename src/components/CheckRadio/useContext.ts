import React from 'react'
import { ChildItemProps } from './interface'

export const CheckRadioContext = React.createContext<
  Omit<ChildItemProps, 'value'>
>({
  onChange: () => {},
  itemBtnStyle: {},
  itemTextStyle: {},
  type: 'default',
  checkFontColor: '#000',
  checkSize: 20,
  checkAlign: 'left',
  flexDirection: 'row',
  checkColor: '#1890ff',
  isCancel: false,
  disabled: false,
  disabledBG: 'rgba(0,0,0,0.1)',
  disabledFontColor: '#000',
  layout: 'default',
})

const useCheckRadioContext = () => React.useContext(CheckRadioContext)

export default useCheckRadioContext
