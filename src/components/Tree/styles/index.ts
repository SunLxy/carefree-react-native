import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    minHeight: 30,
  },
  itemLeftUp: {
    padding: 5,
    paddingLeft: 0,
    width: 15,
  },
  itemRowTouch: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
})
