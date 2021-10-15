---
title: FuzzySearch
order: 6
---

### demo

```js
import React, { useState } from 'react'
import {FuzzySearch} from 'carefree-react-native'
export default () => {
  const [value, setValue] = useState(undefined)
  const [searchValue, setSearchValue] = useState(undefined)

  return (
    <FuzzySearch
      isClear
      value={value}
      searchValue={searchValue}
      loading={false}
      onCheckValue={item => {
        if (item) {
          setValue(item.label)
          setSearchValue(item.value)
        } else {
          setValue(undefined)
          setSearchValue(undefined)
        }
      }}
      dataList={[
        { label: '测试1', value: '1' },
        { label: '测试2', value: '2' },
        { label: '测试3', value: '3' },
      ]}
    />
  )
}

```
