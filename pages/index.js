const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.form__close-button');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');
const inputName = document.querySelector('.form__input_type_name');
const inputAbout = document.querySelector('.form__input_type_about');
const profileName = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__paragraph');


function toggleModal() {
  modal.classList.toggle('modal_is-open');
}

editButton.addEventListener('click', toggleModal);

closeButton.addEventListener('click', (e) => {
  e.preventDefault();
  toggleModal();

  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
});



form.addEventListener('submit', (e) => {
  e.preventDefault();
  toggleModal();

  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
});