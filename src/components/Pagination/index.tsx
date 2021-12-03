import React from 'react'
import Button, { ButtonProps } from './../Button'
import { getShowList } from './utils'
import { View, StyleProp, ViewStyle } from 'react-native'
import styles from './styles'
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
  /** 按钮样式 */
  btnStyle?: StyleProp<ViewStyle>
  /** 按钮配置样式 */
  btnProps?: Omit<ButtonProps, 'style'>
  /** 选中字体颜色 */
  checkFontColor?: string
  /** 选中背景色 */
  checkBgColor?: string
  /*** 选中边框颜色 */
  checkBorderColor?: string
  onChange?: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = props => {
  const {
    total,
    pageSize,
    page,
    around = 1,
    onChange,
    btnStyle,
    btnProps,
    checkFontColor = '#1890ff',
    checkBgColor = 'transparent',
    checkBorderColor = '#1890ff',
  } = props
  const options = React.useMemo(() => {
    return getShowList(page, pageSize, total, around)
  }, [total, pageSize, page, around])

  const onPage = (pag: number | string) => {
    if (typeof page === 'number') {
      onChange && onChange(pag as number)
    }
  }

  const _render = options.map((keys, index) => {
    return (
      <Button
        activeOpacity={0.5}
        {...btnProps}
        onPress={onPage.bind(this, keys)}
        borderColor={keys === page ? checkBorderColor : '#ccc'}
        textStyle={[
          { fontSize: 12 },
          (btnProps || {}).textStyle,
          keys === page && { color: checkFontColor },
        ]}
        style={[
          styles.btnStyle,
          btnStyle,
          keys === page && { backgroundColor: checkBgColor },
        ]}
        key={index}
      >
        {keys}
      </Button>
    )
  })

  return <View style={styles.warp}>{_render}</View>
}
export default Pagination
