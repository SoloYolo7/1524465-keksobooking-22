import {
  sendData
} from './create-fetch.js';

import {
  showModal,
  successModal,
  errorModal
} from './modal.js';

import {
  mainPinAddress
} from './map.js';

const adForm = document.querySelector('.ad-form');
const mapFilterElements = document.querySelectorAll('.map__filter');
const features = document.querySelector('.map__features');
const adFormElement = adForm.querySelectorAll('.ad-form__element');

const AccommodationElement = {
  TITLE: adForm.querySelector('#title'),              // Заголовок объявления
  ADDRESS: adForm.querySelector('#address'),          // Адрес (координаты)
  TYPE: adForm.querySelector('#type'),                // Тип жилья
  PRICE: adForm.querySelector('#price'),              // Цена за ночь, руб.
  CHECKIN: adForm.querySelector('#timein'),           // Время заезда
  CHECKOUT: adForm.querySelector('#timeout'),         // Время выезда
  ROOM_NUMBER: adForm.querySelector('#room_number'),  // Количество комнат
  CAPACITY: adForm.querySelector('#capacity'),        // Количество мест
};

const setFilterInactive = () => {
  mapFilterElements.forEach((filterElement) => {
    filterElement.disabled = true;
  });
  features.disabled = true;
};

const setFormInactive = () => {
  adFormElement.forEach((formElement) => {
    formElement.disabled = true;
  });
  adForm.querySelector('.ad-form-header').disabled = true;
  adForm.classList.add('ad-form--disabled');
};

const setFilterActive = () => {
  mapFilterElements.forEach((filterElement) => {
    filterElement.disabled = false;
  });
  features.disabled = false;
};

const setFormActive = () => {
  adFormElement.forEach((formElement) => {
    formElement.disabled = false;
  });
  adForm.querySelector('.ad-form-header').disabled = false;
  adForm.classList.remove('ad-form--disabled');
};

const setFormDefault = () => {
  adForm.reset();
  AccommodationElement.ADDRESS.value = mainPinAddress;
};


setFilterInactive();
setFormInactive();

/* ------ */


/*  Обработка событий при отправке формы создания пользовательского объявления  */

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => {
      showModal(successModal);
      setFormDefault();
    },
    () => showModal(errorModal),
    new FormData(evt.target),
  );
});

/* ------ */


export {
  adForm,
  AccommodationElement,
  setFilterActive,
  setFormActive
}
