export default class Popup {
  constructor(popupSelector) {
    this._popupItem = document.querySelector();
    this._popup = this._popupItem.parentElement;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleCloseButton = this._handleCloseButton.bind(this);
  }

  open() {
    this._popup.classList.add('modal_is-open');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('modal_is-open');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleCloseButton() {
    if(e.target.classList.contains('form__close-button') || e.target.classList.contains('modal')) {
      this.close();
    }
  }

  _handleEscClose(e) {
    if(e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {

  }
}