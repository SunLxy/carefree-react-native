import React from 'react'
// import Button from "src/components/Button"
import { getShowList } from './utils'
export interface PaginationProps {
  /** 总条数 */
  total: number
  /** 每页数 */
  pageSize: number
  /** 当前页数 */
  page: number
  /** 展示范围 */
  around?: number
  /** 禁用 */
  disabled?: boolean
  /** 禁用颜色 */
  disabledColor?: boolean
}

const Pagination: React.FC<PaginationProps> = props => {
  const { total, pageSize, page, around = 2 } = props
  const options = React.useMemo(() => {
    return getShowList(page, pageSize, total, around)
  }, [total, pageSize, page, around])

  // eslint-disable-next-line no-console
  console.log(options)

  return <React.Fragment />
}
export default Pagination
