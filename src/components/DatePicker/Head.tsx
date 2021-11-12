import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from './styles'
import { AnalysisDateRetrun } from './utils'
// export { TwoLeftIcon, OneLeftIcon } from './TwoLeft'
// export { TwoRightIcon, OneRightIcon } from './TwoRight'
import {
  TwoLeftIcon,
  OneLeftIcon,
  TwoRightIcon,
  OneRightIcon,
} from './../Icons'
export type ModeType = 'M' | 'Y'

export interface HeadProps {
  onPre: (mode: ModeType) => void
  onNext: (mode: ModeType) => void
  date: AnalysisDateRetrun
}
const Head = (props: HeadProps) => {
  const { onPre, onNext, date } = props

  return (
    <View style={styles.head}>
      <View style={styles.headBtnGroup}>
        <TouchableOpacity
          style={styles.headBtn}
          onPress={onPre.bind(this, 'Y')}>
          <TwoLeftIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headBtn}
          onPress={onPre.bind(this, 'M')}>
          <OneLeftIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.headDate}>
        <Text style={styles.headDateText}>
          {date.year}-{date.month}-{date.date}
        </Text>
      </View>
      <View style={styles.headBtnGroup}>
        <TouchableOpacity
          style={styles.headBtn}
          onPress={onNext.bind(this, 'M')}>
          <OneRightIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headBtn}
          onPress={onNext.bind(this, 'Y')}>
          <TwoRightIcon />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Head
