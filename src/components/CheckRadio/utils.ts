import { ChildItemProps } from './interface'
export const getItemTouchStyle = (
  props: Pick<
    ChildItemProps,
    'flexDirection' | 'type' | 'checkColor' | 'disabled' | 'disabledBG'
  > & { check: boolean },
) => {
  const {
    type = 'default',
    flexDirection = 'row',
    checkColor = '#1890ff',
    disabled = false,
    disabledBG = 'rgba(0,0,0,0.1)',
    check,
  } = props
  let sty = {}
  if (flexDirection === 'column') {
    sty = {
      ...sty,
      paddingVertical: 8,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ccc',
    }
  }

  if (type === 'button') {
    sty = {
      ...sty,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderWidth: 0.5,
      borderColor: '#ccc',
      borderRadius: 5,
      marginVertical: 5,
    }
  }

  if (type === 'button' && check) {
    sty = {
      ...sty,
      backgroundColor: checkColor,
      borderColor: 'transparent',
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
