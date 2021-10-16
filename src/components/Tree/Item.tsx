import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {
  HalfIcon,
  DownIcon,
  CheckBoxIcon,
  RightIcon,
  CheckMarkIcon,
} from './../Icons'
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
  const {
    labelField,
    valueField,
    childrenField,
    onCheck,
    getCheckedSatus,
    isParentCheck,
    isReadOnly,
    layout,
    isRowClick,
  } = useTreeChild()

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
              style={{ padding: 5, paddingLeft: 0, width: 15 }}
              onPress={() => setVisible(e => !e)}>
              <UpDown visible={visible} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
            onPress={() => {
              if (isRowClick && !(isParentCheck && isChild) && !isReadOnly) {
                onCheck(item)
              }
            }}>
            {!(isParentCheck && isChild) && !isReadOnly && layout === 'left' ? (
              <TouchableOpacity
                style={{ marginRight: 3 }}
                onPress={() => {
                  if (!isRowClick) {
                    onCheck(item)
                  }
                }}>
                <CheckBoxHalf checked={getCheckedSatus(value)} />
              </TouchableOpacity>
            ) : (
              <React.Fragment />
            )}
            <View style={{ flex: 1 }}>
              <Text>{label}</Text>
            </View>
            {layout === 'right' && !isReadOnly ? (
              <View
                style={[{ paddingRight: 10 }, isChild && { marginRight: 15 }]}>
                <CheckMarkIcon
                  visible={[1, 2].includes(getCheckedSatus(value))}
                />
              </View>
            ) : (
              <React.Fragment />
            )}
          </TouchableOpacity>
        </View>
        {isChild && visible && (
          <View style={{ paddingLeft: 23 }}>
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
