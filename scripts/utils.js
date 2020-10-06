// Toggle Modal Function 
function toggleModal(modal) { 
  if(!modal.classList.contains('modal_is-open')) { 
    modal.addEventListener('click', closeModalOutside); 
    window.addEventListener('keydown', escCloseModal); 
  } else { 
    modal.removeEventListener('click', closeModalOutside); 
    window.removeEventListener('keydown', escCloseModal); 
  } 
  modal.classList.toggle('modal_is-open'); 
} 

// Function To Close Modals On Click Outside of Forms 
function closeModalOutside(e) { 
  toggleModal(e.target);
} 
 
// Function To Close Modals on Esc 
function escCloseModal(e) { 
  if (e.key === 'Escape') { 
    const modalIsOpen = document.querySelector('.modal_is-open'); 
    toggleModal(modalIsOpen); 
  } 
}

export {toggleModal};