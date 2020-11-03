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

  
}

// // GET https://around.nomoreparties.co/v1/groupId/users/me
// getUserInfo() {}

// getAppInfo() {}

// // POST https://around.nomoreparties.co/v1/groupId/cards
// addCardForm({name, link}) {}

// // DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
// removeCard(cardId) {}

// // PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId

// // DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
// changeLikeCardStatus(cardId, like) {}

// // PATCH https://around.nomoreparties.co/v1/groupId/users/me
// setUserInfo({name, about}) {}

// // PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
// setUserAvatar({avatar}) {}