import {colors} from '../../theme';

module.exports = {
  container: {
    flex: 1,
    backgroundColor: colors.background['200'],
  },
  containerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background['200'],
  },
  searchBar: {
    backgroundColor: colors.background['200']
  },
  heading: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 50,
    paddingTop: 50,
  },
  hoveredInput: {
    borderColor: colors.input.borderColor,
    borderWidth: 2,
  },
  button: {
    backgroundColor: colors.button.background,
  },
  activeButton: {
    backgroundColor: colors.button.backgroundActive,
  },
  signupLink: {
    color: colors.link.color,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: '#FFFFFF',
  },
};
