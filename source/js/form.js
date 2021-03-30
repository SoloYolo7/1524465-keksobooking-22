import {
  accommodationTypes
} from './render-announcement.js';

import {
  sendData
} from './create-fetch.js';

import {
  showSuccessModal,
  showErrorModal
} from './modal.js';

import {
  renderPins,
  ANNOUNCEMENT_LIMIT,
  removePins,
  resetMap
} from './map.js';

import {
  clearAvatars
} from './avatar.js';


const adForm = document.querySelector('.ad-form');
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

const mapFilterElements = document.querySelectorAll('.map__filter');
const features = document.querySelector('.map__features');
const adFormElement = adForm.querySelectorAll('.ad-form__element');
const formReset = adForm.querySelector('.ad-form__reset');
const mapFiltersForm = document.querySelector('.map__filters');

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

const setPriceDefaultPlaceholder = () => {
  AccommodationElement.PRICE.placeholder = accommodationTypes[AccommodationElement.TYPE.options[AccommodationElement.TYPE.selectedIndex].value].minPrice
}

const resetFilters = () => {
  mapFiltersForm.reset();
};

const resetForm = () => {
  adForm.reset();
};

const setFormDefault = () => {
  resetForm();
  setPriceDefaultPlaceholder();
  clearAvatars();
  resetFilters();
  resetMap();
};

const setFormSubmitHandler = (announcements) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => {
        showSuccessModal();
        setFormDefault();
        removePins();
        renderPins(announcements.slice(0, ANNOUNCEMENT_LIMIT));
      },
      () => showErrorModal(),
      new FormData(evt.target),
    );
  });
};

const setFormResetHandler = (announcements) => {
  formReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    setFormDefault();
    removePins();
    renderPins(announcements.slice(0, ANNOUNCEMENT_LIMIT));
  });
};

setFilterInactive();
setFormInactive();


export {
  adForm,
  AccommodationElement,
  setFilterActive,
  setFormActive,
  setFormSubmitHandler,
  setFormResetHandler
}
