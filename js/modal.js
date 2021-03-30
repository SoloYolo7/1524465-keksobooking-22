const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorModal.querySelector('.error__button')
const errorLoadingModal = document.querySelector('#error-loading').content.querySelector('.error-loading').cloneNode(true);

successModal.classList.add('hidden');
errorModal.classList.add('hidden');
errorLoadingModal.classList.add('hidden');

document.querySelector('main').append(successModal);
document.querySelector('main').append(errorModal);
document.querySelector('main').append(errorLoadingModal);

const hideModal = (modal) => {
  modal.classList.add('hidden');

  modal.removeEventListener('click', () => {
    hideModal(modal);
  });

  errorButton.removeEventListener('click', () => {
    hideModal(modal);
  });

  window.removeEventListener('keydown', (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      hideModal(modal);
    }
  });
};

const showModal = (modal) => {
  modal.classList.remove('hidden');

  modal.addEventListener('click', () => {
    hideModal(modal);
  });

  errorButton.addEventListener('click', () => {
    hideModal(modal);
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      hideModal(modal);
    }
  });
};

export {
  hideModal,
  showModal,
  successModal,
  errorModal,
  errorLoadingModal
}
