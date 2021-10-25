---
title: Button
order: 2
---

## 卡片

### 参数

```ts
// Button 
export interface ButtonProps extends TouchableOpacityProps {
  /** 只有一个字符串子项 字体样式 */
  textStyle?: StyleProp<TextStyle>;
}

// Button.Group 

export interface ItemProps extends TouchableOpacityProps {
  label: React.ReactNode | Function | string;
  /** 唯一值  */ 
  value: number | string;
  /** 只有一个字符串子项 字体样式 */
  textStyle?: StyleProp<TextStyle>;
  /** 第几个 用于按钮组边框设置 内部的 */
  number?: number | "first" | "last"
}

export interface ButtonGroupProps {
  /**  按钮 数组 配置  */
  config?: ItemProps[];
  /** 选中背景色 */
  activeBg?: string;
  /** 选中字体颜色背景色  */
  activeColor?: string;
  /** 选中边框颜色  */
  activeBorderColor?: string;
  /** 布局  分开/合并在一起 */
  layout?: "space" | "merge";
  /** 圆角大小 */
  borderRadius?: number;
  /** layout===space 按钮间隔宽度  */
  spaceWidth?: 10;
  /** 选中那个 */
  active?: number | string;
  // 选中时间
  onChange?: (value: string | number) => void
}


```

### demo

```js
import React from 'react'
import {View} from "react-native"
import {Button} from 'carefree-react-native'

export default () => {
  return (
     <React.Fragment>
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <Button>测试按钮</Button>
        <Button.Group
          config={[
            { label: "测试按钮2", value: "12" },
            { label: "测试按钮3", value: "13" },
            { label: "测试按钮4", value: "14" },
          ]}
        />
         <Button.Group
         layout="space"
          config={[
            { label: "测试按钮2", value: "12" },
            { label: "测试按钮3", value: "13" },
            { label: "测试按钮4", value: "14" },
          ]}
        />
      </View>
    </React.Fragment>
  )
}

```
