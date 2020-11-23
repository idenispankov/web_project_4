import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._card = popupSelector;
    this._modalImage = document.querySelector('.modal__image');
    this._modalImageTitle = document.querySelector('.modal__image-title');
  }

  open({name, link}) {
    this._modalImage.src = link;
    this._modalImage.alt = name;
    this._modalImageTitle.textContent = name;

    super.open();
  }
}