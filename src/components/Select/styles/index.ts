import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  btnWarp: {
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnColse: {
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#ddd',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  btnOk: {
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#3e84ff',
  },
})
