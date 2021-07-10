import React, { useMemo } from "react"

import { TouchableOpacity, Text } from "react-native"

import { getOptionsValue } from "./../utils"

export interface OptionsProps {
  label: number | string;
  value: number | string;
}

export interface SelectProps {
  /** 值 */
  value?: Array<string | number> | string | number | undefined;
  /** 选择数据 */
  options?: Array<OptionsProps>;
  /** 值变化事件  */
  onChange?: (t: any) => void;
  /** 是否多选 */
  multiple?: boolean;
  /** 提示 */
  placeholder?: string
}

const Select: React.FC<SelectProps> = (props) => {
  const { value, options = [], multiple = true, placeholder = "请选择" } = props

  const render = useMemo(() => {
    const showValue = getOptionsValue(value, options, multiple)
    if (showValue) {
      return showValue
    }
    return placeholder
  }, [value, options, multiple, placeholder])
  return <React.Fragment>
    <TouchableOpacity>
      <Text>{render}</Text>
    </TouchableOpacity>
  </React.Fragment>
}

export default Select;
