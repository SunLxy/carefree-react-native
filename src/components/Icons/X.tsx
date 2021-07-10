
import React from "react"
import Svg, {
  Path,
  Circle
} from 'react-native-svg';
import { Animated } from 'react-native';
import { useAnimated } from "./hooks"
import { IconsProps } from "./"
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
/**
 * @description: 多选
 */
export default (props: IconsProps) => {
  const { color = "#1890ff", size = 20, visible = true } = props
  const { fadeAnim } = useAnimated({ visible })
  return (
    <Svg height={size} width={size} viewBox={`0 0 20 20`} fill="none" >
      <AnimatedCircle
        cx={10}
        cy={10}
        r={9}
        stroke="none"
        strokeWidth="0.5"
        fill={color}
        opacity={fadeAnim}
      />
      <AnimatedPath d={`M 6 6 l 8 8`} stroke="#fff" strokeWidth={2} fill="none" opacity={fadeAnim} />
      <AnimatedPath d={`M 6 14 l 8 -8`} stroke="#fff" strokeWidth={2} fill="none" opacity={fadeAnim} />
    </Svg>
  )
}