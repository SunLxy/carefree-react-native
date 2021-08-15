import React, { useRef } from 'react'
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Dimensions,
  NativeSyntheticEvent,
} from 'react-native'
const App = () => {
  const width = Dimensions.get('window').width

  const pageX = 50
  const pan = useRef<any>(new Animated.ValueXY()).current
  let pan2 = useRef<any>(new Animated.Value(0)).current
  let pan3 = useRef<boolean>(false)

  // 向左移动  按钮展示 需要展开的宽度的3/4 可自动展开 超过展开宽度 弹性返回
  // 向右移动  按钮隐藏 需要展开的宽度的1/4 可自动隐藏 超过自动返回
  // 为0 保持原样，不动

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // console.log("测试", e.nativeEvent)
        pan.setOffset({
          x: pan.x._value,
          y: 0,
        })
      },
      onPanResponderMove: Animated.event(
        [
          null, // 忽略原始事件
          { dx: pan.x },
        ], // 手势状态参数
        {
          listener: (
            event: NativeSyntheticEvent<unknown>,
            gestureState: any,
          ) => {
            const { moveX, x0 } = gestureState
            const mov = x0 - moveX
            if (mov > 0 && !pan3.current) {
              // 大于0 并且pan2的值不是 pageX 变更大小
              if (mov >= 50) {
                pan2.setValue(50)
              } else {
                pan2.setValue(mov)
              }
            } else if (mov < 0) {
              // 小于0 的话 判断是否是展开状态 如果是 则进行操作 否值不进行变更
              if (pan3.current) {
                const mov1 = pageX + (x0 - moveX)
                // 值变更
                // mov1 小于 0 则值就为0
                if (mov1 < 0) {
                  pan2.setValue(0)
                } else {
                  pan2.setValue(mov1)
                }
              }
            }
          },
        } as any, // 可选的异步监听函数
      ),
      onPanResponderRelease: (e, gestureState) => {
        const { moveX, x0 } = gestureState
        const mov = x0 - moveX
        if (mov > 0) {
          if (pan3.current) {
            pan3.current = true
          } else if (!pan3.current && mov > 20) {
            pan3.current = true
            pan2.setValue(pageX)
          } else {
            pan3.current = false
          }
        }
        if (mov < 0) {
          // 展开状态
          if (pan3.current) {
            if (mov < -20) {
              pan2.setValue(0)
              pan3.current = false
            } else {
              pan3.current = true
            }
          } else {
            pan3.current = false
          }
        }
        // 算距离
        // // 负数 右移动
        // // 正数 左移动
        Animated.spring(
          pan, // Auto-multiplexed
          {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          },
        ).start()
      },
    }),
  ).current

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.titleText}>Drag this box!</Text>
      <View style={{ width, flexDirection: 'row', overflow: 'hidden' }}>
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }],
            flex: 1,
            // width: 300,
            backgroundColor: 'blue',
          }}
          {...panResponder.panHandlers}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff' }}>测试</Text>
          </View>
        </Animated.View>
        <Animated.View
          style={{
            width: pan2,
            height: 20,
            backgroundColor: 'red',
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
})

export default App
