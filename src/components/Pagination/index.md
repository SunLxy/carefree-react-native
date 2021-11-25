---
title: Pagination
order: 2
---

## 分页

### 参数

```ts
export interface PaginationProps {
  /** 总条数 */
  total: number;
  /** 每页数 */
  pageSize: number;
  /** 当前页数 */
  page: number;
  /** 展示范围 */
  around?: number;
}
```

### demo

```js
import React from 'react'
import { View } from 'react-native'
import {Pagination} from 'carefree-react-native'

export default () => {
  return (
    <React.Fragment>
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <Pagination total={100} page={10} pageSize={5} />
      </View>
    </React.Fragment>
  )
}

```
