export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

// GET https://around.nomoreparties.co/v1/groupId/cards
getCardList() {
  return fetch(this._baseUrl + '/cards', {
    headers: this._headers
  })
    .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
    .catch(err => console.log(err))
  }

  // GET https://around.nomoreparties.co/v1/groupId/users/me
getUserInfo() {
  return fetch(this._baseUrl + '/users/me', {
    headers: this._headers
  })
    .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
    .catch(err => console.log(err))
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
    .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
    .catch(err => console.log(err))
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
    .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
    .catch(err => console.log(err))
}

// DELETE https://around.nomoreparties.co/v1/groupId/cards
deleteCard(cardId) {
  return fetch(this.baseUrl + '/cards' + cardId, {
    method: "DELETE",
    headers: this._headers
  })
  .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
  .catch(err => console.log(err))
}

cardLikeAdd(cardId) {
  return fetch(this.baseUrl + '/cards/likes' + cardId, {
    method: "PUT",
    headers: this._headers
  })
  .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
  .catch(err => console.log(err))
}

}