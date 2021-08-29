import React, { useMemo, useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleProp,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from 'react-native'
import { XIcon, SearchIcon, EmtyIcon } from './../Icons'
import styles from './styles'

export interface SearchProps {
  /** 模糊查询输入框提示 */
  placeholderSearch?: string
  /** 模糊查询输入框提示 颜色 */
  placeholderColorSearch?: string
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

  /** 模糊查询输入框样式  */
  searchInputStyle?: StyleProp<TextStyle>
  /** 模糊查询按钮占据宽度 */
  searchBtnWidth?: number
  /** 查询按钮图标大小 */
  searchIconSize?: number

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

function debounce(fn: (...arg: any) => void, delay: number) {
  let timer: NodeJS.Timer // 维护一个 timer
  return function () {
    const _this = this // 取debounce执行作用域的this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fn.apply(_this, args) // 用apply指向调用debounce的对象，相当于_this.fn(args);
    }, delay) as unknown as NodeJS.Timer
  }
}

const Search: React.FC<SearchProps> = props => {
  const {
    onRequestClose = () => {},
    searchValue,
    placeholderSearch = '请输入',
    placeholderColorSearch = '#ccc',
    onSearch = () => {},
    onSearchValueChange = () => {},
    onCheckValue = () => {},
    dataList = [],
    render,
    renderField = 'label',
    searchIconSize = 25,
    searchBtnWidth = 25,
    closeModalIconSize = 25,
    closeModalIconColor = 'rgba(0,0,0,0.1)',
    searchInputStyle,
    checkItemTextStyle,
    checkItemStyle,
    isFirstRequest = false,
    loading = false,
    loadingColor = 'gray',
    loadingSize = 'small',
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
  const clearValue = useMemo(() => {
    if (value && `${value}`.length) {
      return (
        <TouchableOpacity
          style={styles.searchClearnInput}
          onPress={() => {
            setValue(undefined)
            onSearchValueChange(undefined)
          }}>
          <XIcon size={20} color="rgba(0,0,0,0.1)" />
        </TouchableOpacity>
      )
    }
    return <React.Fragment />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

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
        <TextInput
          value={value}
          placeholder={placeholderSearch}
          placeholderTextColor={placeholderColorSearch}
          style={[styles.searchInput, searchInputStyle]}
          onChangeText={val => {
            setValue(val)
            debounce(() => onSearchValueChange(val), 300)
          }}
        />
        {clearValue}
        <TouchableOpacity
          onPress={onSearch.bind(this, value)}
          style={[styles.searchBtn, { width: searchBtnWidth }]}>
          <SearchIcon color="#bbb" size={searchIconSize} />
        </TouchableOpacity>
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
