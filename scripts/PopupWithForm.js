import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.submitHandler = submitHandler;
    this._form = this.popupSelector.querySelectorAll('.form');
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__input');
    this._inputValues = {};
    this._inputList.forEach(input => {this._inputValues[input.name] = input.value});

    return this._inputValues;
  }

  setEventListeners() {
    this._form.addEventListeners('submit', (e) => {
      e.preventDefault();
      this._submitHandler(this._getInputValues());
    })
    super.setEventListeners()
  }

  close() {
    this._form.reset();
  }
}