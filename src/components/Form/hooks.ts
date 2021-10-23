import React from 'react'
import { ItemWarpProps } from './Item'
import { getItemFun, GetItemFunType } from './utils'
import { FormInstance } from 'rc-field-form/lib/interface'
import { WatchListProps } from '.'
export interface FormContextProps extends Omit<ItemWarpProps, 'style'> {
  /** 布局 */
  layout?: 'vertical' | 'horizontal'
  /** 输入框外层样式 */
  inputStyle?: ItemWarpProps['style']
  /** 是否有边框   */
  bordered?: boolean
  form?: FormInstance
  firstMont: boolean
  watchList: WatchListProps
  name?: string
  colon?: boolean
}

export const FormContext = React.createContext<FormContextProps>({
  firstMont: false,
  watchList: {},
})

export const useFormContext = () => React.useContext(FormContext)

// 1. 监听字段变化进行联动
export const WatchContext = React.createContext({})

export const useWatchContext = () => React.useContext(WatchContext)

// 2. 显示隐藏item组件
export const HideContext = React.createContext({})

export const useHideContext = () => React.useContext(HideContext)

// 这种方法其他可以使用 Form.
export const useFormWatchList = (props: { [x: string]: any }) => {
  const contex = useFormContext()
  const hideContext = useHideContext()
  let fun:
    | ((
        value: any,
        formValue?: any,
        child?: GetItemFunType,
        hideContext?: any,
      ) => void)
    | undefined
  let childProps: GetItemFunType = getItemFun(contex.form)
  if (contex) {
    const { watchList } = contex
    fun = watchList[(props || {}).id]
  }
  React.useEffect(() => {
    if ((contex || {}).firstMont) {
      const { getFieldsValue } = contex.form
      if (typeof fun === 'function') {
        fun(
          (props || {}).value,
          getFieldsValue(true),
          { ...childProps },
          hideContext,
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify((props || {}).value)])
  return [childProps]
}
