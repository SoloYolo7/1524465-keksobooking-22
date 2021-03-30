import {
  accommodationTypes
} from './render-announcement.js';

import {
  AccommodationElement
} from './form.js';


const MAX_GENERAL_PRICE = 1000000;

const RoomCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
}

AccommodationElement.TITLE.addEventListener('change', (evt) => {
  let customValidity = '';
  const TitleValidityState = {
    tooShort: 'Слишком короткий заголовок. Длина должна быть минимум 30 символов',
    tooLong: 'Слишком длинный заголовок',
    valueMissing: 'Заголовок должен быть обязательно заполнен',
  };
  for (let state in TitleValidityState) {
    if (evt.target.validity[state]) {
      customValidity = TitleValidityState[state];
    }
  }
  AccommodationElement.TITLE.setCustomValidity(customValidity);
  AccommodationElement.TITLE.reportValidity();
});

AccommodationElement.PRICE.min = accommodationTypes[AccommodationElement.TYPE.value].minPrice;
AccommodationElement.PRICE.max = MAX_GENERAL_PRICE;

AccommodationElement.TYPE.addEventListener('change', (evt) => {
  AccommodationElement.PRICE.placeholder = accommodationTypes[evt.target.value].minPrice;
  AccommodationElement.PRICE.min = accommodationTypes[evt.target.value].minPrice;
});

AccommodationElement.PRICE.addEventListener('change', (evt) => {
  let customValidity = '';
  const PriceValidityState = {
    valueMissing: 'Введите цену',
    rangeUnderflow: `Цена за ${accommodationTypes[AccommodationElement.TYPE.value].declension} должна быть больше ${evt.target.min} рублей`,
    rangeOverflow: `Цена за жилье должна быть меньше ${MAX_GENERAL_PRICE} рублей`,
  };
  for (let state in PriceValidityState) {
    if (evt.target.validity[state]) {
      customValidity = PriceValidityState[state];
    }
  }
  AccommodationElement.PRICE.setCustomValidity(customValidity);
  AccommodationElement.PRICE.reportValidity();
});


AccommodationElement.CHECKIN.addEventListener('change', (evt) => {
  AccommodationElement.CHECKOUT.value = evt.target.value;
});

AccommodationElement.CHECKOUT.addEventListener('change', (evt) => {
  AccommodationElement.CHECKIN.value = evt.target.value;
});

const setRoomsCapacity = (rooms, guests) => {
  for (let guest of guests.children) {
    if (RoomCapacity[rooms.value].includes(guest.value)) {
      guest.disabled = false;
      guest.selected = true;
    } else {
      guest.disabled = true;
    }
  }
}

AccommodationElement.ROOM_NUMBER.addEventListener('change', () => {
  setRoomsCapacity(AccommodationElement.ROOM_NUMBER, AccommodationElement.CAPACITY);
});
