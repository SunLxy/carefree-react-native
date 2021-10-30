import React from 'react'
import Input from '.'

export default () => {
  const [value, setValue] = React.useState<string | number>(12)
  return (
    <React.Fragment>
      <Input bordered={true} value={value} onChange={setValue} />
      <Input bordered={true} />
    </React.Fragment>
  )
}
