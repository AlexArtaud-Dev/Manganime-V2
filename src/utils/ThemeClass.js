import {colors} from './theme';
import {StyleSheet} from 'react-native';
import {
  loginScreen,
  splashScreen,
  registerScreen,
  drawerScreen,
  searchScreen,
  displayScreen,
} from './styles/styles';
class ThemeClass {
  constructor() {
    this.colors = colors;
    this.theme = this.setTheme();
  }

  getTheme() {
    return this.theme;
  }
  getColors() {
    return this.colors;
  }

  setTheme() {
    return {
      splashScreen: splashScreen,
      loginScreen: loginScreen,
      searchScreen: searchScreen,
      displayScreen: displayScreen,
      registerScreen: registerScreen,
      drawerScreen: drawerScreen,
    };
  }
}

module.exports = ThemeClass;
