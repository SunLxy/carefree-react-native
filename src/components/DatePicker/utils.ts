export interface MoveDateProps {
  /** 最大选择日期  **/
  max?: string
  /** 最小选择日期 */
  min?: string
}

export interface DateObjProps<T> {
  year?: T
  month?: T
  date?: T
  h?: T
  m?: T
  s?: T
}

type StrType = 'min' | 'max' | 'maxEqual' | 'minEqual' | 'default'

type keyType = 'year' | 'month' | 'date' | 'h' | 'm' | 's'

const getRangeNumber = (start: number, end: number) => {
  const lg = end - start
  let arr: number[] = []
  for (let i = 0; i < lg; i++) {
    arr.push(i + start)
  }
  return arr
}

/** 日期动 则其他数据进行联动 **/
class MoveDate {
  /** 最大选择日期 **/
  private max: DateObjProps<number> = undefined
  /** 最小选择日期 */
  private min: DateObjProps<number> = undefined

  // 当前数据
  private year: number = undefined
  private month: number = undefined
  private date: number = undefined
  private h: number = undefined
  private m: number = undefined
  private s: number = undefined

  // 结果展示数组
  private dateList: DateObjProps<number[]> = {}

  private dateStr: DateObjProps<number> = {}

  constructor(props: MoveDateProps) {
    this.init(props || {})
  }

  /** 初始化值 */
  private init = (props: MoveDateProps) => {
    ['max', 'min'].forEach(key => {
      if (Reflect.has(props, key)) {
        this[key] = this.analysisDate(props[key])
      }
    })
  }
  move = async (date: string) => {
    const result = this.analysisDate(date)
    Object.entries(result).forEach(([key, value]) => {
      this[key] = value
    })
    await this.getMonth()
    return {
      data: this.dateList,
      str: this.dateStr,
    }
  }
  // 解析出数据
  private analysisDate = (dates: string) => {
    const currentDate = new Date(dates)
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const date = currentDate.getDate()
    const h = currentDate.getHours()
    const m = currentDate.getMinutes()
    const s = currentDate.getSeconds()
    return { year, month, date, h, m, s }
  }

  /**
   * 当年份开始动的时候
   * 1. 判断是否存在年份限制
   * 2. 获取点击年份的月份的天数 判断月份和天数是否在限制内，不在则取最大或最小限制月份和天数'
   * date:"2021-12-12 12:12:12"
   * */
  private getMonth = async () => {
    let start = 0
    let str: StrType = 'default'
    if (this.min && this.min.year === this.year) {
      // 判断当前选中月份是否合法
      if (this.month < this.min.month) {
        this.dateStr.month = this.min.month
        start = this.min.month
        str = 'min'
      } else if (this.month === this.min.month) {
        this.dateStr.month = this.min.month
        start = this.min.month
        str = 'minEqual'
      }
      // 获取月份数据
      this.dateList.month = getRangeNumber(start, 12)
    } else if (this.min && this.max.year === this.year) {
      // 判断当前选中月份是否合法
      if (this.month > this.max.month) {
        this.dateStr.month = this.max.month
        start = this.max.month
        str = 'max'
      } else if (this.month === this.max.month) {
        this.dateStr.month = this.max.month
        start = this.max.month
        str = 'maxEqual'
      }
      // 获取月份数据
      this.dateList.month = getRangeNumber(0, start)
    } else {
      // 其他情况不做处理
      this.dateList.month = getRangeNumber(0, 12)
    }
    await this.getDate(str)
  }

  private setDateCom = async (
    str: StrType,
    key: keyType,
    num: number,
    nextFun?: string,
  ) => {
    let start = 0
    let nextStr: StrType = 'default'
    const monthDay = num
    if (str === 'min') {
      // 判断当前选中天数是否合法
      if (this[key] < this.min[key]) {
        this.dateStr[key] = this.min[key]
        start = this.min[key]
        nextStr = 'min'
      } else if (this[key] === this.min[key]) {
        this.dateStr[key] = this.min[key]
        start = this.min[key]
        nextStr = 'minEqual'
      }
      // 当月天数
      this.dateList[key] = getRangeNumber(start, monthDay)
    } else if (str === 'max') {
      // 判断当前选中天数是否合法
      if (this[key] > this.max[key]) {
        this.dateStr[key] = this.max[key]
        start = this.max[key]
        nextStr = 'max'
      } else if (this[key] === this.max[key]) {
        this.dateStr[key] = this.max[key]
        start = this.max[key]
        nextStr = 'maxEqual'
      }
      // 当月天数
      this.dateList[key] = getRangeNumber(0, start)
    } else if (str === 'maxEqual') {
      this.dateStr[key] = this.max[key]
      start = this.max[key]
      nextStr = 'maxEqual'
      this.dateList[key] = getRangeNumber(0, start)
    } else if (str === 'minEqual') {
      this.dateStr[key] = this.min[key]
      start = this.min[key]
      nextStr = 'minEqual'
      this.dateList[key] = getRangeNumber(start, monthDay)
    } else {
      this.dateList[key] = getRangeNumber(0, start)
    }
    if (nextFun && this[nextFun]) {
      await this[nextFun](nextStr)
    }
  }

  /**
   * 当月份开始动的时候(前面其他的不用动)
   * 1. 判断天数是否在限制内，不在则取最大或最小限制天数
   * **/
  private getDate = async (str: StrType) => {
    /**
     * 数据返回格式 返回的是天数
     * */
    await this.setDateCom(
      str,
      'date',
      new Date(this.year, this.month, 0).getDate(),
      'getHours',
    )
  }
  /**
   * 当天数开始动的时候(前面其他的不用动)
   * **/
  private getHours = async (str: StrType) => {
    await this.setDateCom(str, 'h', 60, 'getMinutes')
  }
  /**
   * 如果时分秒也做限制 (前面其他的不用动)
   * 1. 上面年份动 再加上时分秒的限制
   * **/
  private getMinutes = async (str: StrType) => {
    await this.setDateCom(str, 'm', 60, 'getSeconds')
  }
  /**
   *  动小时(前面其他的不用动)
   * */
  private getSeconds = async (str: StrType) => {
    await this.setDateCom(str, 's', 60)
  }
}

export default MoveDate
