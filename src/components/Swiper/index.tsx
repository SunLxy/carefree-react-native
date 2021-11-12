import React from 'react'
import {
  View,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleProp,
  ViewStyle,
} from 'react-native'
import Footer, { FooterProps } from './Footer'
import styles from './styles'
import Item, { ItemProps } from './Item'
export interface ConfigProps {
  title?: React.ReactNode
  [k: string]: any
}
export interface SwiperProps {
  config?: ConfigProps[]
  // 初始第几个 默认第一个
  index?: number
  // 每一项的宽度  默认屏幕宽度
  width?: number
  // 底部点点
  footer?: Omit<FooterProps, 'currentIndex' | 'onChange' | 'config'>
  // 内容区域渲染
  render: ItemProps['render']
  // 是否自动轮询
  auto?: boolean
  // 间隔时间
  time?: number
  // 外层样式
  style?: StyleProp<ViewStyle>
}
const W = Dimensions.get('window').width
const Swiper = (props: SwiperProps) => {
  const {
    index = 0,
    width = W,
    footer,
    render,
    config,
    auto = true,
    time = 6000,
    style,
  } = props
  const scrollViewRef = React.useRef<ScrollView>()

  // 当前是第几个
  const [current, setCurrent] = React.useState(index)

  let currentIndex = current
  if (Reflect.has(props, 'index')) {
    currentIndex = Reflect.get(props, 'index')
  }

  React.useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, x: currentIndex * width })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  // 移动结束 算移动距离
  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const X = event.nativeEvent.contentOffset.x
    const cur = Math.round(X / width)
    setCurrent(cur)
  }
  // 是否自动进行轮播
  React.useEffect(() => {
    let timer
    if (auto) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let ind = currentIndex + 1
        if (ind > config.length - 1) {
          setCurrent(0)
        } else {
          setCurrent(ind)
        }
      }, time)
    }
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  return (
    <View style={[styles.warp, style]}>
      <Footer
        {...footer}
        config={config}
        onChange={setCurrent}
        currentIndex={currentIndex}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        horizontal
        onMomentumScrollEnd={onMomentumScrollEnd}
        pagingEnabled>
        <Item
          config={config}
          currentIndex={currentIndex}
          onChange={setCurrent}
          width={width}
          render={render}
        />
      </ScrollView>
    </View>
  )
}

export default Swiper
