import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  border: {
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  warp: {
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
  },
  closeBtn: {
    paddingRight: 3,
  },
  input: {
    padding: 0,
    paddingHorizontal: 4,
    paddingVertical: 3,
    fontSize: 14,
  },
})
