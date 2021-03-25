'use strict';

const AVATARS_QUANTITY = 8;
const CARDS_QUANTITY = 10;

const coords = {
  MIN_X: 35.65000,
  MAX_X: 35.70000,
  MIN_Y: 139.70000,
  MAX_Y: 139.80000,
  DIGITS: 5,
};

const titles = [
  'Лучшее место отдохнуть от всех',
  'Отличный выбор для двоих',
  'Уединенное место для романтического уикенда',
  'Места хватит даже для самой большой компании',
  'Шикарные апартаменты для знающих себе цену людей',
  'Рукой подать до всех главных достопримечательностей',
  'Самый выгодный выбор за минимальные деньги',
];

const price = {
  MIN: 0,
  MAX: 1000000,
};

const accommodationTypes = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const roomsQuantity = {
  MIN: 1,
  MAX: 10,
};

const guestsQuantity = {
  MIN: 1,
  MAX: 50,
};

const checkinTimes = [
  '12:00',
  '13:00',
  '14:00',
];

const checkoutTimes = [
  '12:00',
  '13:00',
  '14:00',
];

const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const descriptions = [
  'Комфортное и недорогое жилье в самом центре города. В пешей доступности находятся сразу несколько круглосуточных супермаркетов.',
  'Жилье находится на тихой улочке. Со всех сторон разбиты красивые сады.',
  'Жилье прямо у станции метро. Можно легко добраться до любого уголка города.',
  'Уютное жилье для спокойного отдыха, вдали от шумных кварталов города.',
  'Идеальный вариант для любителей шопинга: совсем рядом сразу несколько рынков и эксклюзивных бутиков.',
  'Отличный вариант для семейного отдыха, с возможностью готовить еду на полностью оборудованной кухне.',
  'Рядом находятся все самые популярные достопримечательности. Вам даже не придется тратить деньги на транспорт.',
  'Из окон открывается прекрасный вид на центральный бульвар с пышной растительностью',
];

const photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];


/**
 * Получение случайного числа из диапазона
 * @param {number} min — минимальное значение
 * @param {number} max — максимальное значение
 * @param {number} digitsAfterDecpoint — количество знаков после запятой
 * @return {number} — случайное число
 */

const getRandomNumberInRange = (min, max, digitsAfterDecpoint = 0) => {
  if (min < 0) {
    min = 0;
  }

  if (max < 0) {
    max = 0;
  }

  if (max < min) {
    max = min;
  }
  return Number((min + Math.random() * (max - min)).toFixed(digitsAfterDecpoint));
};


/**
 * Перемешивание элементов массива в случайном порядке
 * @param {array} array — исходный массив
 * @return {array} — итоговый массив
 */

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}


/**
 * Получение случайного элемента массива
 * @param {array} array — исходный массив
 * @return {string|number|object} — значение массива со случайным индексом
 */

const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};


/**
 * Получение случайного количества случайных элементов массива
 * @param {array} array — исходный массив
 * @return {array} — итоговый массив
 */

const getRandomQuantityArrayElements = (array) => {
  return shuffleArray(array).slice(0, getRandomNumberInRange(1, array.length));
}


/**
 * Получение случайного номера с добавлением незначащего нуля при необходимости
 * @param {number} quantity — максимально возможное число - верхняя граница номера
 * @return {number} — итоговое случайное число
 */

const getLeadingZeroRandomNumber = (quantity) => {
  const number = getRandomNumberInRange(1, quantity);
  const leadingZero = number < 10 ? '0' : '';
  return leadingZero + number;
};


/**
 * Заполнение объявления пользователя мок-данными
 * @return {object} — итоговый объект-объявление
 */

const renderCard = () => {
  const COORD_X = getRandomNumberInRange(coords.MIN_X, coords.MAX_X, coords.DIGITS);
  const COORD_Y = getRandomNumberInRange(coords.MIN_Y, coords.MAX_Y, coords.DIGITS);

  const card = {
    author: {
      avatar: 'img/avatars/user' + getLeadingZeroRandomNumber(AVATARS_QUANTITY) + '.png',
    },
    offer: {
      title: getRandomArrayElement(titles),
      address: COORD_X + ', ' + COORD_Y,
      price: getRandomNumberInRange(price.MIN, price.MAX),
      type: getRandomArrayElement(accommodationTypes),
      rooms: getRandomNumberInRange(roomsQuantity.MIN, roomsQuantity.MAX),
      guests: getRandomNumberInRange(guestsQuantity.MIN, guestsQuantity.MAX),
      checkin: checkinTimes[getRandomNumberInRange(0, checkinTimes.length - 1)],
      checkout: checkoutTimes[getRandomNumberInRange(0, checkoutTimes.length - 1)],
      features: getRandomQuantityArrayElements(features),
      description: getRandomArrayElement(descriptions),
      photos: getRandomQuantityArrayElements(photos),
    },
    location: {
      x: COORD_X,
      y: COORD_Y,
    },
  };

  return card;
};


/**
 * Создание массива из карточек-объявлений пользователя
 * @param {number} quantity — количество карточек-объявлений
 * @return {array} — итоговый массив из карточек
 */

const createCardsList = (quantity) => {
  let cardsList = [];
  for (let i = 0; i < quantity; i++) {
    cardsList.push(renderCard(quantity));
  }
  return cardsList;
}

createCardsList(CARDS_QUANTITY);
