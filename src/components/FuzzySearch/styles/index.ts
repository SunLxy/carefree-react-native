import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  warp: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 35,
    paddingHorizontal: 5,
  },
  warpBorder: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#d6d6d6',
  },
  pressable: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
  searchTip: {
    position: 'relative',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchCloseModal: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  searchTipTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInputWarp: {
    marginHorizontal: 15,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: {
    height: 35,
    paddingRight: 10,
    flex: 1,
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
  },
  searchBtn: {
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchClearnInput: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  emty: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emtyText: {
    color: '#ccc',
  },
  itemCheckFirst: {
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
  },
  itemCheck: {
    minHeight: 40,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomColor: '#ccc',
  },
  loadingWarp: {
    position: 'absolute',
    zIndex: 99,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
