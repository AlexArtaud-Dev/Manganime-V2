import AsyncStorage from '@react-native-async-storage/async-storage';

async function hasTokenStored() {
  try {
    const value = await AsyncStorage.getItem('@storage_token');
    return value !== null;
  } catch (e) {
    console.log(e);
    return value !== null;
  }
}

async function getToken() {
  try {
    return await AsyncStorage.getItem('@storage_token');
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function setToken(token) {
  try {
    await AsyncStorage.setItem('@storage_token', token);
  } catch (e) {
    console.log(e);
  }
}

async function removeToken() {
  try {
    await AsyncStorage.removeItem('@storage_token');
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  hasTokenStored,
  getToken,
  setToken,
  removeToken,
};
