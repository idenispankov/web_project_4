import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(link, name) {
    this._link = link;
    this._name = name;
    this._popupSelector.querySelector('.modal__image').src = this._link;
    this._popupSelector.querySelector('.modal__image-title').textContent = this._name;
    super.open();
  }
}