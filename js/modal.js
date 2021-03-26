const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successModal = successTemplate.cloneNode(true);
document.querySelector('main').append(successModal);
successModal.classList.add('hidden');

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorModal = errorTemplate.cloneNode(true);
document.querySelector('main').append(errorModal);
errorModal.classList.add('hidden');

const hideModal = (modal) => {
  modal.classList.add('hidden');

  modal.removeEventListener('click', () => {
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
  errorModal
}
