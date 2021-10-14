import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { HalfIcon, DownIcon, CheckBoxIcon, RightIcon } from './../Icons'
import { ItemProps, CheckBoxHalfProps, UpDownProps } from './interface'
import { useTreeChild } from './useTree'
const CheckBoxHalf: React.FC<CheckBoxHalfProps> = props => {
  const { checked } = props
  if (checked === 2) {
    return <CheckBoxIcon visible={true} />
  } else if (checked === 1) {
    return <HalfIcon visible={true} />
  }
  return <CheckBoxIcon visible={false} />
}

const UpDown: React.FC<UpDownProps> = props => {
  const { visible } = props
  if (visible) {
    return <DownIcon color="#000" size={8} visible={true} />
  }
  return <RightIcon color="#000" size={8} visible={true} />
}

const Item: React.FC<ItemProps> = props => {
  const { item } = props
  const { labelField, valueField, childrenField, onCheck, getCheckedSatus } =
    useTreeChild()

  const [visible, setVisible] = useState<boolean>(false)
  const _render = () => {
    const {
      [childrenField]: children,
      [labelField]: label,
      [valueField]: value,
    } = item
    const isChild = (Array.isArray(children) && children.length) || false
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: '#ccc',
            minHeight: 30,
          }}>
          {isChild && (
            <TouchableOpacity
              style={{ padding: 5, paddingLeft: 0 }}
              onPress={() => setVisible(e => !e)}>
              <UpDown visible={visible} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ marginRight: 3 }}
            onPress={onCheck.bind(this, item)}>
            <CheckBoxHalf checked={getCheckedSatus(value)} />
          </TouchableOpacity>
          <Text>{label}</Text>
        </View>
        {isChild && (
          <View style={{ paddingLeft: 23, display: visible ? 'flex' : 'none' }}>
            {children.map((ite: any, k: number) => {
              return <Item key={k} item={ite} />
            })}
          </View>
        )}
      </View>
    )
  }

  return <React.Fragment>{_render()}</React.Fragment>
}

export default Item
