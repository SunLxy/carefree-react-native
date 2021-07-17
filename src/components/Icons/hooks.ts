import { Animated } from 'react-native'
import { useRef, useMemo } from 'react'

export const useAnimated = (props: { visible: boolean; toValue?: number }) => {
  const { visible, toValue = 1 } = props
  const fadeAnim = useRef(new Animated.Value(0)).current
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }
  useMemo(() => {
    if (visible) {
      fadeIn()
    } else {
      fadeOut()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return {
    fadeAnim,
    fadeOut,
    fadeIn,
  }
}
