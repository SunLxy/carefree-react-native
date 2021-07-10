
import React from "react"
import Svg, {
  Path,
} from 'react-native-svg';
import { Animated } from 'react-native';
import { useAnimated } from "./hooks"
import { IconsProps } from "./"
const AnimatedPath = Animated.createAnimatedComponent(Path);
/**
 * @description: 对勾
 */
export default (props: IconsProps) => {
  const { color = "#1890ff", size = 20, visible = false } = props
  const { fadeAnim } = useAnimated({ visible })
  return (
    <Svg height={size} width={size} viewBox={`0 0 20 20`} fill="none" >
      <AnimatedPath d={`M 2.5  10 l 6 5 l 9 -12`} stroke={color} strokeWidth={2} fill="none" opacity={fadeAnim} />
    </Svg>
  )
}

