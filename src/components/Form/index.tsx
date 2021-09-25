import React from 'react'
import Form, { useForm, FormProps, FormInstance } from 'rc-field-form'
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
}
const CarefreeForm: RefForm = InternalForm as RefForm

CarefreeForm.Item = Item
CarefreeForm.useForm = useForm

export { useForm, Item }

export default CarefreeForm
