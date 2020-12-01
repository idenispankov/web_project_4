class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }
  

  _showErrorMessage(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = errorMessage;
  }

  
  _hideErrorMessage(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

  
  _isValid(inputList) {
    return inputList.every((inputElement) => {
      return inputElement.validity.valid;
    });
  }


  checkInputValidity(inputElement) {
    if(inputElement.validity.valid) {
      this._hideErrorMessage(inputElement);
    }else {
      this._showErrorMessage(inputElement, inputElement.validationMessage);
    }
  }

  disableSubmitButton() {
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    buttonElement.disabled = true;
    buttonElement.classList.add(this._settings.inactiveButtonClass);
  }

  
  _toggleButtonState() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

      if(this._isValid(inputList)) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(this._settings.inactiveButtonClass);
      }else {
        this.disableSubmitButton();
    }
  }

  
  _inputEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement,  this._settings.inactiveButtonClass);
      });
    });
  }
  

  
  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._inputEventListeners();
  }
}

export default FormValidator;