import React from 'react'
import { View, ViewStyle, StyleProp } from 'react-native'
import styles from './styles'
import { TabBarContext } from './context'
import Item, { ItemProps } from './Item'
import TabNav, { TabNavProps } from './../TabNav'

import { parseTabList } from './utils'

export interface TabBarProps {
  // 直接
  config?: ItemProps[]
  /** 首次 默认选中 */
  defaultId?: string | number
  /** 选中的值 */
  activeId?: string | number
  onChange?: (value: string | number) => void
  /** 布局 */
  layout?: 'default' | 'vertical'
  /** 导航配置 */
  nav?: Omit<TabNavProps, 'config' | 'layout' | 'activeId' | 'onChange'>
  /** 最外层样式 */
  warpStyle?: StyleProp<ViewStyle>
  /** 内容区域样式 */
  bodyStyle?: StyleProp<ViewStyle>
  /** 当前组件内部导航外部样式 */
  headStyle?: StyleProp<ViewStyle>
}

const TabBar: React.FC<TabBarProps> & { Item: typeof Item } = props => {
  const {
    layout = 'default',
    config,
    nav,
    warpStyle,
    bodyStyle,
    headStyle,
  } = props

  const [active, setActive] = React.useState<number | string | undefined>(
    props.defaultId,
  )

  let value = active

  if (Reflect.has(props, 'activeId')) {
    value = props.activeId
  }

  const onChange = (val: number | string) => {
    if (value === val) {
      return
    }
    if (props.onChange) {
      props.onChange(val)
    } else {
      setActive(val)
    }
  }

  const tabs = React.useMemo(() => {
    if (Array.isArray(config)) {
      return config
    }
    return parseTabList(props.children)
  }, [config, props.children])

  const _render = React.useMemo(() => {
    return tabs.map((item, key) => {
      return <Item {...item} key={key} />
    })
  }, [tabs])

  return (
    <TabBarContext.Provider value={{ layout, active: value }}>
      <View style={[warpStyle, styles[layout]]}>
        <View style={[layout === 'vertical' && { marginRight: 3 }, headStyle]}>
          <TabNav
            {...nav}
            layout={layout}
            config={tabs}
            onChange={onChange}
            activeId={value}
          />
        </View>
        <View style={bodyStyle}>{_render}</View>
      </View>
    </TabBarContext.Provider>
  )
}

TabBar.Item = Item

export default TabBar
