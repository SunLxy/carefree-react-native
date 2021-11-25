import React from 'react'
import { View } from 'react-native'
import Pagination from '.'

export default () => {
  return (
    <React.Fragment>
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <Pagination total={100} page={10} pageSize={5} />
      </View>
    </React.Fragment>
  )
}
