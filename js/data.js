import {
  getRandomNumberInRange,
  getRandomArrayElement,
  getRandomObjectValue,
  getRandomQuantityArrayElements
} from './util.js';


const CARDS_QUANTITY = 10;

const TITLES = [
  'Лучшее место отдохнуть от всех',
  'Отличный выбор для двоих',
  'Уединенное место для романтического уикенда',
  'Места хватит даже для самой большой компании',
  'Шикарные апартаменты для знающих себе цену людей',
  'Рукой подать до всех главных достопримечательностей',
  'Самый выгодный выбор за минимальные деньги',
];

const CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Комфортное и недорогое жилье в самом центре города. В пешей доступности находятся сразу несколько круглосуточных супермаркетов.',
  'Жилье находится на тихой улочке. Со всех сторон разбиты красивые сады.',
  'Жилье прямо у станции метро. Можно легко добраться до любого уголка города.',
  'Уютное жилье для спокойного отдыха, вдали от шумных кварталов города.',
  'Идеальный вариант для любителей шопинга: совсем рядом сразу несколько рынков и эксклюзивных бутиков.',
  'Отличный вариант для семейного отдыха, с возможностью готовить еду на полностью оборудованной кухне.',
  'Рядом находятся все самые популярные достопримечательности. Вам даже не придется тратить деньги на транспорт.',
  'Из окон открывается прекрасный вид на центральный бульвар с пышной растительностью',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const Coords = {
  MIN_X: 35.65000,
  MAX_X: 35.70000,
  MIN_Y: 139.70000,
  MAX_Y: 139.80000,
  DIGITS: 5,
};

const Prices = {
  MIN: 0,
  MAX: 1000000,
};

const AccommodationTypes = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец',
};

const AvatarsQuantity = {
  MIN: 1,
  MAX: 8,
};

const RoomsQuantity = {
  MIN: 1,
  MAX: 10,
};

const QuestsQuantity = {
  MIN: 1,
  MAX: 50,
};


/**
 * Заполнение объявления пользователя мок-данными
 * @return {object} — итоговый объект-объявление
 */
const createCard = () => {
  const COORD_X = getRandomNumberInRange(Coords.MIN_X, Coords.MAX_X, Coords.DIGITS);
  const COORD_Y = getRandomNumberInRange(Coords.MIN_Y, Coords.MAX_Y, Coords.DIGITS);

  const card = {
    author: {
      avatar: `img/avatars/user0${getRandomNumberInRange(AvatarsQuantity.MIN, AvatarsQuantity.MAX)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${COORD_X}, ${COORD_Y}`,
      price: getRandomNumberInRange(Prices.MIN, Prices.MAX),
      type: getRandomObjectValue(AccommodationTypes),
      rooms: getRandomNumberInRange(RoomsQuantity.MIN, RoomsQuantity.MAX),
      guests: getRandomNumberInRange(QuestsQuantity.MIN, QuestsQuantity.MAX),
      checkin: getRandomArrayElement(CHECK_TIMES),
      checkout: getRandomArrayElement(CHECK_TIMES),
      features: getRandomQuantityArrayElements(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomQuantityArrayElements(PHOTOS),
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
    cardsList.push(createCard());
  }
  return cardsList;
}


export {
  CARDS_QUANTITY,
  createCardsList
};
