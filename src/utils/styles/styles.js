const splashScreen = require('./splashScreen/style');
const loginScreen = require('./loginScreen/style');
const registerScreen = require('./registerScreen/style');
const drawerScreen = require('./drawerScreen/style');
const searchScreen = require('./searchScreen/style');
const displayScreen = require('./displayScreen/style');
const {StyleSheet} = require('react-native');

module.exports = {
  splashScreen: StyleSheet.create(splashScreen),
  loginScreen: StyleSheet.create(loginScreen),
  searchScreen: StyleSheet.create(searchScreen),
  displayScreen: StyleSheet.create(displayScreen),
  registerScreen: StyleSheet.create(registerScreen),
  drawerScreen: StyleSheet.create(drawerScreen),
};
