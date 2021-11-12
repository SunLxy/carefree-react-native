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

import styles from './styles'

const CheckBoxHalf: React.FC<CheckBoxHalfProps> = props => {
  const { checked, checkHalf } = props
  if (checked) {
    return <CheckBoxIcon visible={true} />
  } else if (checkHalf) {
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
    childrenField,
    onCheck,
    initMap,
    isParentCheck,
    isReadOnly,
    layout,
    isRowClick,
  } = useTreeChild()
  const { [childrenField]: children, [labelField]: label } = item
  const isChild = (Array.isArray(children) && children.length) || false

  const checked = initMap.isCheck(item)
  const checkHalf = initMap.isCheckHalf(item)
  const disabled = initMap.isDisabled(item)

  const [visible, setVisible] = useState<boolean>(false)
  const deepRight = JSON.stringify({
    checked,
    layout,
    isParentCheck,
    isChild,
    isReadOnly,
  })

  const leftBtn = () => {
    // 1. 父级不可选
    // 2. 只读
    // 3. layout === 'left'
    if ((!isParentCheck && isChild) || isReadOnly || layout !== 'left') {
      return <React.Fragment />
    }
    return (
      <TouchableOpacity
        style={{ marginRight: 3 }}
        onPress={onCheck.bind(this, item)}>
        <CheckBoxHalf
          checked={checked}
          checkHalf={checkHalf}
          disabled={disabled}
        />
      </TouchableOpacity>
    )
  }

  const rightBtn = React.useMemo(() => {
    if (isReadOnly || layout !== 'right' || (!isParentCheck && isChild)) {
      return <React.Fragment />
    }
    return (
      <View style={[{ paddingRight: 10 }, isChild && { marginRight: 15 }]}>
        <CheckMarkIcon visible={checkHalf || checked} />
      </View>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepRight])

  const onPress = () => {
    // 父级不可选
    if ((!isParentCheck && isChild) || isReadOnly || !isRowClick) {
      return
    }
    onCheck(item)
  }

  const _render = () => {
    return (
      <View>
        <View style={[styles.item]}>
          {isChild && (
            <TouchableOpacity
              style={styles.itemLeftUp}
              onPress={() => setVisible(e => !e)}>
              <UpDown visible={visible} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={1}
            style={styles.itemRowTouch}
            onPress={onPress}>
            {leftBtn()}
            <View style={{ flex: 1 }}>
              <Text>{label}</Text>
            </View>
            {rightBtn}
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
