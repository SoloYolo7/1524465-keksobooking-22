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

const AccommodationTypes = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец',
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

  const renderFeaturesList = () => {
    featuresList.textContent = '';
    offer.features.forEach((item, i) => {
      let feature = document.createElement('li');
      feature.classList.add('popup__feature', `popup__feature--${offer.features[i]}`);
      featuresList.append(feature);
    });
  };

  const renderPhotosList = () => {
    photosList.textContent = '';
    offer.photos.forEach((item, i) => {
      let photo = document.createElement('img');
      photo.src = offer.photos[i];
      photo.classList.add('popup__photo');
      photo.style.width = `${PhotosPreviewsSizes.WIDTH}px`;
      photo.style.height = `${PhotosPreviewsSizes.HEIGHT}px`;
      photo.alt = 'Фотография жилья';
      photosList.appendChild(photo);
    });
  };

  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = AccommodationTypes[offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${declensionOfNumerals(offer.rooms, ROOMS_DECLENSION)} для ${offer.guests} ${declensionOfNumerals(offer.guests, GUESTS_DECLENSION)}`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if (offer.features.length) {
    renderFeaturesList();
  } else {
    featuresList.textContent = '';
  }
  popupElement.querySelector('.popup__description').textContent = offer.description;
  if (offer.photos.length) {
    renderPhotosList();
  } else {
    photosList.textContent = '';
  }
  popupElement.querySelector('.popup__avatar').src = author.avatar;
  popupElement.querySelector('.popup__avatar').style.width = `${AvatarsSizes.WIDTH}px`;
  popupElement.querySelector('.popup__avatar').style.height = `${AvatarsSizes.HEIGHT}px`;

  return popupElement;
};


export {
  renderAnnouncement
};
