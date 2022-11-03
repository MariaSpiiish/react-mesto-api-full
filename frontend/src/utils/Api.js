const BASE_URL = 'http://localhost:3010';

function handleResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

export function getUserInfo(token) {
  return fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(handleResponse)
}

export function patchUserInfo(data) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(handleResponse)
}

export function patchUserAvatar(avatar) {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(avatar)
  })
  .then(handleResponse)
}

export function getCards(token) {
  return fetch(`${BASE_URL}/cards`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  .then(handleResponse)
}

export function postNewCard(data) {
    return fetch(`${BASE_URL}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(handleResponse)
}

export function deleteCard(data, id) {
  return fetch(`${BASE_URL}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(handleResponse)
}

export function setCardLike(id, method) {
  return fetch(`${BASE_URL}/cards/${id}/likes`, {
    method: method,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  .then(handleResponse)
}


// export const api = new Api({
//   url: 'http://localhost:3010',
//   headers: {
//     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//     'Content-Type': 'application/json',
//   }
// })