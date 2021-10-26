import React from 'react'
import { View, ViewStyle, StyleProp } from 'react-native'
import { TabNavContext } from './context'
import Item, { ItemProps } from './Item'
import styles from './styles'
export interface TabNavProps {
  activeId?: number | string
  onChange?: (value: string | number) => void
  layout?: 'default' | 'vertical'
  /** 首次 默认选中 */
  defaultId?: string | number
  config?: ItemProps[]
  warpStyle?: StyleProp<ViewStyle>
  // 默认背景整体颜色
  defaultBg?: string
  // 默认边框颜色
  defaultBorderColor?: string
  // 默认边框颜色
  defaultColor?: string
  // 选中背景颜色
  checkBg?: string
  // 选中字体颜色
  checkColor?: string
  // 选中边框颜色
  checkBorderColor?: string
  // 边框宽度
  borderWidth?: number
}

const TabNav: React.FC<TabNavProps> & { Item: typeof Item } = props => {
  const {
    layout = 'default',
    activeId,
    warpStyle,
    defaultBg = 'transparent',
    defaultBorderColor = '#ccc',
    defaultColor = '#000',
    checkBg = 'transparent',
    checkColor = '#1890ff',
    checkBorderColor = '#1890ff',
    borderWidth = 1.5,
    config,
    defaultId,
  } = props

  const [active, setActive] = React.useState(defaultId)
  let values = active
  if (Reflect.has(props, 'activeId')) {
    values = activeId
  }
  const onChange = (val: number | string) => {
    if (values === val) {
      return
    }
    if (props.onChange) {
      props.onChange(val)
    } else {
      setActive(val)
    }
  }

  const _render = React.useMemo(() => {
    if (Array.isArray(config)) {
      return config.map((item, key) => {
        return <Item {...item} key={key} />
      })
    }
    return <React.Fragment />
  }, [config])

  return (
    <TabNavContext.Provider
      value={{
        active: values,
        layout,
        onChange,
        defaultBg,
        defaultBorderColor,
        defaultColor,
        checkBg,
        checkColor,
        checkBorderColor,
        borderWidth,
      }}>
      <View style={[warpStyle, styles[layout]]}>
        {_render}
        {props.children}
      </View>
    </TabNavContext.Provider>
  )
}

TabNav.Item = Item
export default TabNav
