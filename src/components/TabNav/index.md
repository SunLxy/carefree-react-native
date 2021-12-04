---
title: TabNav
order: 18
---

> 当前组件应用于 TabBar 组件

## TabNav

### 参数

```ts
export interface TabNavProps {
  activeId?: number | string;
  onChange?: (value: string | number) => void;
  layout?: "default" | "vertical";
  config?: ItemProps[];
  warpStyle?: StyleProp<ViewStyle>;
  // 默认背景整体颜色
  defaultBg?: string;
  // 默认边框颜色
  defaultBorderColor?: string;
  // 默认边框颜色
  defaultColor?: string;
  // 选中背景颜色
  checkBg?: string;
  // 选中字体颜色
  checkColor?: string;
  // 选中边框颜色
  checkBorderColor?: string;
  // 边框宽度
  borderWidth?: number;
}
```

### demo

```js
import React from 'react'
import { SafeAreaView, View } from 'react-native'
import {TabNav} from 'carefree-react-native'

const Demo = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ margin: 10 }}>
        <TabNav >
          <TabNav.Item id="23" >测试1</TabNav.Item>
          <TabNav.Item id="233" >测试2</TabNav.Item>
          <TabNav.Item id="234" >测试3</TabNav.Item>
        </TabNav>
        <View style={{ marginVertical: 10 }} />
        <TabNav layout="vertical"  >
          <TabNav.Item id="23" >测试1</TabNav.Item>
          <TabNav.Item id="233" >测试2</TabNav.Item>
          <TabNav.Item id="234" >测试3</TabNav.Item>
        </TabNav>
         <View style={{ marginVertical: 10 }} />
        <TabNav config={[
          { id: "233", title: "测试1" },
          { id: "34", title: "测试2" },
          { id: "23453", title: "测试3" },
          { id: "56", title: "测试4" },
        ]} />
      </View>
    </SafeAreaView>
  )
}

export default Demo

```
