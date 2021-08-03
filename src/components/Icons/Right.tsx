import React from 'react'
import Svg, { Polygon } from 'react-native-svg'
import { Animated } from 'react-native'
import { useAnimated } from './hooks'
import { IconsProps } from './'
const AnimatedPolygon = Animated.createAnimatedComponent(Polygon)
/**
 * @description: Right
 */
export default (props: IconsProps) => {
  const { color = '#1890ff', size = 20, visible = true } = props
  const { fadeAnim } = useAnimated({ visible })
  return (
    <Svg height={size} width={size} viewBox={`0 0 20 20`} fill="none">
      <AnimatedPolygon
        points="0,0 20,10 0,20"
        fill={color}
        stroke="none"
        strokeWidth="0"
        opacity={fadeAnim}
      />
    </Svg>
  )
}
