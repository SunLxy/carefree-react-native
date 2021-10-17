import { OptionsProps } from './../Select'
/**
 * @description: 根据值获取options里面的值
 * @param {Array<number|string>|string|number} value 值
 * @param {Array<{label:number|string;value:number|string}>} options 选择项
 * @return {string}
 */
export const getOptionsValue = (
  value: Array<string | number> | string | number | undefined,
  options: OptionsProps[],
  multiple: boolean,
): string | React.ReactNode | number | undefined => {
  // 多选
  if (multiple) {
    const defaultValue = (value || []) as Array<number | string>
    const list = options.filter(item => defaultValue.includes(item.value))
    const result = list.map(item => item.label)
    return result.toString()
  }
  const resultItem = options.find(item => item.value === value)
  if (resultItem) {
    return resultItem.label
  }
  return undefined
}
