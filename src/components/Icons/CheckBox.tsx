
import React from "react"
import Svg, {
  Path,
  Rect,
} from 'react-native-svg';
import { Animated } from 'react-native';
import { useAnimated } from "./hooks"
import { IconsProps } from "./"
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
/**
 * @description: 多选
 */
export default (props: IconsProps) => {
  const { color = "#1890ff", size = 20, visible = false } = props
  const { fadeAnim } = useAnimated({ visible })
  return (
    <Svg height={size} width={size} viewBox={`0 0 20 20`} fill="none" >
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
        x="1"
        y="1"
        rx={3}
        ry={3}
        width={18}
        height={18}
        stroke="none"
        strokeWidth="0"
        fill={color}
        opacity={fadeAnim}
      />
      <AnimatedPath d={`M 2.5  10 l 6 5 l 9 -12`} stroke="#fff" strokeWidth={2} fill="none" opacity={fadeAnim} />
    </Svg>
  )
}