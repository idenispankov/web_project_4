import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageView = document.querySelector('.modal__image');
    this._imageTitleView = document.querySelector('.modal__image-title');
  }

  open() {
    this._imageView.src = this._link;
    this._imageView.alt = this._name;
    this._imageTitleView.textContent = this._name;

    super.open();
  }
}