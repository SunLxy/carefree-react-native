import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from './styles'
import { solarTolunarReturn } from 'carefree-utils/lib/date/utils'
import { getDateStr } from './utils'
export interface PaneProps {
  list: solarTolunarReturn[]
  checkValue: string
  onPress: (item: solarTolunarReturn) => void
}
const Pane = (props: PaneProps) => {
  const { list, checkValue, onPress } = props

  const _render = list.map((item, index) => {
    const check = getDateStr(item) === checkValue

    return (
      <TouchableOpacity
        onPress={onPress.bind(this, item)}
        key={index}
        style={[
          styles.paneBtn,
          check && item.currentType === 'current' && styles.paneBtnAct,
        ]}>
        <Text
          style={[
            styles.paneBtnText,
            check && item.currentType === 'current' && styles.paneBtnTextAct,
            styles[item.currentType],
          ]}>
          {item.date}
        </Text>
      </TouchableOpacity>
    )
  })

  const _Week = React.useMemo(() => {
    return ['日', '一', '二', '三', '四', '五', '六'].map((wek, key) => {
      return (
        <TouchableOpacity style={styles.paneBtn} key={key} disabled>
          <Text style={styles.paneWeekText}>{wek}</Text>
        </TouchableOpacity>
      )
    })
  }, [])

  return (
    <View style={[styles.pane]}>
      {_Week}
      {_render}
    </View>
  )
}

export default Pane
