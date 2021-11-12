import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  warp: {
    position: 'relative',
  },
  // 底部
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerBtn: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  footerBtnAct: {
    borderColor: '#1890ff',
  },
  footerBtnText: {
    color: '#000',
  },
  footerBtnActText: {
    color: '#1890ff',
  },
})
