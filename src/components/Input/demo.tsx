import React from 'react'
import Input from '.'

export default () => {
  const [value, setValue] = React.useState<string | number>(12)
  return <Input bordered={true} value={value} onChange={setValue} />
}
