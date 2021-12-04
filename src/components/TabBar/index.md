---
title: TabBar
order: 16
---

## TabBar

### 参数

```ts

export interface TabBarProps {
  // 直接
  config?: ItemProps[]
  /** 首次 默认选中 */
  defaultId?: string | number;
  /** 选中的值 */
  activeId?: string | number;
  onChange?: (value: string | number) => void;
  /** 布局 */
  layout?: "default" | "vertical";
  /** 导航配置 */
  nav?: Omit<TabNavProps, "config" | "layout" | "activeId" | "onChange">;
  /** 最外层样式 */
  warpStyle?: StyleProp<ViewStyle>;
  /** 内容区域样式 */
  bodyStyle?: StyleProp<ViewStyle>;
  /** 当前组件内部导航外部样式 */
  headStyle?: StyleProp<ViewStyle>;
}
```

### demo

```js
import React from 'react'
import { SafeAreaView, View } from 'react-native'
import {TabBar} from 'carefree-react-native'

const Demo = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabBar defaultId="23" >
        <TabBar.Item title="标题" id="23" >测试1</TabBar.Item>
        <TabBar.Item title="标题2" id="233" >测试2</TabBar.Item>
        <TabBar.Item title="标题3" id="234" >测试3</TabBar.Item>
      </TabBar>
      <View style={{ marginVertical: 10 }} />
      <TabBar
        defaultId="333"
        layout="vertical"
        config={[
          { title: "测试33", id: "333", children: "33333" },
          { title: "测试34", id: "3334", children: "555" },
          { title: "测试35", id: "3335", children: "666" },
        ]}
      />
    </SafeAreaView>
  )
}

export default Demo

```
