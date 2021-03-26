import {
  sendData
} from './create-fetch.js';

import {
  showModal,
  successModal,
  errorModal
} from './modal.js';


const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelectorAll('.map__filter');
const features = document.querySelector('.map__features');
const adFormElement = adForm.querySelectorAll('.ad-form__element');

const Accommodation = {
  TITLE: adForm.querySelector('#title'),
  ADDRESS: adForm.querySelector('#address'),
  TYPE: adForm.querySelector('#type'),
  PRICE: adForm.querySelector('#price'),
  CHECKIN: adForm.querySelector('#timein'),
  CHECKOUT: adForm.querySelector('#timeout'),
  ROOM_NUMBER: adForm.querySelector('#room_number'),
  CAPACITY: adForm.querySelector('#capacity'),
};

const MinPrices = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const AccommodationDeclension = {
  bungalow: 'бунгало',
  flat: 'квартиру',
  house: 'дом',
  palace: 'дворец',
};

const MAX_GENERAL_PRICE = 1000000;

const setFilterInactive = () => {
  mapFilter.forEach((filterElement) => {
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
  mapFilter.forEach((filterElement) => {
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

const charCounter = document.querySelector('.char-counter');

Accommodation.TITLE.addEventListener('input', (evt) => {
  charCounter.textContent = `( ${evt.target.value.length} / 100 символов )`;
});

Accommodation.TITLE.addEventListener('invalid', (evt) => {
  if (evt.target.validity.tooShort) {
    evt.target.setCustomValidity('Слишком короткий заголовок. Длина должна быть минимум 30 символов');
  } else if (evt.target.validity.tooLong) {
    evt.target.setCustomValidity('Слишком длинный заголовок');
  } else if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity('Заголовок должен быть обязательно заполнен');
  } else {
    evt.target.setCustomValidity('');
  }
});

Accommodation.PRICE.min = MinPrices[Accommodation.TYPE.value];
Accommodation.PRICE.max = MAX_GENERAL_PRICE;

Accommodation.TYPE.addEventListener('change', (evt) => {
  Accommodation.PRICE.placeholder = MinPrices[evt.target.value];
  Accommodation.PRICE.min = MinPrices[evt.target.value];
});

Accommodation.PRICE.addEventListener('invalid', (evt) => {
  if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity('Введите цену');
  } else if (evt.target.validity.rangeUnderflow) {
    evt.target.setCustomValidity(`Цена за ${AccommodationDeclension[Accommodation.TYPE.value]} должна быть больше ${evt.target.min} рублей`);
  } else if (evt.target.validity.rangeOverflow) {
    evt.target.setCustomValidity(`Цена за жилье должна быть меньше ${MAX_GENERAL_PRICE} рублей`);
  } else {
    evt.target.setCustomValidity('');
  }
});

Accommodation.CHECKIN.addEventListener('change', (evt) => {
  Accommodation.CHECKOUT.value = evt.target.value;
});

Accommodation.CHECKOUT.addEventListener('change', (evt) => {
  Accommodation.CHECKIN.value = evt.target.value;
});


Accommodation.ROOM_NUMBER.addEventListener('change', (evt) => {
  switch (evt.target.value) {
    case '1':
      Accommodation.CAPACITY.options[0].disabled = true;
      Accommodation.CAPACITY.options[1].disabled = true;
      Accommodation.CAPACITY.options[2].disabled = false;
      Accommodation.CAPACITY.options[3].disabled = true;
      Accommodation.CAPACITY.options[2].selected = true;
      break;
    case '2':
      Accommodation.CAPACITY.options[0].disabled = true;
      Accommodation.CAPACITY.options[1].disabled = false;
      Accommodation.CAPACITY.options[2].disabled = false;
      Accommodation.CAPACITY.options[3].disabled = true;
      Accommodation.CAPACITY.options[1].selected = true;
      break;
    case '3':
      Accommodation.CAPACITY.options[0].disabled = false;
      Accommodation.CAPACITY.options[1].disabled = false;
      Accommodation.CAPACITY.options[2].disabled = false;
      Accommodation.CAPACITY.options[3].disabled = true;
      Accommodation.CAPACITY.options[0].selected = true;
      break;
    case '100':
      Accommodation.CAPACITY.options[0].disabled = true;
      Accommodation.CAPACITY.options[1].disabled = true;
      Accommodation.CAPACITY.options[2].disabled = true;
      Accommodation.CAPACITY.options[3].disabled = false;
      Accommodation.CAPACITY.options[3].selected = true;
      break;
    default:
      Accommodation.CAPACITY.options[0].disabled = false;
      Accommodation.CAPACITY.options[1].disabled = false;
      Accommodation.CAPACITY.options[2].disabled = false;
      Accommodation.CAPACITY.options[3].disabled = false;
  }
});


const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        showModal(successModal);
        adForm.reset();
      },
      () => showModal(errorModal),
      new FormData(evt.target),
    );
  });
};


setFilterInactive();
setFormInactive();

setUserFormSubmit();

export {
  Accommodation,
  setFilterActive,
  setFormActive
}
