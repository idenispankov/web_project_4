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
}

// PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
setUserAvatar(data) {
  return fetch(this._baseUrl + '/users/me/avatar', {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      avatar: data.inputAvatar
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('Error!' + res.statusText)
    }
  }); 
}

// GET https://around.nomoreparties.co/v1/groupId/cards
getCardList() {
  return fetch(this._baseUrl + '/cards', {
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

// POST https://around.nomoreparties.co/v1/groupId/cards
addCard({title, url}) {
  return fetch(this._baseUrl + '/cards', {
    headers: this._headers,
    method: "POST",
    body: JSON.stringify({
      name: title,
      link: url
    })
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    } else {
      return Promise.reject('Error!' + res.statusText)
    }
  })
}

// DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
deleteCard(cardId, card) {
  return fetch(this._baseUrl + '/cards/' + cardId, {
    method: "DELETE",
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

// DELETE https://around.nomoreparties.co/v1/groupId/cards/likes
cardLikesCount(cardId, liked) {
  return fetch(this._baseUrl + '/cards/likes/' + cardId, {
    method: "PUT",
    headers: this._headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Error: ${res.status}`);
  }); 
}

}