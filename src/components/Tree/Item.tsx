import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { HalfIcon, DownIcon, CheckBoxIcon, RightIcon } from './../Icons'

export interface ParentItemProps {
  Item: any
  labelField: string
  valueField: string
  childrenField: string
  onCheck: (...arg: any) => void
  getCheckedSatus: (it: any) => number
}
interface CheckBoxHalfProps {
  checked: number
  onClick?: (...arg: any) => void
}

interface CheckBoxHalfProps {
  checked: number
}
const CheckBoxHalf: React.FC<CheckBoxHalfProps> = props => {
  const { checked } = props
  if (checked === 2) {
    return <CheckBoxIcon visible={true} />
  } else if (checked === 1) {
    return <HalfIcon visible={true} />
  }
  return <CheckBoxIcon visible={false} />
}
interface UpDownProps {
  visible: boolean
}
const UpDown: React.FC<UpDownProps> = props => {
  const { visible } = props
  if (visible) {
    return <DownIcon color="#000" size={8} visible={true} />
  }
  return <RightIcon color="#000" size={8} visible={true} />
}

const ParentItem: React.FC<ParentItemProps> = props => {
  const {
    Item,
    labelField,
    valueField,
    childrenField,
    onCheck,
    getCheckedSatus,
  } = props
  const [visible, setVisible] = useState<boolean>(false)
  const _render = () => {
    const {
      [childrenField]: children,
      [labelField]: label,
      [valueField]: value,
    } = Item
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
            onPress={onCheck.bind(this, Item)}>
            <CheckBoxHalf checked={getCheckedSatus(value)} />
          </TouchableOpacity>
          <Text>{label}</Text>
        </View>
        {isChild && (
          <View style={{ paddingLeft: 23, display: visible ? 'flex' : 'none' }}>
            {children.map((item: any, k: number) => {
              return (
                <ParentItem
                  key={k}
                  Item={item}
                  labelField={labelField}
                  valueField={valueField}
                  childrenField={childrenField}
                  onCheck={onCheck}
                  getCheckedSatus={getCheckedSatus}
                />
              )
            })}
          </View>
        )}
      </View>
    )
  }

  return <React.Fragment>{_render()}</React.Fragment>
}

export default ParentItem
