import {toggleModal} from './utils.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Popup from './Popup.js';

// Initial Cards Array 
const initialCards = [ 
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
 

// Modal Windows 
// const editProfileModal = document.querySelector('.modal_type_edit-profile');
// const addCardModal = document.querySelector('.modal_type_add-card'); 
// const imageModalWindow = document.querySelector('.modal_type_image'); 

const editProfileModal = new PopupWithForm('.modal_type_edit-profile');
editProfileModal.setEventListeners();

const addCardModal = new PopupWithForm('.modal_type_add-card');
addCardModal.setEventListeners();

const imageModalWindow = new PopupWithImage('.modal_type_image');
imageModalWindow.setEventListeners();
 
// Open Buttons 
const editProfileButton = document.querySelector('.profile__edit-button'); 
const addCardButton = document.querySelector('.profile__add-button'); 
 
// Submit Form Buttons 
const editProfileForm = editProfileModal.querySelector('.form_type_profile'); 
const addCardForm = addCardModal.querySelector('.form_type_card'); 
const modalFigure = imageModalWindow.querySelector('.modal__figure'); 
 
// Close Buttons 
const closeProfileButton = editProfileModal.querySelector('.form__close-button'); 
const closeAddCardFormButton = addCardModal.querySelector('.form__close-button'); 
const closeCardImageButton = modalFigure.querySelector('.form__close-button_type-image'); 
 
// Edit Profile Form Inputs 
const inputName = editProfileForm.querySelector('.form__input_type_name'); 
const inputAbout = editProfileForm.querySelector('.form__input_type_about'); 
 
const profileName = document.querySelector('.profile__text'); 
const profileAbout = document.querySelector('.profile__paragraph'); 
 
// Add Card Form Inputs 
const inputTitle = addCardForm.querySelector('.form__input_type_card-title'); 
const inputUrl = addCardForm.querySelector('.form__input_type_card-url'); 

///////////////////////////////////////////////////////////////////////////

// New Form Validators
const defaultConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
};

const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const addFormValidator = new FormValidator(defaultConfig, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
 
// Profile Submit Handler 
function profileSubmitHandler(e) { 
  e.preventDefault(); 
  profileName.textContent = inputName.value; 
  profileAbout.textContent = inputAbout.value; 
  toggleModal(editProfileModal); 
} 
 
// Modal Edit Profile Click Events 
editProfileButton.addEventListener('click', () => { 
 
  inputName.value = profileName.textContent; 
  inputAbout.value = profileAbout.textContent; 
 
  toggleModal(editProfileModal); 
}); 
 
closeProfileButton.addEventListener('click',() => { 
  toggleModal(editProfileModal); 
}); 
 
editProfileForm.addEventListener('submit', profileSubmitHandler); 
 
// Modal Image Click Events 
closeCardImageButton.addEventListener('click', () => { 
  toggleModal(imageModalWindow); 
}); 
 
// Cards List
const list = document.querySelector('.elements__list'); 
 
// Render Card
function renderCard(data) { 
  const card = new Card(data, '.card-template');
  const cardElement = card.createCard();
  list.prepend(cardElement);
} 
 
// // Initial Cards Data 
initialCards.forEach(cardsData => { 
  renderCard(cardsData); 
}); 
 
// Modal Add Card Click Events 
addCardButton.addEventListener('click', () => {  
  toggleModal(addCardModal);
  addCardForm.reset();
  inputTitle.classList.add('form__input_type_error'); 
  inputUrl.classList.add('form__input_type_error');
  const button = addCardForm.querySelector('.form__button_type_create');
  button.classList.add('form__button_disabled');
}); 
 
closeAddCardFormButton.addEventListener('click', () => { 
  toggleModal(addCardModal); 
}); 
 
// Add Card Submit Handler 
function addCardSubmitHandler(e) { 
  e.preventDefault(); 
  renderCard({name: inputTitle.value, link: inputUrl.value}); 
  inputTitle.value = inputTitle.textContent; 
  inputUrl.value = inputUrl.textContent; 
  toggleModal(addCardModal);
  addCardForm.reset();
} 
 
addCardForm.addEventListener('submit', addCardSubmitHandler); 