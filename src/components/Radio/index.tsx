import React from 'react'
import CheckRadio from './../CheckRadio'
import { ItemProps, CheckRadioProps } from './../CheckRadio/interface'
export interface RadioProps extends Omit<CheckRadioProps, 'multiple'> {}

const Radio: React.FC<RadioProps> & { Item: React.FC<ItemProps> } = props => {
  return <CheckRadio {...props} multiple={false} />
}

Radio.Item = CheckRadio.Item

export default Radio
