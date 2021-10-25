import React from 'react'
import Input from '.'

export default () => {
  const [value, setValue] = React.useState<string | number>(12)
  return <Input value={value} onChange={setValue} />
}
