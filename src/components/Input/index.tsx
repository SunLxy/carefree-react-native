import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
export interface InputProps extends Omit<TextInputProps, 'value' | 'onChange'> {
  value?: string | number
  onChange?: (value: string | number | undefined) => void
}

const Input: React.FC<InputProps> = props => {
  const [store, setStore] = React.useState(props.value)
  const state = React.useMemo(() => {
    if (Reflect.has(props, 'value')) {
      return props.value
    }
    return store
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value, store])

  const value = React.useMemo(() => {
    if (typeof state === 'number') {
      return `${state}`
    }
    return state
  }, [state])

  const onChangeText = (target: string | number | undefined) => {
    if (props.onChange) {
      props.onChange(target)
    }
    setStore(target)
  }

  return (
    <TextInput
      {...props}
      onChange={() => {
        return
      }}
      onChangeText={onChangeText}
      value={value}
      style={[{ padding: 0 }, (props || {}).style]}
    />
  )
}

export default Input
