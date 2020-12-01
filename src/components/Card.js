export default class Card { 
  constructor({data, handleCardClick, handleDeleteClick, handleLikeClick}, templateElementSelector, userId) { 
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;

    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._templateElementSelector = templateElementSelector;
    this._cardElement = this._getCardTemplate();
    this._card = this._cardElement;
    this.likeIcon = this._card.querySelector('.card__like-button');
    this._cardDeleteButton = this._card.querySelector('.card__delete-button');
  } 

  getId() {
    return this._id;
  }

  // Private Getting Card Template Function 
  _getCardTemplate() { 
    return document
    .querySelector(this._templateElementSelector)
    .content.querySelector('.card')
    .cloneNode(true);
  } 

  // Private Event Listeners Function 
  _setEventListeners() { 
    const cardLikeButton = this._card.querySelector('.card__like-button');
    const cardImage = this._card.querySelector('.card__image'); 

    cardLikeButton.addEventListener('click', () => {
      this._handleLikeClick(this.getId());
    }); 

    
    this._cardDeleteButton.addEventListener('click', (e) => {
      this._handleDeleteClick(this.getId());
    }); 


    cardImage.addEventListener('click', () => {
      this._handleCardClick();
    }); 
  } 

  deleteCard() {
    this._card.remove('.card');
  }

  displayDeleteButton() {
    if(this._owner._id !== this._userId) {
      this._cardDeleteButton.style.display = 'none';
    }
  }

  displayLikes() {
    if (this._likes.some((like) => like._id === this._userId)) {
      this.likeIcon.classList.add('card__like-button_active')
    }
  }

  getLikesCount(totalLikes) {
    this._card.querySelector('.card__like-button-count').textContent = totalLikes;
  }
 
 
  // Public Create Card Function 
  createCard() { 
    const cardImage = this._card.querySelector('.card__image'); 
    this._card.querySelector('.card__text').textContent  = this._name;
    cardImage.src = this._link; 
    cardImage.alt = this._name; 
 
    this._setEventListeners(); 
    this.getLikesCount(this._likes.length);
    this.displayLikes();
    this.displayDeleteButton();
 
    return this._card; 
   }

}