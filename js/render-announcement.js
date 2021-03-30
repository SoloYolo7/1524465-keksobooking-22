import {
  getNumeralDeclension
} from './util.js';


const ROOMS_DECLENSION = [
  'комната',
  'комнаты',
  'комнат',
];

const GUESTS_DECLENSION = [
  'гостя',
  'гостей',
  'гостей',
];

const PhotoPreviewSize = {
  WIDTH: 45,
  HEIGHT: 40,
};

const AvatarSize = {
  WIDTH: 70,
  HEIGHT: 70,
};

const accommodationTypes = {
  bungalow: {
    title: 'Бунгало',
    minPrice: 0,
    declension: 'бунгало',
  },
  flat: {
    title: 'Квартира',
    minPrice: 1000,
    declension: 'квартиру',
  },
  house: {
    title: 'Дом',
    minPrice: 5000,
    declension: 'дом',
  },
  palace: {
    title: 'Дворец',
    minPrice: 10000,
    declension: 'дворец',
  },
};

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

/**
 * Генерация объявления с генерированными мок-данными
 * @param {array} popup — элемент сгенерированного массива с мок-данными
 * @return {object} — итоговое объявление (DOM-объект) с мок-данными
 */
const renderAnnouncement = ({author, offer}) => {
  const popupElement = popupTemplate.cloneNode(true);
  const House = {
    AVATAR: popupElement.querySelector('.popup__avatar'),
    TITLE: popupElement.querySelector('.popup__title'),
    ADDRESS: popupElement.querySelector('.popup__text--address'),
    PRICE: popupElement.querySelector('.popup__text--price'),
    TYPE: popupElement.querySelector('.popup__type'),
    CAPACITY: popupElement.querySelector('.popup__text--capacity'),
    TIME: popupElement.querySelector('.popup__text--time'),
    FEATURES: popupElement.querySelector('.popup__features'),
    DESCRIPTION: popupElement.querySelector('.popup__description'),
    PHOTOS: popupElement.querySelector('.popup__photos'),
  };

  const renderFeaturesList = (features) => {
    House.FEATURES.textContent = '';
    features.forEach((feature) => {
      let featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
      House.FEATURES.append(featureElement);
    });
  };

  const renderPhotosList = (photos) => {
    House.PHOTOS.textContent = '';
    let photoTemplate = document.createElement('img');
    photoTemplate.classList.add('popup__photo');
    photoTemplate.style.width = `${PhotoPreviewSize.WIDTH}px`;
    photoTemplate.style.height = `${PhotoPreviewSize.HEIGHT}px`;
    photoTemplate.alt = 'Фотография жилья';
    photos.forEach((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      House.PHOTOS.appendChild(photoElement);
    });
  };

  offer.title ?
    House.TITLE.textContent = offer.title :
    House.TITLE.remove();
  offer.address ?
    House.ADDRESS.textContent = offer.address :
    House.ADDRESS.remove();
  offer.price ?
    House.PRICE.textContent = `${offer.price} ₽/ночь` :
    House.PRICE.remove();
  offer.type ?
    House.TYPE.textContent = accommodationTypes[offer.type].title :
    House.TYPE.remove();
  offer.rooms && offer.guests ?
    House.CAPACITY.textContent = `${offer.rooms} ${getNumeralDeclension(offer.rooms, ROOMS_DECLENSION)} для ${offer.guests} ${getNumeralDeclension(offer.guests, GUESTS_DECLENSION)}` :
    House.CAPACITY.remove();
  offer.checkin && offer.checkout ?
    House.TIME.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` :
    House.TIME.remove();
  offer.features ?
    renderFeaturesList(offer.features) :
    House.FEATURES.remove();
  offer.description ?
    House.DESCRIPTION.textContent = offer.description :
    House.DESCRIPTION.remove();
  offer.photos ?
    renderPhotosList(offer.photos) :
    House.PHOTOS.remove();
  if (author.avatar) {
    House.AVATAR.src = author.avatar;
    House.AVATAR.style.width = `${AvatarSize.WIDTH}px`;
    House.AVATAR.style.height = `${AvatarSize.HEIGHT}px`;
  } else {
    House.AVATAR.remove();
  }

  return popupElement;
};


export {
  renderAnnouncement,
  accommodationTypes
};
