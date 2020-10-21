export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popupSelector.classList.add('.modal_is-open');
    window.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this.popupSelector.classList.remove('.modal_is-open');
    window.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(e) {
    if(e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.querySelector(".form__close-button").addEventListener('click', () => {
      this.close();
    })
    this._popupElement.addEventListener('click', (e) => {
      if (e.target.classList.contains("modal_is-open")) {
        this.close();
      }
    })
  }
}