import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  itemWarp: {},
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vertical: {
    flexDirection: 'column',
  },
  itemInput: {
    flex: 1,
    paddingHorizontal: 5,
  },
  itemInputBorder: {
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  labelhorizontal: {
    marginRight: 5,
  },
  itemLabelText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  itemErrText: {
    fontSize: 10,
    color: 'red',
  },
})
