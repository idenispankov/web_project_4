export default class Popup {
  constructor(popupSelector) {
    this._popupItem = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupItem.classList.add('modal_is-open');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupItem.classList.remove('modal_is-open');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(e) {
    if(e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('click', (e) => {
      if(e.target.classList.contains('form__close-button') || e.target.classList.contains('modal')) {
        this.close();
      }
    });
  }
}