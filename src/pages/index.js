import './index.css'; 
 
import FormValidator from '../components/FormValidator.js';  
import Card from '../components/Card.js';  
import Section from '../components/Section.js'; 
import UserInfo from '../components/UserInfo.js'; 
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm.js'; 
import Api from '../components/Api.js';


const defaultConfig = {  
  formSelector: ".form",  
  inputSelector: ".form__input",  
  submitButtonSelector: ".form__button",  
  inactiveButtonClass: "form__button_disabled",  
  inputErrorClass: "form__input_type_error",  
  errorClass: "form__error_visible"  
};

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-6",
  headers: {
    authorization: "7de1d63b-0ba0-4390-89a7-2fe6bdf9eada",
    "Content-Type": "application/json"
  }
});

// MODALS
const editProfileModal = document.querySelector('.modal_type_edit-profile');
const addCardModal = document.querySelector('.modal_type_add-card');
const editAvatarModal = document.querySelector('.modal_type_avatar');
const deleteCardModal = document.querySelector('.modal_type_delete-card');
const imageModal = document.querySelector('.modal_type_image');

// FORMS
const editProfileForm = editProfileModal.querySelector('.form');
const addCardForm = addCardModal.querySelector('.form');
const editAvatarForm = editAvatarModal.querySelector('.form');

// VALIDATORS
const editFormValidator = new FormValidator(defaultConfig, editProfileForm);  
const addCardFormValidator = new FormValidator(defaultConfig, addCardForm);  
const editAvatarFormValidator = new FormValidator(defaultConfig, editAvatarForm);
  
editFormValidator.enableValidation();  
addCardFormValidator.enableValidation();  
editAvatarFormValidator.enableValidation();

// BUTTONS and DOM
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__avatar-edit');

const profileName = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__paragraph');

const profileInputName = document.querySelector('.form__input_type_name');
const profileInputAbout = document.querySelector('.form__input_type_about');
const profileAvatar = document.querySelector('.profile__avatar');

const cardTemplateSelector = '.card-template';
const cardGrid = document.querySelector('.elements__list');


//  HANDLE LOADING FROM SERVER
function handleLoading(isLoading, modal, textInput) {
  if(isLoading) {
    modal.querySelector('.form__button').textContent = textInput;
  } else {
    modal.querySelector('.form__button').textContent = textInput;
  }
}

// USER INFO
const userInfo = new UserInfo(profileName, profileAbout, profileAvatar);

  // Image Modal 
const imagePopup = new PopupWithImage(imageModal); 
imagePopup.setEventListeners();


// EDIT PROFILE POPUP
const editProfilePopup = new PopupWithForm({
  popupSelector: editProfileModal,
  handleSubmit: (data) => {
    handleLoading(true, editProfileModal, 'Saving...')
      api.setUserInfo({
        name: data.nameInput,
        about: data.aboutInput,
        avatar: profileAvatar.src
      })
        .then(() => {
          userInfo.setUserInfo(profileInputName.value, profileInputAbout.value, profileAvatar.src)
          handleLoading(false, editProfileModal, 'Save')
          editProfilePopup.close();
        })
        .catch(err => console.log(err))
  }
})

editProfileButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileInputName.value = currentUserInfo.name;
  profileInputAbout.value = currentUserInfo.about;
  editProfilePopup.open();
})

editProfilePopup.setEventListeners();


// EDIT AVATAR POPUP
const editAvatarPopup = new PopupWithForm({
  popupSelector: editAvatarModal,
  handleSubmit: (data) => {
    handleLoading(true, editAvatarModal, 'Saving...')
      api.setUserAvatar({
        avatar: data.avatar
      })
        .then((res) => {
          profileAvatar.src = res.avatar;
          handleLoading(false, editAvatarModal, 'Save');
          editAvatarPopup.close();
        })
  }
})

editAvatarButton.addEventListener('click', () => {
  editAvatarPopup.open()
  editAvatarFormValidator.disableSubmitButton();
})

editAvatarPopup.setEventListeners();

const deleteCardPopup = new PopupWithForm({
  popupSelector: deleteCardModal
});

deleteCardPopup.setEventListeners();

///////////////////////////////////////////////////////////////////////////////////////////

// APP INFO, ADDING, REMOVING CARDS
api.getAppInfo()
  .then(([userData, cardListData]) => {
    const userIdInfo = userData._id;
    userInfo.setUserInfo(userData.name, userData.about)
    profileAvatar.src = userData.avatar;

    const cardsList = new Section({
      data: cardListData,
      renderer: addNewCards
    }, cardGrid)

    cardsList.renderItems();

// ADDING A CARD
    const addCardPopup = new PopupWithForm({
      popupSelector: addCardModal,
      handleSubmit: (data) => {
        handleLoading(true, addCardModal, 'Saving...')
          api.addCard(data)
            .then((res) => {
              addNewCards(res);
              handleLoading(false, addCardModal, 'Create')
              addCardPopup.close()
              addCardFormValidator.disableSubmitButton();
            })
            .catch(err => console.log(err))
      }
    })

    addCardButton.addEventListener('click', () => {
      addCardFormValidator.disableSubmitButton();
      addCardPopup.open();
    });

    addCardPopup.setEventListeners();

    ////////////////////////////////////////////// ADDING CARD DONE /////////////////////////////////

    function addNewCards(data) {
      const newCards = new Card({
        data,
        handleCardClick: () => {
          imagePopup.open(data);
        },
        handleDeleteClick: (cardId) => {
          deleteCardPopup.open();
          deleteCardPopup.setSubmit(() => {
            handleLoading(true, deleteCardModal, 'Saving');
              api.removeCard(cardId)
                .then(() => {
                  newCards.deleteCard();
                  deleteCardPopup.close();
                  handleLoading(false, deleteCardModal, 'Yes')
                })
                .catch(err => console.log(err));
          })
        },
        handleLikeClick: (cardId) => {
          if(newCards.likeIcon.classList.contains('card__like-button_active')) {
            api.removeLike(cardId)
              .then((res) => {
                newCards.getLikesCount(res.likes.length)
              })
              .then(() => {
                newCards.likeIcon.classList.remove('card__like-button_active')
              })
              .catch(err => console.log(err))
          } else {
            api.addLike(cardId)
              .then((res) => {
                newCards.getLikesCount(res.likes.length)
              })
              .then(() => {
                newCards.likeIcon.classList.add('card__like-button_active')
              })
              .catch(err => console.log(err))
          }
        },
      }, cardTemplateSelector, userIdInfo);
      cardsList.addItem(newCards.createCard())
    }

    })
    .catch(err => console.log(err));