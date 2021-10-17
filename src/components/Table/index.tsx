import React, { useMemo } from 'react'
import {
  FlatList,
  ScrollView,
  FlatListProps,
  View,
  Text,
  ListRenderItemInfo,
  ViewStyle,
  StyleProp,
} from 'react-native'
import styles from './styles'

export interface TableItemProps {
  /** 标题 */
  title: string | React.ReactNode
  /** 展示字段 */
  dataIndex: string
  /** 宽度 */
  width: number
  /** 内容展示位置 */
  algin?: 'left' | 'center' | 'right'
  /** 内容样式 */
  style?: StyleProp<ViewStyle>
  /**自己写渲染 */
  render?: (text: any, record: any, index: number) => React.ReactNode
}
// data, renderItem

export interface TableProps
  extends Omit<FlatListProps<any>, 'data' | 'renderItem'> {
  /**展示数据  */
  dataSource: Array<any>
  /** 表头 */
  columns: Array<TableItemProps>
  /** 主键 */
  rowKey: string | Function
  /** 边框颜色 */
  borderColor?: string
  /** 边框宽度 */
  borderWidth?: number
  /** 没一项 样式*/
  itemStyle?: StyleProp<ViewStyle>
  /** 表头样式 */
  titleStyle?: StyleProp<ViewStyle>
}

const getTitle = (item: any) => {
  const { title } = item
  if (typeof title === 'string') {
    return <Text style={[{ textAlign: item.algin || 'center' }]}>{title}</Text>
  }
  return title
}

const Table: React.FC<TableProps> = props => {
  const {
    dataSource,
    rowKey,
    columns,
    borderColor = '#ccc',
    borderWidth = 0.5,
    itemStyle,
    ...restProps
  } = props
  const borderStyle = useMemo(() => {
    return {
      borderColor,
      borderWidth,
    }
  }, [borderWidth, borderColor])

  const _headerRender = useMemo(() => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {columns.map((item, key) => {
          return (
            <View
              key={key}
              style={[
                { width: item.width, marginBottom: -0.5 },
                borderStyle,
                item.style,
              ]}>
              {getTitle(item)}
            </View>
          )
        })}
      </View>
    )
  }, [columns, borderStyle])

  const _renderItem = ({ item, index }: ListRenderItemInfo<any>) => {
    return (
      <View key={index} style={{ flexDirection: 'row' }}>
        {columns.map((ite, key) => {
          const { dataIndex, width, algin, render } = ite
          return (
            <View key={key} style={[{ width: width }, borderStyle, itemStyle]}>
              {render ? (
                render(item[dataIndex], item, index)
              ) : (
                <Text style={[{ textAlign: algin || 'center' }]}>
                  {item[dataIndex]}
                </Text>
              )}
            </View>
          )
        })}
      </View>
    )
  }

  return (
    <View style={[styles.container]}>
      <ScrollView horizontal>
        <View>
          {_headerRender}
          <FlatList
            keyExtractor={(item, index) => {
              if (typeof rowKey === 'function') {
                return rowKey(item, index)
              }
              return item.rowKey || index
            }}
            {...restProps}
            data={dataSource}
            renderItem={_renderItem}
          />
        </View>
      </ScrollView>
    </View>
  )
}
export default Table
