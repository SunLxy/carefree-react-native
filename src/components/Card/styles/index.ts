import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  warpStyle: {
    borderRadius: 5,
    minHeight: 30,
    flex: 1,
    paddingBottom: 5,
    backgroundColor: 'white',
    marginHorizontal: 10,
    shadowColor: '#696969',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 5,
  },
  itemWarpStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
  },
  titleStyle: {
    width: '100%',
    minHeight: 30,
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  titleTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  itemListWarp: {
    paddingHorizontal: 5,
  },
  itemStyle: {
    minHeight: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  labelTextStyle: {
    color: '#000',
  },
  valueTextStyle: {
    color: '#696969',
    ...Platform.select({
      ios: { fontSize: 16 },
      android: { fontSize: 15 },
    }),
  },
})
