function closeModalOutside(e) {
  toggleModal(e.target);
}

function escCloseModal(e) {
  if (e.key === 'Escape') {
    const modalIsOpen = document.querySelector('.modal_is-open');
    toggleModal(modalIsOpen);
  }
}

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


function imageViewHandler () {
  const modalImage = imageModalWindow.querySelector('.modal__image');
  const modalImageTitle = imageModalWindow.querySelector('.modal__image-title');

  modalImageTitle.textContent = data.name;
  modalImage.src = data.link;
  modalImage.alt = data.name;

  toggleModal(imageModalWindow);
}

class Card {
  constructor(data, templateElementSelector) {
    this._link = data.link;
    this.name = data.name;
    
    this._templateElementSelector = templateElementSelector;
  }

  _getCardTemplate() {
    const cardTemplate = document.querySelector(this._templateElementSelector)
      .content.querySelector('.card').cloneNode(true);
        return cardTemplate;
  }

  _toggleHeart(e) {
    e.target.classList.toggle('card__like-button_active');
  }

  _deleteCard() {
    const list = document.querySelector('.elements__list');
    this._card.remove();
  }

  _imageViewHandler() {

  }

  _setEventListeners() {
    const cardLikeButton = this._card.querySelector('.card__like-button');
    const cardDeleteButton = this._card.querySelector('.card__delete-button');
    const cardImage = this._card.querySelector('.card__image');

    cardLikeButton.addEventListener('click', this._toggleHeart);
    cardDeleteButton.addEventListener('click', () => {
      this._deleteCard();
    })
    cardImage.addEventListener('click', this._imageViewHandler);
  }

  generateCard() {
    this._card = this._getCardTemplate.cloneNode(true);

    const cardImage = this._card.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;

    const cardText = this._card.querySelector('.card__text');
    cardText.textContent = this._name;

    this._setEventListeners();

    return this._card;
   }
}

export default Card;