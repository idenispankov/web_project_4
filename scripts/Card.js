export default class Card {
  constructor(data, handleCardClick) {
    this._name = data.name;
    this._link = data.link;

    data.templateElementSelector ? 
    this_.templateElementSelector = data.templateElementSelector :
    this._templateElementSelector = '#card-template';
    
    this._handleCardClick = handleCardClick;
  }

  // Private Like Button Function
  _toggleLikeButton(e) {
    e.target.classList.toggle('card__like-button_active');
  }

  // Private Delete Card Function
  _deleteCard() {
    this._card.remove();
  }

  // Private Image View Function
  _imageViewHandler(imageModalWindow) {
    imageModalWindow.addEventListener('click', () => {
      this._handleCardClick({link: this._link, name: this._name});
    })
  }

  // Private Event Listeners Function
  _setEventListeners() {
    this._cardElements.cardLikeButton.addEventListener('click', this._toggleLikeButton);
    this._cardElements.cardDeleteButton.addEventListener('click', this._deleteCard.bind(this));
    this._cardElements.cardImage.addEventListener('click', this._imageViewHandler.bind(this));
  }

  // Private Getting Card Template Function
  _getCardTemplate() {
    const cardTemplate = document.querySelector(this._templateElementSelector)
    .content.querySelector('.card')
    .cloneNode(true);
        return cardTemplate;
  }

  // Public Create Card Function
  createCard() {
    this._card = this._getCardTemplate();

    const cardLikeButton = this._card.querySelector('.card__like-button');
    const cardDeleteButton = this._card.querySelector('.card__delete-button');
    const cardImage = this._card.querySelector('.card__image');

    cardImage.src = this._link;
    cardImage.alt = this._name;

    const cardText = this._card.querySelector('.card__text');
    cardText.textContent = this._name;

    this._cardElements = {
      cardLikeButton,
      cardDeleteButton,
      cardImage
    }

    this._setEventListeners(cardImage);

    return this._card;
   }
}