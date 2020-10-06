// Function To Close Modals On Click Outside of Forms 
function closeModalOutside(e) { 
  toggleModal(e.target); 
} 

// Function To Close Modals on Esc 
function escCloseModal(e) { 
  if (e.key === 'Escape') { 
    const modalIsOpen = document.querySelector('.modal_is-open'); 
    toggleModal(modalIsOpen); 
  } 
}

// Toggle Function 
function toggleModal(modal) { 
  if(!modal.classList.contains('modal_is-open')) { 
    modal.addEventListener('click', closeModalOutside); 
    window.addEventListener('keydown', escCloseModal); 
  } else { 
    modal.removeEventListener('click', closeModalOutside); 
    window.removeEventListener('keydown', escCloseModal); 
  } 
  modal.classList.toggle('modal_is-open'); 
} 

class Card {
  constructor(data, templateElementSelector) {
    this._name = data.name;
    this._link = data.link;
    
    this._templateElementSelector = templateElementSelector;
  }

  _toggleLikeButton(e) {
    e.target.classList.toggle('card__like-button_active');
  }

  _deleteCard() {
    this._card.remove();
  }

  _imageViewHandler() {
    const imageModalWindow = document.querySelector('.modal_type_image'); 
    const modalImage = imageModalWindow.querySelector('.modal__image'); 
    const modalImageTitle = imageModalWindow.querySelector('.modal__image-title'); 
 
    modalImageTitle.textContent = this._name; 
    modalImage.src = this._link; 
    modalImage.alt = this._name; 
 
    toggleModal(imageModalWindow); 
  }

  _setEventListeners() {
    this._cardElements.cardLikeButton.addEventListener('click', this._toggleLikeButton);
    this._cardElements.cardDeleteButton.addEventListener('click', this._deleteCard.bind(this));
    this._cardElements.cardImage.addEventListener('click', this._imageViewHandler.bind(this));
  }

  _getCardTemplate() {
    const cardTemplate = document.querySelector(this._templateElementSelector)
    .content.querySelector('.card')
    .cloneNode(true);
        return cardTemplate;
  }

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

export default Card;