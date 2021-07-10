import React from "react"
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import { IconsProps } from "./"

import { Animated } from 'react-native';
import { useAnimated } from "./hooks"
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedStop = Animated.createAnimatedComponent(Stop);
/**
 * @description: 单选号
 */
export default (props: IconsProps) => {
  const { color = "#1890ff", size = 20, visible = false } = props
  const { fadeAnim } = useAnimated({ visible })
  return (
    <Svg height={size} width={size} viewBox="0 0 20 20" >
      <Defs>
        <RadialGradient
          id="grad"
          cx={10}
          cy={10}
          rx={10}
          ry={10}
          fx={10}
          fy={10}
          gradientUnits="userSpaceOnUse"
        >
          <AnimatedStop offset={fadeAnim} stopColor={color} stopOpacity="1" />
          <AnimatedStop offset={fadeAnim} stopColor="#fff" stopOpacity="1" />
        </RadialGradient>
      </Defs>
      <AnimatedCircle
        cx={10}
        cy={10}
        r={9}
        stroke="#ccc"
        strokeWidth="0.5"
        fill="#fff"
      />
      <AnimatedCircle
        cx={10}
        cy={10}
        r={6}
        fill="url(#grad)"
      />
    </Svg>
  )
}