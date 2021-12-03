import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import SimpleForm from '.'

export default () => {
  const [form] = SimpleForm.useForm()
  const onFish = async () => {
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
      <SimpleForm
        bottomBorder={true}
        form={form}
        name="test"
        watchList={{
          test_namea: value => {
            // eslint-disable-next-line no-console
            console.log('监听打印---》', value)
          },
        }}
        layout="vertical"
        config={[
          {
            label: '测试2222',
            name: 'namea',
            type: 'Input',
            rules: [{ required: true, message: '请输入' }],
            attr: {
              placeholder: '请输入',
            },
          },
        ]}
      />
      {/* <Form form={form}>
        <Form.Item
          name="names"
          rules={[{ required: true, message: '请输入' }]}
          label="测试输入框">
          <ComInput placeholder="请输入" />
        </Form.Item>
      </Form> */}
      <TouchableOpacity onPress={onFish}>
        <Text>测试</Text>
      </TouchableOpacity>
    </View>
  )
}
