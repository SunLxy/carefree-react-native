import ReactNativeBlobUtil from 'react-native-blob-util'
import React from 'react'
import { View, Text } from 'react-native'
export default () => {
  React.useEffect(() => {
    ReactNativeBlobUtil.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
    })
      .fetch(
        'GET',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F21042G4331941H-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643198212&t=b322cf4ddedbc61b27732e5a5da74989',
        {
          //some headers ..
        },
      )
      .then(res => {
        // the temp file path
        // eslint-disable-next-line no-console
        console.log('The file saved to ', res.path())
      })
  }, [])

  return (
    <View>
      <Text>1111</Text>
    </View>
  )
}
