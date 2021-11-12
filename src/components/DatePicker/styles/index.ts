import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  warp: {
    alignItems: 'center',
    width: 300,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
    alignItems: 'center',
  },
  headDate: {},
  headDateText: {
    color: '#000',
    fontWeight: '700',
  },
  headBtn: {
    paddingHorizontal: 5,
  },
  headBtnGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  pane: {
    width: 280.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // borderWidth: 0.2,
    // borderColor: "#ccc",
  },
  paneWeekText: {
    color: '#000',
    fontWeight: '700',
  },
  paneBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 0.2,
    // borderColor: "#ccc",
  },
  paneBtnText: {
    color: '#000',
  },
  paneBtnAct: {
    borderColor: '#1890ff',
    borderWidth: 1,
  },
  paneBtnTextAct: {
    color: '#1890ff',
  },
  pre: {
    color: '#ccc',
  },
  next: {
    color: '#ccc',
  },
})
