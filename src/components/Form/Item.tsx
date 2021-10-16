/*
 * @Description: 当前内容直接参照 https://github.com/react-component/field-form ，Item 为 Field 组件进行改造的
 */

import React from 'react'
import { View, Text, ViewStyle, TextStyle, StyleProp } from 'react-native'
import { Field } from 'rc-field-form'
import styles from './styles'
import { InternalFieldProps } from 'rc-field-form/lib/Field'

export interface FieldProps<Values = any>
  extends Omit<InternalFieldProps<Values>, 'name' | 'fieldContext'> {
  name?: string
}
export interface ItemProps extends FieldProps {
  /** 布局 */
  layout?: 'vertical' | 'horizontal'
  /** 标签和输入框外层样式(不包含错误提示) */
  itemStyle?: StyleProp<ViewStyle>
  /** 表单项外层样式 */
  warpStyle?: StyleProp<ViewStyle>
  /** label 标签的文本	   */
  label?: string | React.ReactNode
  /**  标签的文本 View 样式   */
  labelStyle?: StyleProp<ViewStyle>
  /**  标签的文本  Text 样式   */
  labelTextStyle?: StyleProp<TextStyle>
  /** 输入框 外层 样式   */
  style?: StyleProp<ViewStyle>
  /** 是否有边框   */
  bordered?: boolean
  /** 错误提示 View 样式     */
  errStyle?: StyleProp<ViewStyle>
  /** 错误提示 Text 样式   */
  errTextStyle?: StyleProp<TextStyle>
}

const CarefreeFormItem: React.FC<ItemProps> = props => {
  const {
    children,
    layout = 'horizontal',
    itemStyle,
    style,
    label,
    labelStyle,
    labelTextStyle,
    bordered = true,
    errStyle,
    errTextStyle,
    warpStyle,
    ...other
  } = props

  return (
    <Field {...other}>
      {(control, meta, form) => {
        const childNode =
          typeof children === 'function'
            ? children(control, meta, form)
            : React.cloneElement(children as React.ReactElement, {
                ...control,
              })
        const errs = meta.errors.map(err => err).join(',')
        return (
          <View style={[styles.itemWarp, warpStyle]}>
            <View style={[styles[layout], itemStyle]}>
              <View style={[styles[`label${layout}`], labelStyle]}>
                <Text style={[styles.itemLabelText, labelTextStyle]}>
                  {label} :
                </Text>
              </View>
              <View
                style={[
                  styles.itemInput,
                  bordered && styles.itemInputBorder,
                  style,
                ]}>
                {childNode}
              </View>
            </View>
            {errs.length ? (
              <View style={[errStyle]}>
                <Text style={[[styles.itemErrText, errTextStyle]]}>{errs}</Text>
              </View>
            ) : (
              <React.Fragment />
            )}
          </View>
        )
      }}
    </Field>
  )
}
export default CarefreeFormItem
