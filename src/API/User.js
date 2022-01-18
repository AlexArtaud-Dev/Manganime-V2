import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkAuthority} from './Auth';

async function hasUserStored() {
  try {
    const value = await AsyncStorage.getItem('@storage_user');
    return value !== null;
  } catch (e) {
    console.log(e);
    return value !== null;
  }
}

async function checkAuthorityAndChange() {
  checkAuthority().then(async data => {
    if (data.status) {
      const value = JSON.parse(await AsyncStorage.getItem('@storage_user'));
      if (data.user.authority.level !== value.authority.level) {
        await setUser(
          JSON.stringify({
            id: data.user._id,
            nickname: data.user.nickname,
            email: data.user.email,
            authority: {
              level: data.user.authority.level,
              adminToken: data.user.authority.adminToken,
            },
          }),
        );
      }
    }
  });
}

async function getUser() {
  try {
    await checkAuthorityAndChange();
    const value = await AsyncStorage.getItem('@storage_user');
    return value;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function setUser(user) {
  try {
    await AsyncStorage.setItem('@storage_user', user);
  } catch (e) {
    console.log(e);
  }
}

async function removeUser() {
  try {
    await AsyncStorage.removeItem('@storage_user');
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  hasUserStored,
  getUser,
  setUser,
  removeUser,
};
