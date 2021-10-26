import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  default: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vertical: {
    flexDirection: 'column',
    width: 200,
  },
  verticalItem: {
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  defaultItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  defaulttrueItem: {
    borderBottomColor: '#1890ff',
  },
  verticaltrueItem: {
    borderRightColor: '#1890ff',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
})
