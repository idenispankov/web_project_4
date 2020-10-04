class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showErrorMessage(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
    inputElement.classList.add(this._settings.inputErrorClass);
  }

  _hideErrorMessage(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = '';
    errorElement.classList.remove(this._settings.errorClass);
    inputElement.classList.remove(this._settings.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if(inputElement.validity.valid) {
      this._hideErrorMessage(inputElement);
    }else {
      this._showErrorMessage(inputElement, inputElement.validationMessage);
    }
  }

  _toggleButtonState() {

    const isValid = (inputList) => {
      return inputList.some((inputElement) => {
        return inputElement.validity.valid;
      })
    }
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

      if(isValid) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(this._settings.inactiveButtonClass);
      }else {
        buttonElement.disabled = true;
        buttonElement.classList.add(this._settings.inactiveButtonClass);
    }
  }

  _setInputListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement, buttonElement,  this._settings.inactiveButtonClass);
      })
    })
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    })
    this._setInputListeners();
  }
}

export default FormValidator;