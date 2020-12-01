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


    const addCardPopup = new PopupWithForm({
      popupSelector: addCardModal,
      handleSubmit: (data) => {
        handleLoading(true, addCardModal, 'Saving...')
          api.addCard(data)
            .then((res) => {
              addNewCards(res);
              handleLoading(false, addCardModal, 'Save')
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


    function addNewCards(data) {
      const newCards = new Card({
        data,
        handleCardClick: () => {
          imagePopup.open(data);
        },
        handleDeleteClick: () => {
          
        },
        handleLikeClick: () => {

        },
      }, cardTemplateSelector, userIdInfo);
      cardsList.addItem(newCards.createCard())
    }

    })


    // ADD CARD POPUP
    // const addCardPopup = new PopupWithForm({
    //   popupSelector: addCardModal,
    //   handleSubmit: (data) => {
    //     handleLoading(true, addCardModal, 'Saving...')
    //       api.addCard(data)
    //         .then((res) => {
    //           renderCards(res);
    //           addCardPopup.close();
    //           renderCards.showLikes()
    //           addCardFormValidator.disableSubmitButton()
    //           renderCards.showDeleteButton()
    //         })
    //         .catch(err => console.log(err));
    //   }
    // });

    // addCardPopup.setEventListeners();

    // addCardButton.addEventListener('click', () => {
    //   addCardFormValidator.disableSubmitButton();
    //   addCardPopup.open();
    // })

    // function renderCards(data) {
    //   const newCards = new Card({
    //     data,
    //     handleCardClick: () => {
    //       imagePopup.open(data);
    //     },
    //     handleDeleteClick: (cardId) => {
    //       deleteCardPopup.open();
    //       deleteCardPopup.setSubmit(() => {
    //         handleLoading(true, deleteCardModal, "Deleting...")

    //         api.deleteCard(cardId)
    //           .then(() => {
    //             newCards.deleteCard();
    //             handleLoading(false, deleteCardModal, 'Yes')
    //             deleteCardPopup.close();
    //           })
    //           .catch(err => console.log(err));
    //       })
    //     },
    //     handleLikeClick: (cardId) => {
    //       if (newCards.likeIcon.classList.contains('card__like-button_active')) {
    //         api.removeLike(cardId)
    //           .then((res) => {
    //             newCards.getLikesCount(res.likes.length)
    //           })
    //             .then(() => {
    //               newCards.likeIcon.classList.remove('card__like-button_active')
    //             })
    //             .catch(err => console.log(err))
    //       } else {
    //         api.addLike(cardId)
    //           .then((res) => {
    //             newCards.getLikesCount(res.likes.length)
    //           })
    //           .then(() => {
    //             newCards.likeIcon.classList.add('.card__like-button_active')
    //           })
    //           .catch(err => console.log(err))
    //       }
    //     }
    //   }, cardTemplateSelector, userIdInfo)
    //   cardsList.addItem(newCards.createCard())
    // }

    
// const cardsList = new Section({
//     renderer: (data) =>  {
//       const card = new Card({data}, handleCardClick, handleDeleteClick, handleLikeClick, '.card-template'); 
//       const cardElement = card.createCard(data, userId)
//       cardsList.addItem(cardElement);
//     },
//   }, cardContainerSelector) 


// // Avatar Modal
// const editAvatarModal = new PopupWithForm('.modal_type_avatar', editAvatarSubmitHandler);

// function editAvatarSubmitHandler(data) {
//   api.setUserAvatar(data)
//     .then((res) => {
//       const avatarImage = document.querySelector('.profile__avatar');
//       avatarImage.src = res.avatar;
//       editAvatarModal.close();
//     })
//     .catch(err => console.log(err))
// }

// const editAvatarButton = document.querySelector('.profile__avatar-edit');
// editAvatarButton.addEventListener('click', () => {
//   editAvatarModal.open();
// })

// editAvatarModal.setEventListeners();


// // Card Handlers
// function handleCardClick() {
//   imageModal.open({name: this._name, link: this._link}); 
//     modalImageTitle.textContent = this._name;   
//     modalImage.src = this._link;   
//     modalImage.alt = this._name; 
// }

// function handleDeleteClick(cardId, card) {
//   deleteModal.open(cardId, card)
// }

// // Remder Cards List
// api.getCardList()
//   .then(userCards => {
//     const cardsList = new Section({
//       items: userCards,
//       renderer: (data) => {
//         const card = new Card({data}, handleCardClick, handleDeleteClick, handleLikeClick, '.card-template')
//         const cardElement = card.createCard(data, userId)
//         cardsList.addItem(cardElement)
//       }
//     }, cardContainerSelector)
//     cardsList.renderer()
//     console.log(userCards)
//   })
//   .catch(err => console.log(err));


// // Add Card Modal (Needs improvement on render card on page UI)
// const addCardModal = new PopupWithForm('.modal_type_add-card', addCardSubmitHandler);
  

// function addCardSubmitHandler(data) {
//   api.addCard(data)
//   .then((data) => {
//     const card = new Card({data}, handleCardClick, handleDeleteClick, handleLikeClick, '.card-template')
//     const cardElement = card.createCard(data, userId)
//     cardsList.addItem(cardElement)
//     addCardModal.close()
//   })
//   .catch(err => console.log(err))
// }

// const addCardButton = document.querySelector('.profile__add-button');
// addCardButton.addEventListener('click', () => {
//   addCardForm.reset();
//   addCardModal.open()
//   addFormValidator.disableSubmitButton();
// })

// addCardModal.setEventListeners();


// const deleteModal = new PopupWithForm('.modal_type_delete-card', (cardId, card) => {
//   api.deleteCard(cardId)
//     .then(() => {
//       card.remove();
//       deleteModal.close();
//     })
//     .catch(err => console.log(err))
// })

// deleteModal.setEventListeners();



// function handleLikeClick(cardId, like) {
//       if(like.classList.contains('card__like-button_active')) {
//         api.removeLike(cardId)
//           .then((res) => {
//             console.log('REMOVE', res)
//             like.classList.remove('card__like-button_active')
//           })
//       } else {
//         api.addLike(cardId, like)
//           .then((res) => {
//             console.log('ADD', res)
//             like.classList.add('card__like-button_active')
//           })
//           .catch(err => console.log(err))
//       }
//     console.log('LIKE', like)
//     console.log('CARDID', cardId)
// }