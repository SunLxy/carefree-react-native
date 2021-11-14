import { solarTolunarReturn } from 'carefree-utils/lib/date/utils'
export const getStringNumber = value => {
  const va = Number(value)
  if (va < 10) {
    return `0${va}`
  }
  return va
}

export interface AnalysisDateRetrun {
  year?: number | string
  month?: number | string
  date?: number | string
  h?: number
  m?: number
  s?: number
}
// 解析出数据
export const analysisDate = (dates: string | Date): AnalysisDateRetrun => {
  const currentDate = new Date(dates)
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const date = currentDate.getDate()
  const h = currentDate.getHours()
  const m = currentDate.getMinutes()
  const s = currentDate.getSeconds()
  return {
    year,
    month: getStringNumber(month),
    date: getStringNumber(date),
    h,
    m,
    s,
  }
}

export const getDateStr = (item: solarTolunarReturn) => {
  const { year, month, date } = item
  return `${year}-${month}-${date}`
}
