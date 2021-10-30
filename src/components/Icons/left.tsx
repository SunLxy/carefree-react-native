import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { Animated } from 'react-native'
import { useAnimated } from './hooks'
import { IconsProps } from './'
const AnimatedPath = Animated.createAnimatedComponent(Path)
/**
 * @description: Left
 */
export default (props: IconsProps) => {
  const { color = '#1890ff', size = 20, visible = true } = props
  const { fadeAnim } = useAnimated({ visible })
  return (
    <Svg height={size} width={size} viewBox={`0 0 20 20`} fill="none">
      <AnimatedPath
        fill={color}
        opacity={fadeAnim}
        d="M7.39727345,2.21077392 C7.67341324,1.93425491 8.12633841,1.92915248 8.40891014,2.19937732 C8.69148187,2.46960216 8.69669599,2.91282562 8.4205562,3.18934463 L8.4205562,3.18934463 L2.373,9.244 L19.3043125,9.34868466 C19.6909046,9.35104785 20.0023837,9.66635841 20.0000338,10.0529505 C19.9976573,10.4395426 19.6823467,10.7510217 19.2957546,10.7486719 L2.487,10.645 L8.79010593,16.8045692 C9.04172326,17.0504435 9.06714844,17.4340657 8.86619976,17.7077757 L8.7908324,17.7946019 C8.51165882,18.0681882 8.05870375,18.0685065 7.77912894,17.7953128 L7.77912894,17.7953128 L0.20989415,10.398842 C-0.0675492719,10.127731 -0.0702933194,9.68859574 0.203741272,9.41418482 L0.203741272,9.41418482 Z"
      />
    </Svg>
  )
}
