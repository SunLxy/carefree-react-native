---
title: Form
order: 5
---

> 参数与 antd form 表单参数一致, 使用 [rc-field-form](https://github.com/react-component/field-form) 进行处理  

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
