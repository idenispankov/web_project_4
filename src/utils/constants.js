// // Initial Cards Array   Seems Like not Needed any more
// export const initialCards = [   
//   {   
//     name: "Yosemite Valley",   
//     link: "https://code.s3.yandex.net/web-code/yosemite.jpg"   
//   },   
//   {   
//     name: "Lake Louise",   
//     link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"   
//   },   
//   {   
//     name: "Bald Mountains",   
//     link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"   
//   },   
//   {   
//     name: "Latemar",   
//     link: "https://code.s3.yandex.net/web-code/latemar.jpg"   
//   },   
//   {   
//     name: "Vanoise National Park",   
//     link: "https://code.s3.yandex.net/web-code/vanoise.jpg"   
//   },   
//   {   
//     name: "Lago di Braies",   
//     link: "https://code.s3.yandex.net/web-code/lago.jpg"   
//   }   
// ];  
 
// Default Configs 
export const defaultConfig = {  
  formSelector: ".form",  
  inputSelector: ".form__input",  
  submitButtonSelector: ".form__button",  
  inactiveButtonClass: "form__button_disabled",  
  inputErrorClass: "form__input_type_error",  
  errorClass: "form__error_visible"  
};

// MODALS
export const editProfileModal = document.querySelector('.modal_type_edit-profile');
export const addCardModal = document.querySelector('.modal_type_add-card');
export const editAvatarModal = document.querySelector('.modal_type_avatar');
export const deleteCardModal = document.querySelector('.modal_type_delete-card');
export const imageModal = document.querySelector('.modal_type_image');


// FORMS
export const editProfileForm = editProfileModal.querySelector('.form');
export const addCardForm = addCardModal.querySelector('.form');
export const editAvatarForm = editAvatarModal.querySelector('.form');


// BUTTONS and DOM
export const editProfileButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const editAvatarButton = document.querySelector('.profile__avatar-edit');

export const profileName = document.querySelector('.profile__text');
export const profileAbout = document.querySelector('.profile__paragraph');

export const profileInputName = document.querySelector('.form__input_type_name');
export const profileInputAbout = document.querySelector('.form__input_type_about');
export const profileAvatar = document.querySelector('.profile__avatar');

export const cardTemplateSelector = '.card-template';
export const cardGrid = document.querySelector('.elements__list');