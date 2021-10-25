import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import Form, { useForm } from '.'
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
  const onFish = async form => {
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
