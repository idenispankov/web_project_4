import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._setEventListeners();

    this._imageView = document.querySelector('.modal__image');
    this._imageTitleView = document.querySelector('.modal__image-title');
  }

  open() {
    this._imageView.src = link;
    this._imageView.alt = name;
    this._imageTitleView.textContent = name;

    super.open();
  }
}