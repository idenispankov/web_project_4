export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

getAppInfo() {
  return Promise.all([this.getUserInfo(), this.getCardList()]);
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
setUserInfo({name, about}) {
  return fetch(this._baseUrl + '/users/me', {
    headers: this._headers,
    method: "PATCH",
    body: JSON.stringify({
      name,
      about
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
setUserAvatar({avatar}) {
  return fetch(this._baseUrl + '/users/me/avatar', {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      avatar
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
deleteCard(cardId) {
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

// // PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
//   addLike(cardId) {
//     return fetch(this._baseUrl + "/cards/likes/" + cardId, {
//       method: "PUT",
//       headers: this._headers
//     })
//     .then((res) => {
//       if(res.ok) {
//         return res.json()
//       } else {
//         return Promise.reject('Error!' + res.statusText)
//       }
//     })
//   }

//   removeLike(cardId) {
//     return fetch(this._baseUrl + "/cards/likes/" + cardId, {
//       method: "DELETE",
//       headers: this._headers
//     })
//     .then((res) => {
//       if(res.ok) {
//         return res.json()
//       } else {
//         return Promise.reject('Error!' + res.statusText)
//       }
//     })
//   }


}