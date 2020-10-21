import {toggleModal} from './utils.js'; 
import FormValidator from './FormValidator.js'; 
import Card from './Card.js'; 
import {
  initialCards,
  defaultConfig,
  cardsList,
  editProfileModal,
  addCardModal,
  imageModalWindow,
  editProfileButton,
  addCardButton,
  editProfileForm,
  addCardForm,
  closeProfileButton,
  closeAddCardFormButton,
  closeCardImageButton,
  inputName,
  inputAbout,
  inputTitle,
  inputUrl
} from '../utils/constants.js'; 
 
/////////////////////////////////////////////////////////////////////////// 
 
// New Form Validators 
 
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