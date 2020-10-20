class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('modal_is-open');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('modal_is-open');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose() {
    if(e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (e) => {
      if(e.target.classList.contains('form__close-button') 
      || !e.target.closest('form') 
      || !e.target.closest('modal__image')) {
        this.close();
      }
    })
  }
}

export default Popup;