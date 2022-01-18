import {setToken, removeToken, getToken, hasTokenStored} from './Token';
import {API_URL} from '@env';

async function checkToken() {
  if (await hasTokenStored()) {
    const token = await getToken();
    // Fetch request on url to check if token is valid
    const response = await fetch(`${API_URL}/user/checkToken`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': `${token}`,
      },
    });
    if (response.status === 200) {
      return true;
    } else {
      await removeToken();
      return false;
    }
  } else {
    return false;
  }
}

async function checkAuthority() {
  if (await hasTokenStored()) {
    const token = await getToken();
    // Fetch request on url to check if token is valid
    const response = await fetch(`${API_URL}/users/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': `${token}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return {status: true, user: data};
    } else {
      return {status: false, message: 'No user found'};
    }
  } else {
    return {status: false, message: 'No token stored'};
  }
}

async function login(data) {
  // Fetch request on url to check if token is valid
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    const token = await response.json();
    return {
      status: true,
      accessToken: token.accessToken,
    };
  } else {
    return {
      status: false,
      token: null,
    };
  }
}

async function register(data) {
  // Fetch request on url to check if token is valid
  const response = await fetch(`${API_URL}/user/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  });
  const responseParsed = await response.json();
  if (response.status === 200) {
    return {
      status: true,
      body: responseParsed,
    };
  } else {
    return {
      status: false,
      body: responseParsed,
    };
  }
}

module.exports = {
  checkToken,
  checkAuthority,
  login,
  register,
};
