export default class Card { 
  constructor(data, templateElementSelector,  handleCardClick) { 
    this._name = data.name; 
    this._link = data.link; 
     
    this._templateElementSelector = templateElementSelector;

    this._handleCardClick = handleCardClick;
  } 

  // Private Getting Card Template Function 
  _getCardTemplate() { 
    return document
    .querySelector(this._templateElementSelector)
    .content
    .cloneNode(true);
  } 

  // Private Event Listeners Function 
  _setEventListeners() { 
    this._cardElements.cardLikeButton.addEventListener('click', this._toggleLikeButton); 
    this._cardElements.cardDeleteButton.addEventListener('click', this._deleteCard.bind(this)); 
    this._cardElements.cardImage.addEventListener('click', this._imageViewHandler.bind(this)); 
  } 
 
 
  // Private Like Button Function 
  _toggleLikeButton(e) { 
    e.target.classList.toggle('card__like-button_active'); 
  } 
 
  // Private Delete Card Function 
  _deleteCard() { 
    document.querySelector('.card').remove();
  } 

  // Private Image View Function 
  _imageViewHandler() { 
    const imageModalWindow = document.querySelector('.modal_type_image');  
    const modalImage = imageModalWindow.querySelector('.modal__image');  
    const modalImageTitle = imageModalWindow.querySelector('.modal__image-title');  
  
    modalImageTitle.textContent = this._name;  
    modalImage.src = this._link;  
    modalImage.alt = this._name;  
  
    modalImage.addEventListener('click', () => {
      this._handleCardClick({link: this._link, name: this._name});
    })
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
    this._setEventListeners(); 
 
    return this._card; 
   } 
}  