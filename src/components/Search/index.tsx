import React from 'react'
import {
  ScrollView,
  View,
  ViewProps,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native'
import Input, { InputProps } from './../Input'
import Button, { ButtonProps } from './../Button'
import styles from './styles'
import { LeftIcon } from './../Icons'
export interface SearchProps {
  /** 整个外层样式 **/
  warpProps?: ViewProps
  /** 查询输内容区域外层View样式 */
  bodyWarpProps?: ScrollViewProps
  /** 查询输入框整体外层View样式 */
  searchWarpStyle?: StyleProp<ViewStyle>
  /** 查询输入框外层View样式 */
  searchInputWarpStyle?: StyleProp<ViewStyle>
  /** 查询输入框属性 */
  searchInputProps?: Omit<InputProps, 'onChange' | 'value'>
  /** 查询按钮属性 */
  buttonProps?: ButtonProps
  buttonText?: React.ReactNode
  /** 内容展示区域 */
  children?: React.ReactNode
  /** 底部区域 */
  footer?: React.ReactNode
  /** 输入框值 */
  value?: string | number
  /** 输入框值变更事件 */
  onChange?: (value: string | number | undefined) => void
  /** 点击查询按钮事件 */
  onSearch?: (value: string | number | undefined) => void
  /** 是否显示左侧按钮 */
  leftButton?: boolean
  /** 左侧按钮属性 */
  leftButtonProps?: ButtonProps
  /** 左侧按钮内容 */
  leftButtonText?: React.ReactNode
  /** 左侧按钮事件 */
  leftOnPress?: () => void
}

const Search: React.FC<SearchProps> = props => {
  const {
    warpProps = {},
    bodyWarpProps = {},
    searchWarpStyle,
    searchInputProps = {},
    searchInputWarpStyle,
    buttonProps = {},
    children,
    footer,
    value,
    buttonText = '查询',
    onSearch = () => {},
    onChange = () => {},
    leftButton = false,
    leftButtonProps = {},
    leftButtonText = <LeftIcon visible={true} color="#000" />,
    leftOnPress = () => {},
  } = props

  return (
    <View
      {...warpProps}
      style={[{ flex: 1, backgroundColor: '#fff' }, warpProps.style]}>
      {/* 做查询输入框 */}
      <View style={[styles.searchWarp, searchWarpStyle]}>
        {leftButton && (
          <Button
            bordered={false}
            {...leftButtonProps}
            style={[{ paddingRight: 10 }, leftButtonProps.style]}
            textStyle={[{ color: '#000' }, buttonProps.textStyle]}
            onPress={leftOnPress}>
            {leftButtonText}
          </Button>
        )}
        <View style={[styles.searchInputWarp, searchInputWarpStyle]}>
          <Input
            placeholder="请输入"
            placeholderTextColor="#ccc"
            bordered
            {...searchInputProps}
            value={value}
            onChange={onChange}
            style={[styles.searchInput, searchInputProps.style]}
          />
        </View>
        <Button
          bordered={false}
          {...buttonProps}
          style={[{ marginLeft: 5 }, buttonProps.style]}
          textStyle={[{ color: '#1890ff' }, buttonProps.textStyle]}
          onPress={() => onSearch(value)}>
          {buttonText}
        </Button>
      </View>
      {/* 展示区域内容 */}
      <ScrollView {...bodyWarpProps} style={[{ flex: 1 }, bodyWarpProps.style]}>
        {children}
      </ScrollView>
      {footer}
    </View>
  )
}
export default Search
