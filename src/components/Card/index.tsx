import React, { useMemo } from 'react'
import { View, StyleProp, ViewStyle, Text, TextStyle } from 'react-native'

import styles from './styles'

interface ItemProps {
  /** 名称 */
  label?: string
  /** 内容 */
  value?: string | number | boolean | undefined
  /** 自定义 渲染 ，如果存在 render 字段 则以渲染 render ,如果 render 是一个字符串 取 label 的 labelTextStyle 样式 渲染字 */
  render?: React.ReactNode | string
  /** 名称 Text 样式 */
  labelTextStyle?: StyleProp<TextStyle>
  /** 内容 Text 样式 */
  valueTextStyle?: StyleProp<TextStyle>
  /** 当前这个 Item 占据宽度 默认 50% */
  width?: string | number
  /** 最右侧显示内容 */
  right?: React.ReactNode | string
  /** 每一小项 View 样式  */
  style?: StyleProp<ViewStyle>
}

export interface CardProps {
  /** 外层 View 样式 */
  warpStyle?: StyleProp<ViewStyle>
  /** 卡片标题 title */
  title?: React.ReactNode | string | number
  /** 标题 View 样式 */
  titleStyle?: StyleProp<ViewStyle>
  /** 标题 Text 样式 */
  titleTextStyle?: StyleProp<TextStyle>
  /** 渲染数据 列表  */
  list?: Array<ItemProps>
  itemWarpStyle?: StyleProp<ViewStyle>
  /** 公共的 item 样式 */
  comItemStyle?: StyleProp<ViewStyle>
  /** 公共 的 label 样式 */
  comLabelStyle?: StyleProp<TextStyle>
  /** 公共 的 value 样式 */
  comValueStyle?: StyleProp<TextStyle>

  extra?: React.ReactNode | string | number
  /** extra Text 样式 */
  extraTextStyle?: StyleProp<TextStyle>
}
const Card: React.FC<CardProps> = props => {
  const {
    warpStyle,
    title,
    titleStyle,
    titleTextStyle,
    list = [],
    comValueStyle,
    comLabelStyle,
    comItemStyle,
    itemWarpStyle,
    extra,
    extraTextStyle,
  } = props

  const Extra = useMemo(() => {
    if (React.isValidElement(title)) {
      return <View>{extra}</View>
    } else if (Reflect.has(props, 'extra')) {
      return (
        <Text style={[styles.extraTextStyle, extraTextStyle]}>{extra}</Text>
      )
    }
    return <React.Fragment />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extra, extraTextStyle])

  const Title = useMemo(() => {
    if (React.isValidElement(title)) {
      return (
        <View style={[styles.titleStyle, titleStyle, styles.titleStyleFlex]}>
          <View style={{ flex: 1 }}>{title}</View>
          <View>{Extra}</View>
        </View>
      )
    } else if (Reflect.has(props, 'title')) {
      return (
        <View style={[styles.titleStyle, titleStyle, styles.titleStyleFlex]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.titleTextStyle, titleTextStyle]}>{title}</Text>
          </View>
          <View>{Extra}</View>
        </View>
      )
    }
    return <React.Fragment />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, titleStyle])

  const renderDom = useMemo(() => {
    return (list || []).map((item: ItemProps, key: number) => {
      const {
        label,
        value,
        labelTextStyle,
        valueTextStyle,
        style,
        right,
        render,
        width = '50%',
      } = item
      if (render && React.isValidElement(render)) {
        return React.cloneElement(render, { key })
      } else if (Reflect.has(item, 'render')) {
        return (
          <View
            key={key}
            style={[styles.itemStyle, comItemStyle, style, { width }]}>
            <Text
              style={[styles.labelTextStyle, comLabelStyle, labelTextStyle]}>
              {render}
            </Text>
          </View>
        )
      }
      return (
        <View
          key={key}
          style={[styles.itemStyle, comItemStyle, style, { width }]}>
          <View style={{ justifyContent: 'center' }}>
            <Text
              style={[styles.labelTextStyle, comLabelStyle, labelTextStyle]}>
              {label}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              style={[styles.valueTextStyle, comValueStyle, valueTextStyle]}>
              {value}
            </Text>
          </View>
          <View>
            <Text>{right}</Text>
          </View>
        </View>
      )
    })
  }, [list, comValueStyle, comLabelStyle, comItemStyle])

  return (
    <View style={[styles.warpStyle, warpStyle]}>
      {Title}
      <View style={[styles.itemWarpStyle, itemWarpStyle]}>
        {renderDom}
        {props.children}
      </View>
    </View>
  )
}

export default Card
