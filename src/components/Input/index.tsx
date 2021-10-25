import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import styles from './styles'
export interface InputProps extends Omit<TextInputProps, 'value' | 'onChange'> {
  value?: string | number
  bordered?: boolean
  onChange?: (value: string | number | undefined) => void
}

const Input: React.FC<InputProps> = props => {
  const { bordered, style, ...rest } = props

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
      {...rest}
      onChange={() => {
        return
      }}
      onChangeText={onChangeText}
      value={value}
      style={[
        { padding: 0, paddingHorizontal: 4 },
        bordered && styles.border,
        style,
      ]}
    />
  )
}

export default Input
