---
title: Form
order: 5
---

## 表单

> 参数与 antd form 表单参数一致, 使用 [rc-field-form](https://github.com/react-component/field-form) 进行处理  


### 参数

```ts 

// 表单每一项 自己定义的参数 其他的继承  rc-field-form 的 Field组件参数
export interface ItemProps extends FieldProps {
  /** 布局 */
  layout?: 'vertical' | 'horizontal'
  /** 标签和输入框外层样式(不包含错误提示) */
  itemStyle?: StyleProp<ViewStyle>
  /** 表单项外层样式 */
  warpStyle?: StyleProp<ViewStyle>
  /** label 标签的文本	   */
  label?: string | React.ReactNode
  /**  标签的文本 View 样式   */
  labelStyle?: StyleProp<ViewStyle>
  /**  标签的文本  Text 样式   */
  labelTextStyle?: StyleProp<TextStyle>
  /** 输入框 外层 样式   */
  style?: StyleProp<ViewStyle>
  /** 是否有边框   */
  bordered?: boolean
  /** 错误提示 View 样式     */
  errStyle?: StyleProp<ViewStyle>
  /** 错误提示 Text 样式   */
  errTextStyle?: StyleProp<TextStyle>
}




```



### demo

```js
import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import  { Form } from 'carefree-react-native'
const { Item } = Form
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
  const [form] = Form.useForm()
  const onFish = async () => {
    form
      .validateFields()
      .then(values => {
        // eslint-disable-next-line no-console
        console.log(values)
      }) // Do nothing about submit catch
      // eslint-disable-next-line no-console
      .catch(e => console.log(e))
  }
  // const usernameError = form.getFieldError('username');

  return (
    <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
      <Form form={form}>
        <Item
          name="names"
          rules={[{ required: true, message: '请输入' }]}
          label="测试输入框">
          <ComInput placeholder="请输入" />
        </Item>
      </Form>
      <TouchableOpacity onPress={onFish}>
        <Text>测试</Text>
      </TouchableOpacity>
    </View>
  )
}
```
