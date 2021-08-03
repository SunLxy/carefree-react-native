import React from 'react'
import Svg, { Rect } from 'react-native-svg'
import { Animated } from 'react-native'
import { useAnimated } from './hooks'
import { IconsProps } from './'
const AnimatedRect = Animated.createAnimatedComponent(Rect)
/**
 * @description: 半选
 */
export default (props: IconsProps) => {
  const { color = '#1890ff', size = 20, visible = false } = props
  const { fadeAnim } = useAnimated({ visible })
  return (
    <Svg height={size} width={size} viewBox={`0 0 20 20`} fill="none">
      <AnimatedRect
        x="1"
        y="1"
        rx={3}
        ry={3}
        width={18}
        height={18}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="0.5"
        fill="none"
      />
      <AnimatedRect
        x="5"
        y="5"
        width={10}
        height={10}
        stroke="none"
        strokeWidth="0"
        fill={color}
        opacity={fadeAnim}
      />
    </Svg>
  )
}
