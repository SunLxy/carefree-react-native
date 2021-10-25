import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  itemWarp: {
    marginVertical: 3,
  },
  itemWarpBorderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingBottom: 3,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vertical: {
    flexDirection: 'column',
  },
  space: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  itemInputspace: {
    flex: 1,
    alignItems: 'flex-end',
  },
  labelhorizontal: {
    marginRight: 5,
    justifyContent: 'center',
  },
  labelspace: {
    marginRight: 5,
    justifyContent: 'center',
  },
  itemLabelText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  itemErrText: {
    fontSize: 12,
    color: 'red',
    textAlign: 'right',
    marginTop: 3,
    minHeight: 0,
  },
  labelRedStar: {
    color: 'red',
  },
})
