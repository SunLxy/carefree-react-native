import React from 'react'
import { View } from 'react-native'
import Item, { ItemProps } from './Item'
import { ButtonContext } from './context'
export interface ButtonGroupProps {
  /**  按钮 数组 配置  */
  config?: ItemProps[]
  /** 选中背景色 */
  activeBg?: string
  /** 选中字体颜色背景色  */
  activeColor?: string
  /** 选中边框颜色  */
  activeBorderColor?: string
  /** 布局  分开/合并在一起 */
  layout?: 'space' | 'merge'
  /** 圆角大小 */
  borderRadius?: number
  /** layout===space 按钮间隔宽度  */
  spaceWidth?: number
  /** 选中那个 */
  active?: number | string
  onChange?: (value: string | number) => void
}

const Group: React.FC<ButtonGroupProps> = props => {
  const {
    config,
    onChange,
    active,
    activeBg = 'transparent',
    activeColor = '#1890ff',
    activeBorderColor = '#1890ff',
    layout = 'merge',
    borderRadius = 3,
    spaceWidth = 10,
    children,
    ...rest
  } = props

  const [act, setAct] = React.useState<string | number>(active || '')

  let values = act
  if (Reflect.has(props, 'active')) {
    values = active
  }

  const _render = React.useMemo(() => {
    if (Array.isArray(config)) {
      const lg = config.length - 1
      return config.map((item, index) => {
        return (
          <Item
            key={index}
            {...item}
            number={index === 0 ? 'first' : index === lg ? 'last' : index}
          />
        )
      })
    }
    return <React.Fragment />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(config)])

  const onChangeAct = (value: string | number) => {
    if (onChange) {
      onChange(value)
    }
    if (!Reflect.has(props, 'active')) {
      setAct(value)
    }
  }

  return (
    <ButtonContext.Provider
      value={{
        ...rest,
        activeBg,
        activeColor,
        activeBorderColor,
        spaceWidth,
        borderRadius,
        layout,
        active: values,
        onChange: onChangeAct,
      }}>
      <View style={{ flexDirection: 'row' }}>
        {_render}
        {children}
      </View>
    </ButtonContext.Provider>
  )
}

export default Group
