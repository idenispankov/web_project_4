import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(link, name) {
    this._popupElelement.querySelector('.modal__image').src = link;
    this._popupElelement.querySelector('.modal__image-title').src = name;
    super.open();
  }
}

export default PopupWithImage;