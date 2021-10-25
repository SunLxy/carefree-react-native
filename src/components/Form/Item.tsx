/*
 * @Description: 当前内容直接参照 https://github.com/react-component/field-form ，Item 为 Field 组件进行改造的
 */

import React from 'react'
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  StyleProp,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from 'react-native'
import { Field } from 'rc-field-form'
import styles from './styles'
import { InternalFieldProps } from 'rc-field-form/lib/Field'
import { useFormContext } from './hooks'
import { toArray, getFieldId } from './util'
export interface FieldProps<Values = any>
  extends Omit<InternalFieldProps<Values>, 'name' | 'fieldContext'> {
  name?: string | number | (string | number)[]
}

export interface ItemWarpProps {
  /** 标签和输入框外层样式(不包含错误提示) */
  itemStyle?: StyleProp<ViewStyle>
  /** 表单项外层样式 */
  warpStyle?: StyleProp<ViewStyle>
  /**  标签的文本 View 样式   */
  labelStyle?: StyleProp<ViewStyle>
  /**  标签的文本  Text 样式   */
  labelTextStyle?: StyleProp<TextStyle>
  /** 错误提示 View 样式     */
  errStyle?: StyleProp<ViewStyle>
  /** 错误提示 Text 样式   */
  errTextStyle?: StyleProp<TextStyle>
  /** 输入框 外层 样式   */
  style?: StyleProp<ViewStyle>
  /** 必填样式 */
  required?: boolean
}

export interface ItemProps extends FieldProps, ItemWarpProps {
  /** label 标签的文本	   */
  label?: string | React.ReactNode
}

const CarefreeFormItem: React.FC<ItemProps> = props => {
  const {
    layout = 'horizontal',
    inputStyle: styleW,
    itemStyle: itemW,
    labelStyle: labelW,
    labelTextStyle: labelTextW,
    bordered,
    errStyle: errW,
    errTextStyle: errTextW,
    warpStyle: warpW,
    name: formName,
    colon,
  } = useFormContext()
  const {
    children,
    itemStyle,
    style,
    label,
    labelStyle,
    labelTextStyle,
    errStyle,
    errTextStyle,
    warpStyle,
    rules,
    required,
    ...other
  } = props

  const colonRender = React.useMemo(() => {
    if (colon && layout === 'horizontal') {
      return ':'
    }
    return <React.Fragment />
  }, [colon, layout])

  return (
    <Field {...other} rules={rules}>
      {(control, meta, form) => {
        const mergedName = toArray(props.name).length && meta ? meta.name : []
        const fieldId = getFieldId(mergedName, formName)
        //  判断是否必填
        const isRequired =
          required !== undefined
            ? required
            : !!(
                rules &&
                rules.some(rule => {
                  if (
                    rule &&
                    typeof rule === 'object' &&
                    rule.required &&
                    !rule.warningOnly
                  ) {
                    return true
                  }
                  if (typeof rule === 'function') {
                    const ruleEntity = rule(form)
                    return (
                      ruleEntity &&
                      ruleEntity.required &&
                      !ruleEntity.warningOnly
                    )
                  }
                  return false
                })
              )

        const onChange = (
          target: NativeSyntheticEvent<TextInputChangeEventData> | any,
        ) => {
          let value = target
          if (target && target.nativeEvent) {
            value = target.nativeEvent.text
          }
          control.onChange(value)
        }
        const childNode =
          typeof children === 'function'
            ? children({ ...control, id: fieldId }, meta, form)
            : React.cloneElement(children as React.ReactElement, {
                ...control,
                onChange: onChange,
                id: fieldId,
              })

        const errs = meta.errors.map(err => err).join(',')
        return (
          <View style={[styles.itemWarp, warpW, warpStyle]}>
            <View style={[styles[layout], itemW, itemStyle]}>
              <View style={[styles[`label${layout}`], labelW, labelStyle]}>
                <Text
                  style={[styles.itemLabelText, labelTextW, labelTextStyle]}>
                  {isRequired && <Text style={styles.labelRedStar}>*</Text>}
                  {label} {colonRender}
                </Text>
              </View>
              <View
                style={[
                  styles.itemInput,
                  bordered && styles.itemInputBorder,
                  styleW,
                  style,
                ]}>
                {childNode}
              </View>
            </View>
            {errs.length ? (
              <View style={[errW, errStyle]}>
                <Text style={[[styles.itemErrText, errTextW, errTextStyle]]}>
                  {errs}
                </Text>
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
