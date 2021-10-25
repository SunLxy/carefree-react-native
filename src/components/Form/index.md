---
title: Form
order: 5
---

## 表单

> 参数与 antd form 表单参数一致, 使用 [rc-field-form](https://github.com/react-component/field-form) 进行处理  


### 参数

```ts 

export interface CarefreeFormProps
  extends FormProps,
  Omit<ItemWarpProps, 'style'> {
  /** 布局 */
  layout?: 'vertical' | 'horizontal' | "space"
  /** 输入框外层样式 */
  inputStyle?: ItemWarpProps['style']
  /** 是否有边框   */
  bordered?: boolean
  /** 是否显示冒号 */
  colon?: boolean;
    /** 每个 item 下加 下划线 */
  bottomBorder?: boolean;
  /** 每个 item 下加 下划线颜色 */
  bottomBorderColor?: string;
}


// 表单每一项 自己定义的参数 其他的继承  rc-field-form 的 Field组件参数
export interface ItemProps extends FieldProps {
  /** 标签和输入框外层样式(不包含错误提示) */
  itemStyle?: StyleProp<ViewStyle>
  /** 表单项外层样式 */
  warpStyle?: StyleProp<ViewStyle>
  /**  标签的文本 View 样式   */
  labelStyle?: StyleProp<ViewStyle>
  /**  标签的文本  Text 样式   */
  labelTextStyle?: StyleProp<TextStyle>
  /** 错误提示 View 样式     */
  errStyle?: StyleProp<ViewStyle>
  /** 错误提示 Text 样式   */
  errTextStyle?: StyleProp<TextStyle>
  /** 输入框 外层 样式   */
  style?: StyleProp<ViewStyle>
  /** 必填样式 */
  required?: boolean

}

```

### demo

```js
import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import Form, { useForm } from 'carefree-react-native'
const ComInput = props => {
  const { value, onChange, ...other } = props
  return (
    <TextInput
      {...other}
      style={{ padding: 0 }}
      onChangeText={onChange}
      value={value}
    />
  )
}
export default () => {
  const [form] = useForm()
  const [form2] = useForm()
  const onFish = async (form) => {
    form
      .validateFields()
      .then(values => {
        // eslint-disable-next-line no-console
        console.log('保存', values)
      }) // Do nothing about submit catch
      // eslint-disable-next-line no-console
      .catch(e => console.log('err', e))
  }

  return (
    <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
      <Form form={form} bottomBorder={true}>
        <Form.Item
          name="names"
          rules={[{ required: true, message: '请输入' }]}
          label="测试输入框">
          <ComInput placeholder="请输入" />
        </Form.Item>
      </Form>
      <TouchableOpacity onPress={onFish.bind(this, form)}>
        <Text>测试</Text>
      </TouchableOpacity>

      <Text style={{ color: 'red' }}> space 格式</Text>
      <Form form={form2} layout="space">
        <Form.Item
          name="names"
          rules={[{ required: true, message: '请输入' }]}
          label="测试输入框">
          <ComInput placeholder="请输入" />
        </Form.Item>
      </Form>
      <TouchableOpacity onPress={onFish.bind(this, form2)}>
        <Text>测试</Text>
      </TouchableOpacity>
    </View>
  )
}

```
