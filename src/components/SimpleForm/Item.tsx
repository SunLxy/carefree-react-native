import React from 'react'

import { TextInput, TextInputProps } from 'react-native'
import Select, { SelectProps } from './../Select'

import { SimpleFormConfigProps } from '.'

import CheckBox, { CheckBoxProps } from './../CheckBox'
import Radio, { RadioProps } from './../Radio'
import Form from './../Form'
import { ItemProps } from './../Form/Item'

import { useFormWatchList } from './hooks'
import { WatchListProps } from './interface'

export const Warp = (props: { [x: string]: any }) => {
  const { children, ...rest } = props || {}
  const [childProps] = useFormWatchList(props)
  if (typeof children === 'function') {
    return children({ ...rest, childProps })
  }
  if (React.isValidElement(children)) {
    return React.cloneElement(children, { ...rest })
  }
  return children
}
// 监听子组件
export const ItemWatch = (props: ItemProps) => {
  const { children, ...rest } = props
  return (
    <Form.Item {...rest}>
      <Warp>{children}</Warp>
    </Form.Item>
  )
}

/** 每一项渲染 */
export const itemRender = (
  config: SimpleFormConfigProps[],
  {
    watchList,
  }: {
    watchList: WatchListProps
  },
) => {
  return config.map((item, index) => {
    const { type, label, itemAttr, attr = {}, rules, render, name } = item
    const { watch = true, ...rest } = itemAttr || {}

    let renderItem

    if (type === 'Input') {
      const attrs = attr as TextInputProps
      renderItem = (
        <TextInput {...attrs} style={[{ padding: 0 }, (attrs || {}).style]} />
      )
    } else if (type === 'InputNumber') {
      const attrs = attr as TextInputProps
      renderItem = (
        <TextInput {...attrs} style={[{ padding: 0 }, (attrs || {}).style]} />
      )
    } else if (type === 'Select') {
      const attrs = attr as SelectProps
      renderItem = <Select {...attrs} />
    } else if (type === 'CheckBox') {
      const attrs = attr as CheckBoxProps
      renderItem = <CheckBox {...attrs} />
    } else if (type === 'Radio') {
      const attrs = attr as RadioProps
      renderItem = <Radio {...attrs} />
    } else if (type === 'Custom') {
      renderItem = render
    }

    if (
      watchList &&
      Object.keys(watchList).length &&
      watch &&
      watchList[name as string]
    ) {
      renderItem = <Warp>{renderItem}</Warp>
    }
    return (
      <Form.Item key={index} name={name} {...rest} label={label} rules={rules}>
        {renderItem}
      </Form.Item>
    )
  })
}
