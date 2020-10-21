import {
  initialCards,
  defaultConfig,
  cardsList,
  editProfileModal,
  addCardModal,
  imageModalWindow,
  editProfileForm,
  addCardForm,
  modalFigure,
  editProfileButton,
  addCardButton,
  closeProfileButton,
  closeAddCardFormButton,
  closeCardImageButton,
  inputName,
  inputAbout,
  profileName,
  profileAbout,
  inputTitle,
  inputUrl
} from "../utils/constants.js";

import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


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
 
// Render Card
function renderCard(data) { 
  const card = new Card(data, '.card-template');
  const cardElement = card.createCard();
  cardsList.prepend(cardElement);
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