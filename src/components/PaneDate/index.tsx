/** 做一个基础的数据逻辑 */
import React from 'react'
import { View } from 'react-native'
import { paneDate } from 'carefree-utils'
import { analysisDate } from './utils'
import { AnalysisDateRetrun } from './utils'
import { solarTolunarReturn } from 'carefree-utils/lib/date/utils'
import styles from './styles'
import Head from './Head'
import Pane from './Pane'
type ModeType = 'M' | 'Y'
export interface PaneDateProps {
  value?: string
  onChange?: (value: string) => void
}

const PaneDate: React.FC<PaneDateProps> = props => {
  const { value, onChange } = props

  const [current, setCurrent] = React.useState(value)
  let checkValue = current
  if (value) {
    checkValue = value
  }

  const [store, setStore] = React.useState<AnalysisDateRetrun>(
    analysisDate(value || new Date()),
  )

  const init = React.useMemo(() => {
    return {
      dataList: new paneDate().getPaneDate(
        'rn',
        Number(store.year),
        Number(store.month),
      ),
      date: store,
    }
  }, [store])

  const onUpdateValue = (valu: string) => {
    if (onChange) {
      onChange(valu)
    }
    if (!value) {
      setCurrent(valu)
    }
  }

  // 选择某个日期
  const onPress = (item: solarTolunarReturn) => {
    const { year, month, date, currentType } = item
    let valu = `${year}-${month}-${date}`
    onUpdateValue(valu)
    if (currentType !== 'current') {
      setStore({ year, month })
    }
  }
  // 选中日期不变
  // 触发上一个
  const onPre = (mode: ModeType) => {
    const { year, month } = init.date
    let y = Number(year)
    let m = Number(month)
    if (mode === 'M') {
      m = Number(month) - 1
      if (m <= 0) {
        m = 12
        y = Number(year) - 1
      }
    } else {
      y = Number(year) - 1
    }
    setStore({ year: y, month: m })
  }
  // 选中日期不变
  // 触发下一个
  const onNext = (mode: ModeType) => {
    const { year, month } = init.date
    let y = Number(year)
    let m = Number(month)
    if (mode === 'M') {
      m = Number(month) + 1
      if (m >= 13) {
        m = 1
        y = Number(year) + 1
      }
    } else {
      y = Number(year) + 1
    }
    setStore({ year: y, month: m })
  }

  return (
    <View style={[styles.warp]}>
      <Head onNext={onNext} onPre={onPre} date={init.date} />
      <Pane list={init.dataList} onPress={onPress} checkValue={checkValue} />
    </View>
  )
}

export default PaneDate
