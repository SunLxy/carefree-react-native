import React from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'
import styles from './styles'
import { ConfigProps } from '.'
export interface FooterProps {
  // 配置
  config: ConfigProps[]
  // 渲染
  render?: (
    currentIndex: number,
    onChange: FooterProps['onChange'],
  ) => React.ReactNode
  // 当前那个
  currentIndex: number
  // 变更当前
  onChange: (index: number) => void
  // 渲染 label 值
  labelField?: string
  // 外层样式
  style?: StyleProp<ViewStyle>
  // 按钮样式
  btnStyle?: StyleProp<ViewStyle>
  btnActStyle?: StyleProp<ViewStyle>
  // 按钮内字体样式
  btnTextStyle?: StyleProp<TextStyle>
  btnTextActStyle?: StyleProp<TextStyle>
}
const Footer = (props: FooterProps) => {
  const {
    config,
    render,
    currentIndex,
    onChange,
    labelField = 'title',
    style,
    btnStyle,
    btnTextStyle,
    btnActStyle,
    btnTextActStyle,
  } = props
  let _render = () => {
    if (render && typeof render === 'function') {
      return render(currentIndex, onChange)
    } else if (Array.isArray(config) && config.length) {
      return (config || []).map((it, ind) => {
        return (
          <TouchableOpacity
            key={ind}
            onPress={() => onChange(ind)}
            style={[
              styles.footerBtn,
              ind === currentIndex && styles.footerBtnAct,
              ind === currentIndex && btnActStyle,
              btnStyle,
            ]}>
            <Text
              style={[
                styles.footerBtnText,
                ind === currentIndex && styles.footerBtnActText,
                ind === currentIndex && btnTextActStyle,
                btnTextStyle,
              ]}>
              {it[labelField]}
            </Text>
          </TouchableOpacity>
        )
      })
    }
    return <React.Fragment />
  }
  return <View style={[styles.footer, style]}>{_render()}</View>
}
export default Footer
