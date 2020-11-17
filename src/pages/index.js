import './index.css';

import FormValidator from '../components/FormValidator.js'; 
import Card from '../components/Card.js'; 
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import {
  initialCards,
  defaultConfig,
  cardContainerSelector,
  editProfileForm,
  addCardForm,
  editProfileInputs,
  modalImage,
  modalImageTitle,
  avatarForm
} from '../utils/constants.js';

// Api
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-6",
  headers: {
    authorization: "7de1d63b-0ba0-4390-89a7-2fe6bdf9eada",
    "Content-Type": "application/json"
  }
});

let userId = null;

// 1. Loading User Information from the Server
const profileUserInfo = new UserInfo({nameSelector: '.profile__text', aboutSelector: '.profile__paragraph', avatarSelector: '.profile__avatar'})

api.getUserInfo()
  .then((res) => {
    profileUserInfo.setUserInfo({name: res.name, about: res.about})
    userId = res._id;
    console.log('userID - displayed as - ', userId)
  })

  // 2. Editing the Profile
const editProfileModal = new PopupWithForm('.modal_type_edit-profile', editProfileSubmitHandler)

function editProfileSubmitHandler(data) {
  api.setUserInfo(data)
    .then((res) => {
      profileUserInfo.setUserInfo({name: res.name, about: res.about})
    })
  editProfileModal.close()
}

// Initial User Info Open Edit Profile Form
const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', () => {
  const initialUserInfo = profileUserInfo.getUserInfo();

  Object.keys(editProfileInputs).forEach((input) => {
    editProfileInputs[input].value = initialUserInfo[input];
    editFormValidator.checkInputValidity(editProfileInputs[input]);
  });

  editProfileModal.open();
});

editProfileModal.setEventListeners();


// 3. Loading Cards from the Server
api.getCardList()
  .then(userCards => {
    const cardsList = new Section({
      items: userCards,
      renderer: (data) =>  {
        const card = new Card({data}, handleCardClick, handleDeleteClick, handleLikeClick, '.card-template'); 
        const cardElement = card.createCard(userId);
        cardsList.addItem(cardElement);
      },
    }, cardContainerSelector)  

    cardsList.renderer();
    console.log(userCards)
  })

  // Render Card Initial
function renderCard() {  
  const cardsList = new Section({
    renderer: (data) =>  {
      const card = new Card({data}, handleCardClick, handleDeleteClick, handleLikeClick, '.card-template'); 
      const cardElement = card.createCard(data, userId);
      cardsList.addItem(cardElement);
    },
  }, cardContainerSelector) 
}

// 4. Adding a New Card
const addCardModal = new PopupWithForm('.modal_type_add-card', addCardSubmitHandler);

const addCardButton = document.querySelector('.profile__add-button'); 

addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  addCardModal.open();
  addFormValidator.disableSubmitButton();
}); 

addCardModal.setEventListeners();


// CALLBACKS

// SUBMIT ADD CARD
function addCardSubmitHandler(data) {
  api.addCard(data)
    .then(res => {
    renderCard(res);
  })
  addCardModal.close();
}

// DELETE
function handleDeleteClick(cardId) {
  console.log('trash bit clicked!!!', cardId)
  deleteModalWindow.open(cardId);
}

const deleteModalWindow = new PopupWithForm('.modal_type_delete-card', handleSubmitDelete);

// HANDLE SUBMIT DELETE
function handleSubmitDelete(userId, cardId) {
  api.deleteCard(userId)
    .then((data) => {
      console.log('DATA is - ', data)
      cardId.removeCard();
    })
    deleteModalWindow.close();
  console.log('handleDeleteSubmit Called!!!')
}

// LIKE STATE
function handleLikeClick(e) {
  e.target.classList.toggle('card__like-button_active'); 
  // const cardId = e.target.data
  // const liked = e.target.data
  // api.addLike(cardId, liked)
  //   .then((res) => {
  //     console.log(res)
  //     e.target.classList.toggle('card__like-button_active'); 
  //     e.target.querySelector('.card__like-count').textContent = res.likes.length
  //   })
  console.log('HandleLikeClick')
}

deleteModalWindow.setEventListeners();

// Image Modal
const imageModal = new PopupWithImage('.modal_type_image');
imageModal.setEventListeners();

function handleCardClick() {
  imageModal.open({name: this._name, link: this._link});
  
    modalImageTitle.textContent = this._name;  
    modalImage.src = this._link;  
    modalImage.alt = this._name;
}

const editAvatarModal = new PopupWithForm('.modal_type_avatar', editAvatarSubmitHandler);

function editAvatarSubmitHandler(avatar) {
  const avatarImage = document.querySelector('.profile__avatar');
  const avatarInput = document.querySelector('.form__input_type_avatar');
  api.setUserAvatar(avatar)
    .then((data) => {
      avatarImage.src = avatarInput.src;
      console.log(avatarImage, avatarInput.textContent)
      console.log(data)
    })
  editAvatarModal.close()
}

const editAvatarButton = document.querySelector('.profile__avatar-edit');
editAvatarButton.addEventListener('click', () => {
  editAvatarModal.open();
})

editAvatarModal.setEventListeners();

// Form Validation
const editFormValidator = new FormValidator(defaultConfig, editProfileForm); 
const addFormValidator = new FormValidator(defaultConfig, addCardForm); 
const avatarFormValidator = new FormValidator(defaultConfig, avatarForm);
 
editFormValidator.enableValidation(); 
addFormValidator.enableValidation(); 
avatarFormValidator.enableValidation();