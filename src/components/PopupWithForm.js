import Popup from './Popup.js'; 
 
export default class PopupWithForm extends Popup { 
  constructor({popupSelector, handleSubmit}) { 
    super(popupSelector); 

    const formContainer = this._popupElement.querySelector('.form')
    this._container = formContainer;
 
    this._handleSubmit = handleSubmit; 
  } 

 
  _getInputsValue() { 
    this._inputList = this._popupElement.querySelectorAll('.form__input');
    this._inputValues = {};
    this._inputList.forEach((input) => (this._inputValues[input.name] = input.value));

    return this._inputValues;
  }


  setEventListeners() {
    this._container.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputsValue());
    })
    super.setEventListeners();
  }

  close() {
    this._container.reset();
    super.close();
  }

  setSubmit(action) {
    this._handleSubmit = action;
  }

}