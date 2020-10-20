import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { theme } from 'galio-framework'
import { argonTheme } from '../../constants'

export default StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    minWidth: 400,
    marginBottom: 16,
    marginLeft: 16
  },

  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
    marginRight:20,
  },
  title: {
    paddingBottom: theme.SIZES.BASE/2,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.ACTIVE,
    fontSize: 40,
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 500,
    width: 800,
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
})
