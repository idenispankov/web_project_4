export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(link, name) {
    this._popupSelector.querySelector('.modal__image').src = link;
    this._popupSelector.querySelector('.modal__image-title').src = name;
    super.open();
  }
}