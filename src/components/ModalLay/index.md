---
title: ModalLay
order: 8
---

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
