import React, { useState } from 'react'
import Form from './../Form'

import {
  useFormContext,
  useFormWatchList,
  useFormItemFun,
  FormContext,
} from './hooks'
import { ItemWatch, itemRender } from './Item'

import { FormInstance } from 'rc-field-form/lib/interface'
import {
  ItemChildType,
  ItemChildAttr,
  SimpleFormConfigProps,
  SimpleFormProps,
} from './interface'

export type {
  ItemChildType,
  ItemChildAttr,
  SimpleFormConfigProps,
  SimpleFormProps,
}

const InternalForm: React.ForwardRefRenderFunction<
  FormInstance,
  SimpleFormProps
> = (props, ref) => {
  const { config = [], children, watchList, form, name, ...rest } = props
  const formRef = React.useRef<FormInstance>()

  const [firstMont, setFirstMont] = useState(false)

  React.useEffect(() => {
    let timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      setFirstMont(true)
    }, 300)
  }, [])
  const [forms] = Form.useForm(form)
  React.useImperativeHandle(ref, () => formRef.current)

  return (
    <FormContext.Provider
      value={{
        firstMont,
        watchList: watchList || {},
        form: forms,
        itemRefHook: formRef.current,
      }}
    >
      <Form {...rest} name={name} form={forms} ref={formRef}>
        {itemRender(config, { watchList, name })}
        {children}
      </Form>
    </FormContext.Provider>
  )
}

const SimpleFormWarp = React.forwardRef<FormInstance, SimpleFormProps>(
  InternalForm,
) as <Values = any>(
  props: React.PropsWithChildren<SimpleFormProps> & {
    ref?: React.Ref<FormInstance<Values>>
  },
) => React.ReactElement

type InternalFormType = typeof SimpleFormWarp
interface FormInterface extends InternalFormType {
  useForm: typeof Form.useForm
  Item: typeof Form.Item
  List: typeof Form.List
  ItemWatch: typeof ItemWatch
  useFormContext: typeof useFormContext
  useFormWatchList: typeof useFormWatchList
  useFormItemFun: typeof useFormItemFun
}

const SimpleForm = SimpleFormWarp as FormInterface

SimpleForm.useForm = Form.useForm
SimpleForm.Item = Form.Item
SimpleForm.List = Form.List
// 下面这几个都是监听字段变化的
SimpleForm.ItemWatch = ItemWatch
SimpleForm.useFormContext = useFormContext
SimpleForm.useFormWatchList = useFormWatchList
SimpleForm.useFormItemFun = useFormItemFun

export default SimpleForm
