import {
  declensionOfNumerals
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

const PhotosPreviewsSizes = {
  WIDTH: 45,
  HEIGHT: 40,
};

const AvatarsSizes = {
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
  const featuresList = popupElement.querySelector('.popup__features');
  const photosList = popupElement.querySelector('.popup__photos');

  const renderFeaturesList = (features) => {   /*  DO Проверять существующие  */
    featuresList.textContent = '';
    features.forEach((feature) => {
      let featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
      featuresList.append(featureElement);
    });
    features.length ? featuresList : '';
  };

  const renderPhotosList = (photos) => {
    photosList.textContent = '';
    photos.forEach((photo) => {
      let photoElement = document.createElement('img');
      photoElement.src = photo;
      photoElement.classList.add('popup__photo');
      photoElement.style.width = `${PhotosPreviewsSizes.WIDTH}px`;
      photoElement.style.height = `${PhotosPreviewsSizes.HEIGHT}px`;
      photoElement.alt = 'Фотография жилья';
      photosList.appendChild(photoElement);
    });
    photos.length ? photosList : '';
  };

  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = accommodationTypes[offer.type].title;
  popupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${declensionOfNumerals(offer.rooms, ROOMS_DECLENSION)} для ${offer.guests} ${declensionOfNumerals(offer.guests, GUESTS_DECLENSION)}`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  renderFeaturesList(offer.features);
  popupElement.querySelector('.popup__description').textContent = offer.description;
  renderPhotosList(offer.photos);
  popupElement.querySelector('.popup__avatar').src = author.avatar;
  popupElement.querySelector('.popup__avatar').style.width = `${AvatarsSizes.WIDTH}px`;
  popupElement.querySelector('.popup__avatar').style.height = `${AvatarsSizes.HEIGHT}px`;

  return popupElement;
};


export {
  renderAnnouncement,
  accommodationTypes
};
