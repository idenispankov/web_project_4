import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);

    this._handleSubmit = handleSubmit;
    this._inputs = this._popupItem.querySelectorAll('.form__input');
  }

  _getInputsValue() {
    this._inputsValue = Array.from(this._inputs);
    this._formValues = {};
    this._inputsValue.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupItem.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputsValue());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
  };
}