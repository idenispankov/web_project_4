import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._modalImage = document.querySelector('.modal__image');
    this._modalImageTitle = document.querySelector('.modal__image-title');
  }

  open() {
    this._modalImage.src = this._link;
    this._modalImage.alt = this._name;
    this._modalImageTitle.textContent = this._name;

    super.open();
  }
}