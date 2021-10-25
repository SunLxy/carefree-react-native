import React from 'react'
import { View } from 'react-native'
import Button from '.'

export default () => {
  return (
    <React.Fragment>
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <Button>测试按钮</Button>
        <Button.Group
          config={[
            { label: '测试按钮2', value: '12' },
            { label: '测试按钮3', value: '13' },
            { label: '测试按钮4', value: '14' },
          ]}
        />
        <Button.Group
          layout="space"
          config={[
            { label: '测试按钮2', value: '12' },
            { label: '测试按钮3', value: '13' },
            { label: '测试按钮4', value: '14' },
          ]}
        />
      </View>
    </React.Fragment>
  )
}
