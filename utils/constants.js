// Initial Cards Array  
export const initialCards = [  
  {  
    name: "Yosemite Valley",  
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"  
  },  
  {  
    name: "Lake Louise",  
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"  
  },  
  {  
    name: "Bald Mountains",  
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"  
  },  
  {  
    name: "Latemar",  
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"  
  },  
  {  
    name: "Vanoise National Park",  
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"  
  },  
  {  
    name: "Lago di Braies",  
    link: "https://code.s3.yandex.net/web-code/lago.jpg"  
  }  
]; 

// Default Configs
export const defaultConfig = { 
  formSelector: ".form", 
  inputSelector: ".form__input", 
  submitButtonSelector: ".form__button", 
  inactiveButtonClass: "form__button_disabled", 
  inputErrorClass: "form__input_type_error", 
  errorClass: "form__error_visible" 
}; 

// Cards List 
export const cardContainerSelector = '.elements__list';

// Open Buttons  
export const editProfileButton = document.querySelector('.profile__edit-button');  
export const addCardButton = document.querySelector('.profile__add-button');  
  
// Forms
export const editProfileForm = document.querySelector('.form_type_profile');
export const addCardForm = document.querySelector('.form_type_card');

// Submit Form Buttons
export const submitEditProfileButton = editProfileForm;  
export const submitAddCardButton = addCardForm;
// export const modalFigure = document.querySelector('.modal__figure');
  
// Close Buttons  
// export const closeEditProfileButton = document.querySelector('.form__close-button');  
// export const closeAddCardFormButton = document.querySelector('.form__close-button');  
// export const closeCardImageButton = document.querySelector('.form__close-button_type-image');  