import React, { useMemo } from 'react'
import {
  FlatList,
  ScrollView,
  FlatListProps,
  View,
  Text,
  ListRenderItemInfo,
  ViewStyle,
} from 'react-native'
import styles from './styles'

export interface TableItemProps {
  title: string | React.ReactNode;
  dataIndex: string;
  width: number;
  algin?: 'left' | 'center' | 'right';
  style?: ViewStyle;
  render?: (text: any, record: any, index: number) => React.ReactNode;
}
// data, renderItem

export interface TableProps
  extends Omit<FlatListProps<any>, 'data' | 'renderItem'> {
  dataSource: Array<any>;
  columns: Array<TableItemProps>;
  rowKey: string | Function;
  borderColor?: string;
  borderWidth?: number;
  itemStyle?: ViewStyle;
  titleStyle?: ViewStyle;
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
