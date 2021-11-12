/** 做一个基础的数据逻辑 */
import React from 'react'
import { View } from 'react-native'
import { paneDate } from 'carefree-utils'
import { analysisDate } from './utils'
import { getStringNumber } from './utils'
import { solarTolunarReturn } from 'carefree-utils/lib/date/utils'
import styles from './styles'
import Head from './Head'
import Pane from './Pane'
type ModeType = 'M' | 'Y'
export interface DatePickerProps {
  value?: string
  onChange?: (value: string, item: any) => void
}

const DatePicker = props => {
  const { value, onChange } = props
  const [current, setCurrent] = React.useState(value)
  let checkValue = current
  if (value) {
    checkValue = value
  }

  const [store, setStore] = React.useState<string>(value)

  const init = React.useMemo(() => {
    let result: any = {}
    if (store) {
      result = analysisDate(store)
    } else {
      result = analysisDate(new Date())
    }
    return {
      dataList: new paneDate().getPaneDate('rn', result.year, result.month),
      date: result,
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
      setStore(valu)
    }
  }
  // 触发上一个
  const onPre = (mode: ModeType) => {
    const { year, month, date } = init.date
    let y = Number(year)
    let m = Number(month)
    let d = date
    if (mode === 'M') {
      m = Number(month) - 1
      if (m <= 0) {
        m = 12
        y = Number(year) - 1
      }
      const monthNum = new Date(y, m, 0).getDate()
      if (date >= monthNum) {
        d = monthNum
      }
    } else {
      y = Number(year) - 1
    }
    let val = `${y}-${getStringNumber(m)}-${getStringNumber(d)}`
    if (d !== date) {
      onUpdateValue(val)
    }
    setStore(val)
  }
  // 触发下一个
  const onNext = (mode: ModeType) => {
    const { year, month, date } = init.date
    let y = Number(year)
    let m = Number(month)
    let d = date
    if (mode === 'M') {
      m = Number(month) + 1
      if (m >= 13) {
        m = 1
        y = Number(year) + 1
      }
      const monthNum = new Date(y, m, 0).getDate()
      if (date >= monthNum) {
        d = monthNum
      }
    } else {
      y = Number(year) + 1
    }
    let val = `${y}-${getStringNumber(m)}-${getStringNumber(d)}`
    if (d !== date) {
      onUpdateValue(val)
    }
    setStore(val)
  }

  return (
    <View style={[styles.warp]}>
      <Head onNext={onNext} onPre={onPre} date={init.date} />
      <Pane list={init.dataList} onPress={onPress} checkValue={checkValue} />
    </View>
  )
}

export default DatePicker
