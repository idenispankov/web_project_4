function showErrorMessage(input, form, {errorClass, inputErrorClass, ...rest}) {
  const error = document.querySelector('#' + input.id + '-error');
  error.textContent = input.validationMessage;

  error.classList.add(errorClass);
  input.classList.add(inputErrorClass);
}

function hideErrorMessage(input, form, {errorClass, inputErrorClass, ...rest}) {
  const error = document.querySelector('#' + input.id + '-error');
  error.textContent = '';

  error.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
}

function checkInputValidity(input, form, rest) {
  if(input.validity.valid) {
    hideErrorMessage(input, form, rest);
  }else {
    showErrorMessage(input, form, rest);
  }
}

function toggleButtonState(inputs, button, {inactiveButtonClass, ...rest}) {
  const isValid = inputs.every((input) => input.validity.valid)

  if(isValid) {
    button.removeAttribute('disabled');
    button.classList.remove(inactiveButtonClass);
  }else {
    button.setAttribute('disabled', true);
    button.classList.add(inactiveButtonClass);
  }
}


function enableValidation({formSelector,  inputSelector, submitButtonSelector, ...rest}) {
  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach((form) => {
    form.addEventListener('submit', ((e) => {
      e.preventDefault();
      toggleButtonState(inputs, button, rest);
      form.elements['card-title'].classList.add('form__input_type_error');
      form.elements['card-url'].classList.add('form__input_type_error');
    }))

    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(input, form, rest);
        toggleButtonState(inputs, button, rest);
      })
    })
  })
}


enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
});