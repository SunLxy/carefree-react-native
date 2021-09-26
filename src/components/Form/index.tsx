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
import Item from './Item'

const InitForm: React.ForwardRefRenderFunction<FormInstance, FormProps> = (
  props,
  ref,
) => {
  const { children, ...other } = props
  return (
    <Form {...other} ref={ref} component={false}>
      {children}
    </Form>
  )
}

const InternalForm = React.forwardRef<FormInstance, FormProps>(InitForm) as <
  Values = any,
>(
  props: React.PropsWithChildren<FormProps<Values>> & {
    ref?: React.Ref<FormInstance<Values>>
  },
) => React.ReactElement

export type CarefreeFormProps = typeof InternalForm

interface RefForm extends CarefreeFormProps {
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
