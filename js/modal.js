const pageMain = document.querySelector('main');
const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorModal.querySelector('.error__button')
const loadingErrorModal = document.querySelector('#error-loading').content.querySelector('.error-loading').cloneNode(true);

successModal.classList.add('hidden');
errorModal.classList.add('hidden');
loadingErrorModal.classList.add('hidden');

pageMain.append(successModal);
pageMain.append(errorModal);
pageMain.append(loadingErrorModal);

const isEscPress = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const isMouseClick = (evt) => {
  return evt.type === 'click';
};


/* const showModal = (popup, button) => {
  const hideModal = (evt) => {
    evt.preventDefault();
    if (isEscPress(evt) || isMouseClick(evt)) {
      popup.classList.add('hidden');
      if (button) {
        button.removeEventListener('click', hideModal)
      }
      popup.removeEventListener('click', hideModal);
      window.removeEventListener('keydown', hideModal);
    }
  };
  popup.classList.remove('hidden');
  popup.addEventListener('click', hideModal);
  window.addEventListener('keydown', hideModal);
};

const showSuccessModal = showModal(successModal);
const showErrorModal = showModal(errorModal, errorButton);
const showErrorLoadingModal = showModal(errorLoadingModal); */


const showSuccessModal = () => {
  successModal.classList.remove('hidden');
  successModal.addEventListener('click', hideSuccessModalHandler);
  window.addEventListener('keydown', hideSuccessModalHandler);
};

const hideSuccessModalHandler = (evt) => {
  evt.preventDefault();
  if (isEscPress(evt) || isMouseClick(evt)) {
    successModal.classList.add('hidden');
    successModal.removeEventListener('click', hideSuccessModalHandler);
    window.removeEventListener('keydown', hideSuccessModalHandler);
  }
};

const showErrorModal = () => {
  errorModal.classList.remove('hidden');
  errorButton.addEventListener('click', hideErrorModalHandler);
  errorModal.addEventListener('click', hideErrorModalHandler);
  window.addEventListener('keydown', hideErrorModalHandler);
};

const hideErrorModalHandler = (evt) => {
  evt.preventDefault();
  if (isEscPress(evt) || isMouseClick(evt)) {
    errorModal.classList.add('hidden');
    errorButton.removeEventListener('click', hideErrorModalHandler);
    errorModal.removeEventListener('click', hideErrorModalHandler);
    window.removeEventListener('keydown', hideErrorModalHandler);
  }
};

const showLoadingErrorModal = () => {
  loadingErrorModal.classList.remove('hidden');
  loadingErrorModal.addEventListener('click', hideLoadingErrorModalHandler);
  window.addEventListener('keydown', hideLoadingErrorModalHandler);
}

const hideLoadingErrorModalHandler = (evt) => {
  evt.preventDefault();
  if (isEscPress(evt) || isMouseClick(evt)) {
    loadingErrorModal.classList.add('hidden');
    loadingErrorModal.removeEventListener('click', hideLoadingErrorModalHandler);
    window.removeEventListener('keydown', hideLoadingErrorModalHandler);
  }
};


export {
  showSuccessModal,
  showErrorModal,
  showLoadingErrorModal
}
