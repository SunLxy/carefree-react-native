import React from 'react'
import Card from '.'

export default () => {
  return (
    <React.Fragment>
      <Card
        list={[
          { label: '测试：', value: '33' },
          { label: '测试：', value: '22' },
          { label: '测试：', value: '222' },
          { label: '测试：', value: '323' },
        ]}
      />
      <Card
        title="啊哈哈哈"
        list={[
          { label: '测试：', value: '44' },
          { label: '测试：', value: '22' },
          { label: '测试：', value: '222' },
          { label: '测试：', value: '323' },
        ]}
      />
      <Card />
    </React.Fragment>
  )
}
