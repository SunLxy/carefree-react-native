import React, { useState } from 'react'
import { ScrollView, View, Button, StyleSheet } from 'react-native'
import {
  RadioIcon,
  CheckBoxIcon,
  CheckMarkIcon,
  XIcon,
  StarIcon,
} from './../Icons'

export default () => {
  const [visible, setVisible] = useState(false)
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <StarIcon visible={visible} />
          <CheckBoxIcon size={20} visible={visible} />
          <RadioIcon visible={visible} />
          <CheckMarkIcon visible={visible} />
          <XIcon />
          <Button
            title="Fade In Or Out"
            onPress={() => {
              setVisible(!visible)
            }}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 16,
  },
})
