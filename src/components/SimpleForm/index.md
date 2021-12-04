---
title: SimpleForm
order: 14
---

> `SimpleForm`组件表单属性继承 [Form](/components/form) 表单属性
>
> 1. `ItemWatch` 监听变化组件
> 2. `useFormWatchList` 监听变化 hooks
> 3. `useFormContext` 用于传递子组件 开启 监听需要的内容
> 4. `useFormItemFun` 子组件内部状态方法调用
> 5. 其他的与 from 一样

## 基础表单

```js
import React from 'react';
import { SimpleForm } from 'carefree-react-native';

export default () => (
  <SimpleForm
    watchList={{
      namea: () => {},
    }}
    layout="vertical"
    config={[
      {
        label: '测试',
        name: 'namea',
        type: 'Input',
      },
      {
        label: '测试1',
        name: 'name1',
        type: 'Input',
      },
      {
        label: '测试2',
        name: 'name2',
        type: 'Input',
      },
      {
        label: '测试3',
        name: 'name3',
        type: 'Input',
      },
      {
        label: '测试4',
        name: 'name4',
        type: 'Input',
      },
      {
        label: '测试5',
        name: 'name5',
        type: 'Input',
      },
    ]}
  />
);
```

## 查询表单

```js
import React from 'react';
import { SimpleForm } from 'carefree-react-native';

export default () => (
  <SimpleForm
    layout="vertical"
    config={[
      {
        label: '测试',
        name: 'namea',
        type: 'Input',
      },
      {
        label: '测试1',
        name: 'name1',
        type: 'Input',
      },
      {
        label: '测试2',
        name: 'name2',
        type: 'Input',
      },
      {
        label: '测试3',
        name: 'namea3',
        type: 'Input',
      },
      {
        label: '测试4',
        name: 'name4',
        type: 'Input',
      },
      {
        label: '测试5',
        name: 'name5',
        type: 'Input',
      },
    ]}
  />
);
```

## antd 使用表单

```js
import React from 'react';
import { SimpleForm } from 'carefree-react-native';
import {TextInput } from "react-native"

export default () => (
  <SimpleForm layout="vertical" isSearch={true} displayPre={1}>
      <SimpleForm.Item
        label="测试antd"
        name="names"
        style={{ marginBottom: 5 }}
      >
        <TextInput />
      </SimpleForm.Item>
      <SimpleForm.Item label="测试3" name="names3" style={{ marginBottom: 5 }}>
        <TextInput />
      </SimpleForm.Item>
      <SimpleForm.Item label="测试4" name="names4" style={{ marginBottom: 5 }}>
        <TextInput />
      </SimpleForm.Item>
  </SimpleForm>
);
```

## 参数

```ts
export type ItemChildType =
  | 'Custom'
  | 'Input'
  | 'InputNumber'
  | 'Select'
  | 'CheckBox'
  | 'Radio'

export type ItemChildAttr =
  | TextInputProps
  | RadioProps
  | CheckBoxProps
  | SelectProps
  | UploadProps;


/** config 配置项  */
export interface SimpleFormConfigProps {
  /** 类型 */
  type: ItemChildType;
  /** formItem 表单 label 值 */
  label?: string | React.ReactNode;
  /** formItem 表单 name 值 */
  name?: string | number | (string | number)[];
  /** formItem 表单 其他属性值*/
  itemAttr?: Omit<ItemProps, 'rules' | 'label' | 'name'> & {
    /** 用于当前的Item项是否用于监听，(前提是watchList设置了) */ watch?: boolean;
  };
  /** 组件参数 */
  attr: Partial<ItemChildAttr>;
  /** formItem 表单 规则*/
  rules?: Rule[];
  /** 自定义渲染 */ 
  render?: React.ReactNode | ((...arg: any) => React.ReactNode);
}

export interface SimpleFormProps extends CarefreeFormProps {
  config?: SimpleFormConfigProps[];
  children?: React.ReactNode;
  /** 监听字段 */
  watchList?: WatchListProps;
}

export interface WatchListProps {
  /** 字段对应的 监听方法 */
  [s: string]: (value: any, formValue?: any, child?: ChildPropsType) => void
}

```
