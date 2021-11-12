import React from 'react'
import { SafeAreaView, View } from 'react-native'
import Swiper from './'

const Demo = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Swiper
        config={[{}, {}, {}]}
        render={({ key, width }) => (
          <View
            key={key}
            style={[
              { width, height: 100 },
              key === 0 && { backgroundColor: 'green' },
              key === 1 && { backgroundColor: 'red' },
              key === 2 && { backgroundColor: 'green' },
            ]}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Demo
