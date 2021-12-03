import React from 'react'
import { View } from 'react-native'
import Pagination from '.'

export default () => {
  const [page, setPage] = React.useState(10)
  return (
    <React.Fragment>
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <Pagination onChange={setPage} total={100} page={page} pageSize={5} />
      </View>
    </React.Fragment>
  )
}
