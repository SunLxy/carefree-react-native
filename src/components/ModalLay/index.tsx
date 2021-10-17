import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import {
  Modal,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  ModalProps,
  StyleProp,
  ViewStyle,
} from 'react-native'
import styles from './styles'

export interface ModalLayProps extends ModalProps {
  /** 宽度 */
  modalWidth?: number | string
  /** 高度 */
  modalHeight?: number | string
  /** 展示位置 */
  mode?: 'bottom' | 'top' | 'right' | 'left'
  /** 内容区域样式 */
  bodyStyle?: StyleProp<ViewStyle>
  /** 展示 隐藏 */
  visible?: boolean
  /** 关闭 */
  onRequestClose?: () => void
}

const ModalLay: React.FC<ModalLayProps> = props => {
  const {
    modalWidth = '75%',
    modalHeight = '60%',
    mode = 'bottom',
    bodyStyle,
    visible,
    onRequestClose,
    ...restProps
  } = props
  const [show, setShow] = useState(visible)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const height = Dimensions.get('window').height
  const width = Dimensions.get('window').width
  // 动画位置
  const getTransform = useMemo(() => {
    switch (mode) {
      case 'left':
        return {
          translateX: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-width, 0],
          }),
        }
      case 'right':
        return {
          translateX: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [width, 0],
          }),
        }
      case 'top':
        return {
          translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-height, 0],
          }),
        }
      case 'bottom':
        return {
          translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [height, 0],
          }),
        }
      default:
        return {
          translateX: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-width, 0],
          }),
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, fadeAnim])

  const fadeOut = useCallback(() => {
    if (onRequestClose) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        onRequestClose()
        setShow(false)
      })
    }
  }, [fadeAnim, onRequestClose])
  const fadeIn = useCallback(() => {
    setShow(true)
    Animated.sequence([
      Animated.delay(1),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start()
  }, [fadeAnim])

  const whiteRender = useMemo(() => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            fadeOut()
          }}
        />
      </View>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRequestClose])

  const warpStyle = useMemo(() => {
    if (['bottom', 'top'].includes(mode)) {
      return false
    }
    if (['left', 'right'].includes(mode)) {
      return true
    }
    return false
  }, [mode])

  const whStyles = useMemo(() => {
    if (mode === 'bottom' || mode === 'top') {
      return {
        width: '100%',
        height: modalHeight,
      }
    }
    if (mode === 'left' || mode === 'right') {
      return {
        height: '100%',
        width: modalWidth,
      }
    }
    return {
      width: '100%',
      height: modalHeight,
    }
  }, [mode, modalWidth, modalHeight])

  useEffect(() => {
    if (visible) {
      fadeIn()
    } else {
      fadeOut()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <React.Fragment>
      <Modal
        animationType="none"
        visible={show}
        transparent
        {...restProps}
        onRequestClose={() => fadeOut()}>
        <View
          style={[
            { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
            warpStyle && { flexDirection: 'row' },
          ]}>
          {['bottom', 'right'].includes(mode) && whiteRender}
          <Animated.View
            style={[
              { backgroundColor: '#fff' },
              styles[mode],
              bodyStyle,
              whStyles,
              {
                transform: [getTransform],
              },
            ]}>
            {show && props.children}
          </Animated.View>
          {['top', 'left'].includes(mode) && whiteRender}
        </View>
      </Modal>
    </React.Fragment>
  )
}
export default ModalLay
