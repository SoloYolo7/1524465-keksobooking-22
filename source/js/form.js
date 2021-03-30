import {sendData} from './api.js'
import {openMessageSuccess, openMessageError} from './util.js'
import {mainMarker, VALUELAT, VALUELNG, ZOOMMAP, map} from './map.js'

const form = document.querySelector('.ad-form');
const typeLodging = form.querySelector('#type');
const price = form.querySelector('#price');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const title = form.querySelector('#title');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const formButtonReset = form.querySelector('.ad-form__reset');
const capacityValueOne = capacity.querySelector('#capacity option[value="1"]');
const capacityValueTwo = capacity.querySelector('#capacity option[value="2"]');
const capacityValueThree = capacity.querySelector('#capacity option[value="3"]');
const capacityValueZero = capacity.querySelector('#capacity option[value="0"]');
const roomValueOne = rooms.querySelector('#room_number option[value="1"]');
const roomValueTwo = rooms.querySelector('#room_number option[value="2"]');
const roomValueThree = rooms.querySelector('#room_number option[value="3"]');
const roomValueHundred = rooms.querySelector('#room_number option[value="100"]');

//Изменяем минимальное значение в price в зависимости выбора typeLodging
typeLodging.addEventListener('change', () => {
  price.value = '';
  switch (typeLodging.value) {
    case 'bungalow' :
      price.placeholder = 0;
      price.min = 0; break
    case 'flat' :
      price.placeholder = 1000;
      price.min = 1000; break
    case 'house' :
      price.placeholder = 5000;
      price.min = 5000; break
    case 'palace' :
      price.placeholder = 10000;
      price.min = 10000; break
  }
});

//Правила валидации для price
price.addEventListener('input', () => {
  if (price.value < price.min) {
    price.setCustomValidity(`Минимальная цена не может быть ниже ${price.min}!`);
  } else if (price.value >= price.min) {
    price.setCustomValidity('');
  }

  price.reportValidity();
})

//Изменяем значение в timeout в зависимости выбора timein и наоборот
timein.addEventListener('change', () => {
  switch (timein.value) {
    case '12:00' :
      timeout.value = timein.value; break
    case '13:00' :
      timeout.value = timein.value; break
    case '14:00' :
      timeout.value = timein.value; break
  }
});

timeout.addEventListener('change', () => {
  switch (timeout.value) {
    case '12:00' :
      timein.value = timeout.value; break
    case '13:00' :
      timein.value = timeout.value; break
    case '14:00' :
      timein.value = timeout.value; break
  }
});

//Правила для title
title.addEventListener('input', () => {
  const valueLength = title.value.length;
  const minValue = title.minLength;
  const maxValue = title.maxLength;

  if (valueLength < minValue) {
    title.setCustomValidity('еще ' + (minValue - valueLength) + ' символов');
  } else if (valueLength > maxValue) {
    title.setCustomValidity('Удалите лишние ' + (valueLength - maxValue) + 'символы');
  } else {
    title.setCustomValidity('');
  }

  title.reportValidity();
});

//Поле rooms синхронизировано с полем capacity
rooms.addEventListener('change', () => {
  switch (rooms.value) {
    case '1' :
      capacity.value = '1';
      capacityValueOne.removeAttribute('disabled');
      capacityValueTwo.setAttribute('disabled','disabled');
      capacityValueThree.setAttribute('disabled','disabled');
      capacityValueZero.setAttribute('disabled','disabled'); break
    case '2' :
      capacityValueOne.removeAttribute('disabled');
      capacityValueTwo.removeAttribute('disabled');
      capacityValueThree.setAttribute('disabled','disabled');
      capacityValueZero.setAttribute('disabled','disabled'); break
    case '3' :
      capacityValueOne.removeAttribute('disabled');
      capacityValueTwo.removeAttribute('disabled');
      capacityValueThree.removeAttribute('disabled');
      capacityValueZero.setAttribute('disabled','disabled'); break
    case '100' :
      capacity.value = '0';
      capacityValueZero.removeAttribute('disabled');
      capacityValueThree.setAttribute('disabled','disabled');
      capacityValueTwo.setAttribute('disabled','disabled');
      capacityValueOne.setAttribute('disabled','disabled'); break
  }
});

capacity.addEventListener('change', () => {
  switch (capacity.value) {
    case '1' :
      roomValueOne.removeAttribute('disabled');
      roomValueTwo.removeAttribute('disabled');
      roomValueThree.removeAttribute('disabled');
      roomValueHundred.setAttribute('disabled','disabled'); break
    case '2' :
      roomValueTwo.removeAttribute('disabled');
      roomValueThree.removeAttribute('disabled');
      roomValueOne.setAttribute('disabled','disabled');
      roomValueHundred.setAttribute('disabled','disabled'); break
    case '3' :
      roomValueThree.removeAttribute('disabled');
      roomValueOne.setAttribute('disabled','disabled');
      roomValueTwo.setAttribute('disabled','disabled');
      roomValueHundred.setAttribute('disabled','disabled'); break
    case '0' :
      rooms.value = '100';
      roomValueHundred.removeAttribute('disabled');
      roomValueThree.setAttribute('disabled','disabled');
      roomValueTwo.setAttribute('disabled','disabled');
      roomValueOne.setAttribute('disabled','disabled'); break
  }
});

//Сброс карты и метки
const mapReset = () => {
  mainMarker.setLatLng([VALUELAT, VALUELNG]);
  map.setView({
    lat: VALUELAT,
    lng: VALUELNG,
  }, ZOOMMAP)
}

//Сброс формы
const formReset = () => {
  form.reset();
  mainMarker.setLatLng([VALUELAT, VALUELNG]);
  mapReset();
}

//Сброс данных по кнопке 'очистить'
formButtonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  formReset();
  mapReset();
})

//Отправка данных
form.onsubmit = (evt) => {
  evt.preventDefault();
  sendData(
    () => {
      openMessageSuccess();
      formReset()
    }, () => {
      openMessageError();
    }, new FormData(evt.target));
}
