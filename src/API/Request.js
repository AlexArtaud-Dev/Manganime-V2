const {getToken} = require('./Token');
const {hasTokenStored} = require('./Token');
import {API_URL} from '@env';

async function getUserData(token) {
  const response = await fetch(`${API_URL}/users/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    return {
      status: true,
      data: {
        id: data._id,
        nickname: data.nickname,
        email: data.email,
        authority: data.authority,
      },
    };
  } else {
    return {
      status: false,
      data: null,
    };
  }
}

async function getTrendingAnime(limit = 50) {
  if (await hasTokenStored()) {
    const token = await getToken();
    const response = await fetch(`${API_URL}/anime/popular/${limit}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });
    // console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      return {
        status: true,
        data: data,
      };
    } else {
      return {
        status: false,
        data: null,
      };
    }
  } else {
    return {
      status: false,
      data: null,
    };
  }
}

async function getWatchedAnime() {
  console.log(API_URL);
  if (await hasTokenStored()) {
    const token = await getToken();
    const response = await fetch(`${API_URL}/anime/watched`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });
    // console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      return {
        status: true,
        data: data,
      };
    } else {
      return {
        status: false,
        data: null,
      };
    }
  } else {
    return {
      status: false,
      data: null,
    };
  }
}

async function searchAnime(name) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/anime/search/` + name, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    return {
      status: true,
      data: data,
    };
  } else {
    return {
      status: false,
      data: null,
    };
  }
}

async function getAnimeInfos(anime) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/anime/url`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      link: anime.link,
      title: anime.title,
      image: anime.image,
    }),
  });

  if (response.status === 200) {
    const data = await response.json();
    return {
      status: true,
      data: data,
    };
  } else {
    return {
      status: false,
      data: null,
    };
  }
}

async function getStreamingLinks(anime) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/anime/episode/streamingLinks`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      link: anime.link,
      title: anime.title,
      image: anime.image,
    }),
  });

  if (response.status === 200) {
    const data = await response.json();
    return {
      status: true,
      data: data,
    };
  } else {
    return {
      status: false,
      data: null,
    };
  }
}

module.exports = {
  getUserData,
  getTrendingAnime,
  getWatchedAnime,
  searchAnime,
  getAnimeInfos,
  getStreamingLinks,
};
