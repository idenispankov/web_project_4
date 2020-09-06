// Modal Windows
const editProfileModal = document.querySelector('.modal_type_edit-profile');

// Modal Profile Buttons
const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = editProfileModal.querySelector('.form__close-button');

// Modal Profile Form
const profileForm = editProfileModal.querySelector('.form');

// Modal Profile Inputs
const inputName = document.querySelector('.form__input_type_name');
const inputAbout = document.querySelector('.form__input_type_about');

const profileName = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__paragraph');

// Toggle Function
function toggleModal(modal) {
  modal.classList.toggle('modal_is-open');

  if (modal.classList.contains('modal_is-open')) {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  }
};

// Profile Submit Handler
function profileSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  toggleModal(editProfileModal);
};

// Modal Profile Click Events
editProfileButton.addEventListener('click', () => {
  toggleModal(editProfileModal);
});

closeProfileButton.addEventListener('click',() => {
  toggleModal(editProfileModal);
})

profileForm.addEventListener('submit', profileSubmitHandler);

//  //////////////////////////////////////////////////////////////////////////////////////////////

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

const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
const list = document.querySelector('.elements__list');