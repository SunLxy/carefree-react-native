---
title: Swiper
---

> 轮播图

### 案例

```js

import React from 'react'
import { SafeAreaView, View } from 'react-native'
import {Swiper} from 'carefree-react-native'

const Demo = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Swiper
        config={[{}, {}, {}]}
        render={({ key, width }) => <View key={key}
          style={[{ width, height: 100 }, key === 0 &&
            { backgroundColor: "green" }, key === 1 &&
          { backgroundColor: "red" }, key === 2 &&
          { backgroundColor: "green" }]}
        />}
      />
    </SafeAreaView>
  )
}

export default Demo

```

### 参数

```ts

export interface FooterProps {
  // 配置
  config: ConfigProps[];
  // 渲染
  render?: (currentIndex: number, onChange: FooterProps["onChange"]) => React.ReactNode;
  // 当前那个
  currentIndex: number;
  // 变更当前
  onChange: (index: number) => void;
  // 渲染 label 值
  labelField?: string;
  // 外层样式
  style?: StyleProp<ViewStyle>;
  // 按钮样式
  btnStyle?: StyleProp<ViewStyle>;
  btnActStyle?: StyleProp<ViewStyle>;
  // 按钮内字体样式
  btnTextStyle?: StyleProp<TextStyle>;
  btnTextActStyle?: StyleProp<TextStyle>;
}

export interface ItemProps {
  // 配置
  config: ConfigProps[];
  // 当前哪一个
  currentIndex: number;
  // 变更事件
  onChange: (index: number) => void;
  // 每一项宽度
  width: number;
  // 每一项渲染
  render: ({ config, currentIndex, onChange, item }: Omit<ItemProps, "render"> & { item: ConfigProps, key: number }) => React.ReactNode;
}

export interface SwiperProps {
  config?: ConfigProps[];
  // 初始第几个 默认第一个
  index?: number;
  // 每一项的宽度  默认屏幕宽度
  width?: number;
  // 底部点点
  footer?: Omit<FooterProps, "currentIndex" | "onChange" | "config">;
  // 内容区域渲染
  render: ItemProps["render"];
  // 是否自动轮询
  auto?: boolean;
  // 间隔时间
  time?: number;
  // 外层样式
  style?: StyleProp<ViewStyle>;
}
```

