import React, { useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from 'react-native'
import { XIcon, EmtyIcon } from './../Icons'
import styles from './styles'
import { debounce } from './../utils'

import SearchList, { SearchProps as SearchPropss } from './../Search'

export interface SearchProps
  extends Omit<SearchPropss, 'value' | 'children' | 'onChange' | 'onSearch'> {
  /** 模糊查询输入框默认显示值 */
  searchValue?: string
  /** 模糊查询列表数据选中事件 */
  onCheckValue?: (v: any) => void
  /** 模糊查询输入框输入值变化事件 */
  onSearchValueChange?: (v: string) => void
  /** 模糊查询输入框 点击查询按钮事件 */
  onSearch?: (v: string) => void

  /** 模糊查询列表渲染字段 */
  renderField?: string
  /** 模糊查询列表自定义渲染 */
  render?: (v: any) => React.ReactNode
  /** 列表数据 */
  dataList?: Array<any>

  /** 是否一打开弹框调用一次OnSearch方法或onSearchValueChange方法 */
  isFirstRequest?: boolean

  /** 关闭弹框 X 图标大小 */
  closeModalIconSize?: number
  closeModalIconColor?: string
  /** 模糊查询列表样式 */
  checkItemStyle?: StyleProp<ViewStyle>
  /** 模糊查询列表字体样式 */
  checkItemTextStyle?: StyleProp<TextStyle>
  /**  加载状态 */
  loading?: boolean
  /**  加载状态 颜色 */
  loadingColor?: string
  /**  加载状态 大小 */
  loadingSize?: 'small' | 'large'
  /** 关闭弹框 */
  onRequestClose?: () => void
}

const Search: React.FC<SearchProps> = props => {
  const {
    onRequestClose = () => {},
    searchValue,
    onSearch = () => {},
    onSearchValueChange = () => {},
    onCheckValue = () => {},
    dataList = [],
    render,
    renderField = 'label',
    closeModalIconSize = 25,
    closeModalIconColor = 'rgba(0,0,0,0.1)',
    checkItemTextStyle,
    checkItemStyle,
    isFirstRequest = false,
    loading = false,
    loadingColor = 'gray',
    loadingSize = 'small',
    ...rest
  } = props
  const [value, setValue] = useState(searchValue)

  const renderList = () => {
    if ((dataList || []).length) {
      return (dataList || []).map((item, index) => {
        return (
          <TouchableOpacity
            style={[
              styles.itemCheck,
              index === 0 && styles.itemCheckFirst,
              checkItemStyle,
            ]}
            key={index}
            onPress={() => {
              onCheckValue(item)
              onRequestClose()
            }}>
            <Text style={checkItemTextStyle}>
              {render ? render(item) : item[renderField]}
            </Text>
          </TouchableOpacity>
        )
      })
    }
    return (
      <View style={styles.emty}>
        <EmtyIcon />
        <Text style={styles.emtyText}>暂无数据</Text>
      </View>
    )
  }

  useEffect(() => {
    if (isFirstRequest) {
      onSearch(value)
      onSearchValueChange(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <View style={styles.searchTip}>
        <Text style={styles.searchTipTitle}>请选择</Text>
        <TouchableOpacity
          onPress={onRequestClose}
          style={styles.searchCloseModal}>
          <XIcon size={closeModalIconSize} color={closeModalIconColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchInputWarp}>
        <SearchList
          {...rest}
          onSearch={onSearch.bind(this, value)}
          onChange={debounce((val: string) => {
            setValue(val)
            onSearchValueChange(val)
          })}
          value={value}
        />
      </View>
      <ScrollView style={{ flex: 1 }}>
        {loading && (
          <View style={styles.loadingWarp}>
            <ActivityIndicator
              animating={loading}
              size={loadingSize}
              color={loadingColor}
            />
          </View>
        )}
        {renderList()}
      </ScrollView>
    </React.Fragment>
  )
}
export default Search
