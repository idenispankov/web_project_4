export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

// GET https://around.nomoreparties.co/v1/groupId/users/me
getUserInfo() {
  return fetch(this._baseUrl + '/users/me', {
    headers: this._headers
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    } else {
      return Promise.reject('Error!' + res.statusText)
    }
  })
}

  // PATCH https://around.nomoreparties.co/v1/groupId/users/me
setUserInfo(data) {
  return fetch(this._baseUrl + '/users/me', {
    headers: this._headers,
    method: "PATCH",
    body: JSON.stringify({
      name: data.inputName,
      about: data.inputAbout
    })
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    } else {
      return Promise.reject('Error!' + res.statusText)
    }
  })
  .catch(err => console.log(err));
}

// PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
setUserAvatar(data) {
  return fetch(this._baseUrl + '/users/me/avatar', {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      avatar: data.avatarUrl
    })
  }).then(res => {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Error: ${res.status}`);
  }); 
}

}