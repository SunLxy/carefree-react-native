---
title: ModalLay
order: 8
---

### 参数

```ts
// 组件参数
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
```

### demo

```js
import React from 'react'
import {ModalLay} from 'carefree-react-native'

export default () => {
  const [visible,setVisible] =React.useState(false)
  return (
    <React.Fragment>
        <TouchableOpacity
          onPress={() => {
            setVisible(true)
          }}>
          <Text>点击</Text>
        </TouchableOpacity>
        <ModalLay visible={visible} onRequestClose={() => setVisible(false)} />
    </React.Fragment>
  )
}

```
