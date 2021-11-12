import React from 'react'
import { ConfigProps } from '.'
export interface ItemProps {
  // 配置
  config: ConfigProps[]
  // 当前哪一个
  currentIndex: number
  // 变更事件
  onChange: (index: number) => void
  // 每一项宽度
  width: number
  // 每一项渲染
  render: ({
    config,
    currentIndex,
    onChange,
    item,
  }: Omit<ItemProps, 'render'> & {
    item: ConfigProps
    key: number
  }) => React.ReactNode
}
const Item = (props: ItemProps) => {
  const { config, currentIndex, onChange, render, width } = props
  const _render = React.useMemo(() => {
    return (config || []).map((item, key) => {
      if (typeof render === 'function') {
        return render({ config, currentIndex, onChange, item, key, width })
      }
      return <React.Fragment />
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(config), currentIndex])
  return <React.Fragment>{_render}</React.Fragment>
}
export default Item
