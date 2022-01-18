import {colors} from '../../theme';

module.exports = {
  container: {
    flex: 1,
    backgroundColor: colors.background['200'],
  },
  containerLoaded: {
    flex: 1,
    backgroundColor: colors.background['200'],
  },
  containerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background['200'],
  },
  containerPicker: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
  },
  horizontalContainer: {
    marginTop: 20,
    padding: 2,
  },
  verticalContainer: {
    width: '50%',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.button.background,
  },
  activeButton: {
    backgroundColor: colors.button.backgroundActive,
  },
  smallText: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.link.color,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.link.color,
    paddingTop: 50,
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
    color: colors.link.color,
    paddingTop: 20,
    marginBottom: 5,
  },
};
