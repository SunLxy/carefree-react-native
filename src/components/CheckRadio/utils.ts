import { ChildItemProps } from './interface'
export const getItemTouchStyle = (
  props: Pick<
    ChildItemProps,
    | 'flexDirection'
    | 'type'
    | 'checkColor'
    | 'disabled'
    | 'disabledBG'
    | 'layout'
    | 'checkBorderColor'
  > & { check: boolean; number: number | 'first' | 'last'; multiple: boolean },
) => {
  const {
    type = 'default',
    flexDirection = 'row',
    checkColor = '#1890ff',
    disabled = false,
    disabledBG = 'rgba(0,0,0,0.1)',
    check,
    layout,
    number,
    multiple,
    checkBorderColor = 'transparent',
  } = props
  let sty = {}
  if (flexDirection === 'column') {
    sty = {
      ...sty,
      paddingVertical: 5,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ccc',
    }
  }

  if (type === 'button') {
    sty = {
      ...sty,
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderWidth: 0.5,
      borderColor: '#ccc',
      borderRadius: 5,
      marginVertical: 5,
    }
  }
  if (
    !multiple &&
    type === 'button' &&
    layout === 'default' &&
    number === 'first'
  ) {
    sty = {
      ...sty,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      marginHorizontal: 0,
    }
  }
  if (
    !multiple &&
    type === 'button' &&
    layout === 'default' &&
    number === 'last'
  ) {
    sty = {
      ...sty,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      marginHorizontal: 0,
    }
  }
  if (
    number &&
    !multiple &&
    type === 'button' &&
    layout === 'default' &&
    !(['last', 'first'] as (number | 'first' | 'last')[]).includes(number)
  ) {
    sty = {
      ...sty,
      borderRadius: 0,
      marginHorizontal: 0,
    }
  }
  if (type === 'button' && check) {
    sty = {
      ...sty,
      backgroundColor: checkColor,
      borderColor: checkBorderColor,
    }
  }
  if (type === 'button' && disabled) {
    sty = {
      ...sty,
      backgroundColor: disabledBG,
    }
  }
  return sty
}
