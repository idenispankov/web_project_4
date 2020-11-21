import './index.css'; 
 
import FormValidator from '../components/FormValidator.js';  
import Card from '../components/Card.js';  
import Section from '../components/Section.js'; 
import UserInfo from '../components/UserInfo.js'; 
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm.js'; 
import Api from '../components/Api.js';
import { 
  defaultConfig, 
  cardContainerSelector, 
  // editProfileForm, 
  // addCardForm, 
  editProfileInputs, 
  modalImage, 
  modalImageTitle
  // avatarForm
} from '../utils/constants.js'; 

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-6",
  headers: {
    authorization: "7de1d63b-0ba0-4390-89a7-2fe6bdf9eada",
    "Content-Type": "application/json"
  }
});

// Consts need transfer to utils later
// MODALS AND FORMS
// const editProfileModal = document.querySelector('.modal_type_edit-profile');
const editProfileForm = document.querySelector('.form_type_profile');

// const editAvatarModal = document.querySelector('.modal_type_avatar');
const editAvatarForm = document.querySelector('.form_type_avatar');

const addCardModal = document.querySelector('.modal_type_add-card');
const addCardForm = document.querySelector('.form_type_card');

const deleteCardModal = document.querySelector('.modal_type_delete-card');
const deleteCardForm = document.querySelector('.form_type_card-delete');


// BUTTONS & DOMS
// const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
// const editAvatarButton = document.querySelector('.profile__avatar-edit');


const profileName = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__paragraph');
// const avatarImage = document.querySelector('.profile__avatar');

const profileFormInputName = document.querySelector('.form__input_type_name');
const profileFormInputAbout = document.querySelector('.form__input_type_about');

///////////////////////////////////////////////////////////////////////////////////////

// User Info 
let userId = null;

const userInfo = new UserInfo({
  nameSelector: '.profile__text',
  aboutSelector: '.profile__paragraph',
  avatarSelector: '.profile__avatar'
}); 

// Loading User Information from the Server
api.getUserInfo()
  .then((res) => {
    userId = res._id;
    userInfo.setUserInfo({name: res.name, about: res.about})
    userInfo.setUserAvatar(res.avatar)
  })
  .catch(err => console.log(err));


  // Profile Modal
  const editProfileModal = new PopupWithForm('.modal_type_edit-profile', editProfileSubmitHandler)

  function editProfileSubmitHandler(data) {
    api.setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo({name: res.name, about: res.about})
        editProfileModal.close();
      })
      .catch(err => console.log(err))
  }


  const editProfileButton = document.querySelector('.profile__edit-button'); 
  editProfileButton.addEventListener('click', () => { 
  const initialUserInfo = userInfo.getUserInfo(); 
 
  Object.keys(editProfileInputs).forEach((input) => { 
    editProfileInputs[input].value = initialUserInfo[input]; 
    editFormValidator.checkInputValidity(editProfileInputs[input]); 
  }); 
 
  editProfileModal.open(); 
}); 

editProfileModal.setEventListeners();


// Avatar Modal
const editAvatarModal = new PopupWithForm('.modal_type_avatar', editAvatarSubmitHandler);

function editAvatarSubmitHandler(data) {
  api.setUserAvatar(data)
    .then((res) => {
      const avatarImage = document.querySelector('.profile__avatar');
      avatarImage.src = res.avatar;
      editAvatarModal.close();
    })
    .catch(err => console.log(err))
}

const editAvatarButton = document.querySelector('.profile__avatar-edit');
editAvatarButton.addEventListener('click', () => {
  editAvatarModal.open();
})

editAvatarModal.setEventListeners();

// // Avatar Modal
// const editAvatarButton = document.querySelector('.profile__avatar-edit');
// editAvatarButton.addEventListener('click', () => {
//   avatarModal.open()
// })

// const avatarModal = new PopupWithForm('.modal_type_avatar', handleEditAvatar);

// function handleEditAvatar(data) {
//   api.setUserAvatar(data)
//     .then((res) => {
//       const avatarImage = document.querySelector('.profile__avatar');
//       avatarImage.src = res.avatar
//       avatarModal.close()
//     })
//     .catch(err => console.log(err))
// }
 
// editProfileModal.setEventListeners(); 
// avatarModal.setEventListeners();

// // Function Render Card
// function renderCard() {  
//   const cardsList = new Section({
//     renderer: () =>  {
//       const card = new Card({data}, handleCardClick, handleDeleteClick, handleLikeClick, '.card-template'); 
//       const cardElement = card.createCard(data, userId);
//       cardsList.addItem(cardElement);
//     },
//   }, cardContainerSelector) 
// }

// // Loading Cards from the Server
// api.getCardList()
//   .then(userCards => {
//     const cardsList = new Section({
//       items: userCards,
//       renderer: (data) =>  {
//         const card = new Card({data}, handleCardClick, handleDeleteClick, handleLikeClick, '.card-template'); 
//         const cardElement = card.createCard(card, userId);
//         cardsList.addItem(cardElement);
//       },
//     }, cardContainerSelector)  

//     cardsList.renderer();
//   })
//   .catch(err => console.log(err));

// function handleDeleteClick(cardId, card) {
//   deleteModal.open(cardId, card)
// }

// function handleLikeClick(cardId, card) {
//   // const cardId = e.target.data;
//   // const liked = e.target.classList.contains('card__like-button_active');

//   api.cardLikesCount(cardId, card)
//     .then((res) => {
//       console.log('card', res)
//       card.classList.toggle('card__like-button_active');
//     })
//     .catch(err => console.log(err))
// }

// const deleteModal = new PopupWithForm('.modal_type_delete-card', (cardId, card) => {
//   api.deleteCard(cardId)
//     .then(() => {
//       card.remove();
//       deleteModal.close();
//     })
//     .catch(err => console.log(err))
// })

// deleteModal.setEventListeners();

// function handleCardClick() { 
//   imageModal.open({name: this._name, link: this._link}); 
   
//     modalImageTitle.textContent = this._name;   
//     modalImage.src = this._link;   
//     modalImage.alt = this._name; 
// } 

// const addCardModal = new PopupWithForm('.modal_type_add-card', (data) => {
//   api.addCard(data)
//     .then((res) => {
//       renderCard(data);
//       addCardModal.close();
//     })
//     .catch(err => console.log(err))
// });

// const addCardButton = document.querySelector('.profile__add-button'); 
// addCardButton.addEventListener('click', () => {
//   addCardForm.reset();
//   addCardModal.open();
//   addFormValidator.disableSubmitButton();
// }); 
// addCardModal.close();

// addCardModal.setEventListeners();

// Image Modal 
const imageModal = new PopupWithImage('.modal_type_image'); 
imageModal.setEventListeners(); 

// Form Validation 
const editFormValidator = new FormValidator(defaultConfig, editProfileForm);  
const addFormValidator = new FormValidator(defaultConfig, addCardForm);  
const avatarFormValidator = new FormValidator(defaultConfig, editAvatarForm);
  
editFormValidator.enableValidation();  
addFormValidator.enableValidation();  
avatarFormValidator.enableValidation();