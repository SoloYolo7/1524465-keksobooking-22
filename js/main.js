'use strict'

const [FIRST_ELEMENT, LAST_ELEMENT] = [1, 8];
const [MIN_PRICE, MAX_PRICE] = [100, 10000];
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const [MIN_ROOMS, MAX_ROOMS] = [1, 8];
const [MIN_QUESTS, MAX_QUESTS] = [1, 20];
const TIME_EXAMPLES = ['12:00', '13:00', '14:00'];
const TOTAL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TOTAL_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const [X_MIN, X_MAX] = [35.65000, 35.70000];
const [Y_MIN, Y_MAX] = [139.70000, 139.80000];
const DIGIT_NUMBER = 5;

const AD_QUANTITY = 10;

// УТИЛИТАРНЫЕ ФУНКЦИИ
const swapPlaces = (min, max) => [min, max] = [max, min];

// Возвращаем целое число
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (min, max) => {
  if (min >= 0 && max >= 0 && min !== max) {
    if (max < min) {
      swapPlaces(min, max);
    }

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return null;
};

// Возвращаем число с плавающей точкой
const getRandomInclusive = (min, max, numberDigit) => {

  if (min >= 0 && max >= 0 && min !== max) {
    if (max < min) {
      swapPlaces(min, max);
    }

    return parseFloat((Math.random() * (max - min) + min).toFixed(numberDigit));
  }

  return null;
};

// СОЗДАЕМ МАССИВ ОБЪЯВЛЕНИЙ
const getRandomArrayElement = (items) => {
  return items[getRandomIntInclusive(0, items.length - 1)];
}

// Перетасовка массива
const shuffle = (items) => {

  for (let i = items.length - 1; i > 0; i--) {
    const j = getRandomIntInclusive(0, i);
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
};

// Массив случайной длинны с неповторяющимися элементами
const getArrayRandomLength = (items) => {
  return shuffle(items.slice()).slice(0, getRandomIntInclusive(1, items.length));
};

const createAd = () => {
  const [xCoordinate, yCoordinate] = [
    getRandomInclusive(X_MIN, X_MAX, DIGIT_NUMBER),
    getRandomInclusive(Y_MIN, Y_MAX, DIGIT_NUMBER),
  ];

  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomIntInclusive(FIRST_ELEMENT, LAST_ELEMENT) + '.png',
    },

    offer: {
      title: 'Милая, уютная квартирка в центре Токио',
      address: xCoordinate + ', ' + yCoordinate,
      price: getRandomIntInclusive(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomIntInclusive(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomIntInclusive(MIN_QUESTS, MAX_QUESTS),
      checkin: getRandomArrayElement(TIME_EXAMPLES),
      checkout: getRandomArrayElement(TIME_EXAMPLES),
      features: getArrayRandomLength(TOTAL_FEATURES),
      description: 'Небольшая уютная квартира',
      photos: getArrayRandomLength(TOTAL_PHOTOS),
    },

    location: {
      x: xCoordinate,
      y: yCoordinate,
    },
  }
};

const createAds = (quantity) => new Array(quantity).fill('').map(() => createAd());
createAds(AD_QUANTITY);
