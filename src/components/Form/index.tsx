/*
 * @Description: 当前内容直接参照 https://github.com/react-component/field-form  ，Form 固定 component 为 false， component 设置 false 去除 html中的form标签，使 rc-field-form 可适用于 react-native
 */

import React from 'react'
import Form, {
  useForm,
  FormProps,
  FormInstance,
  FormProvider,
  List,
} from 'rc-field-form'
import Item, { ItemWarpProps } from './Item'
import { FormContext } from './hooks'

export interface CarefreeFormProps
  extends FormProps,
    Omit<ItemWarpProps, 'style'> {
  /** 布局 */
  layout?: 'vertical' | 'horizontal' | 'space'
  /** 输入框外层样式 */
  inputStyle?: ItemWarpProps['style']
  /** 是否有边框   */
  bordered?: boolean
  /** 是否显示冒号 */
  colon?: boolean
  /** 每个 item 下加 下划线 */
  bottomBorder?: boolean
  /** 每个 item 下加 下划线颜色 */
  bottomBorderColor?: string
}

const InitForm: React.ForwardRefRenderFunction<
  FormInstance,
  CarefreeFormProps
> = (props, ref) => {
  const {
    children,
    layout = 'horizontal',
    inputStyle,
    itemStyle,
    labelStyle,
    labelTextStyle,
    bordered = true,
    errStyle,
    errTextStyle,
    warpStyle,
    colon = true,
    name,
    bottomBorder,
    bottomBorderColor,
    ...other
  } = props

  return (
    <FormContext.Provider
      value={{
        layout,
        inputStyle,
        itemStyle,
        labelStyle,
        labelTextStyle,
        bordered,
        errStyle,
        errTextStyle,
        warpStyle,
        colon,
        name,
        bottomBorder,
        bottomBorderColor,
      }}>
      <Form {...other} name={name} ref={ref} component={false}>
        {children}
      </Form>
    </FormContext.Provider>
  )
}

const InternalForm = React.forwardRef<FormInstance, CarefreeFormProps>(
  InitForm,
) as <Values = any>(
  props: React.PropsWithChildren<CarefreeFormProps> & {
    ref?: React.Ref<FormInstance<Values>>
  },
) => React.ReactElement

export type RCFormProps = typeof InternalForm

interface RefForm extends RCFormProps {
  Item: typeof Item
  useForm: typeof useForm
  FormProvider: typeof FormProvider
  List: typeof List
}
const CarefreeForm: RefForm = InternalForm as RefForm

CarefreeForm.Item = Item
CarefreeForm.useForm = useForm
CarefreeForm.FormProvider = FormProvider
CarefreeForm.List = List

export { useForm, Item, FormProvider, List }

export default CarefreeForm
