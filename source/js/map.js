import {getData} from './api.js';
import {filterRules, filterElements} from './map-filters.js';
import '../../build/leaflet/leaflet';

const VALUELAT = 35.6895000;
const VALUELNG = 139.6917100;
const MAXELEMETS = 10;
const TIMEDELAY = 500;
const ZOOMMAP = 9;

const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const filterItems = mapFilters.querySelectorAll('.map__filter');

//Правила отображения формы и фильтра
form.classList.add('ad-form--disabled');
fieldsets.forEach(element => element.setAttribute('disabled','disabled'));

mapFilters.classList.add('map__filters--disabled');
filterItems.forEach(element => element.setAttribute('disabled','disabled'));

//Подключаем карту
const L = window.L;
const map = L.map('map-canvas')
  .on('load', () => {
    form.classList.remove('ad-form--disabled');
    fieldsets.forEach(element => element.removeAttribute('disabled'));
    mapFilters.classList.remove('map__filters--disabled');
    filterItems.forEach(element => element.removeAttribute('disabled'));
  })
  .setView({
    lat: VALUELAT,
    lng: VALUELNG,
  }, ZOOMMAP);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Добавляем маркер
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: VALUELAT,
    lng: VALUELNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

//Выбор адреса на карте синхронизируются с формой
const address = document.querySelector('#address');
address.value = `${mainMarker._latlng.lat}, ${mainMarker._latlng.lng}`;

mainMarker.on('moveend', () => address.value = `${mainMarker._latlng.lat.toFixed(5)}, ${mainMarker._latlng.lng.toFixed(5)}`);

//Создания попапа для балуна метки
const createCustomPopup =  (element) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = cardTemplate.cloneNode(true);

  const makeElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  };

  popupElement.querySelector('.popup__avatar').src = element.author.avatar;
  popupElement.querySelector('.popup__title').textContent = element.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = element.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;

  switch (element.offer.type) {
    case 'flat' :
      element.offer.type = 'Квартира'; break
    case 'bungalow' :
      element.offer.type = 'Бунгало'; break
    case 'house' :
      element.offer.type = 'Дом'; break
    case 'palace' :
      element.offer.type = 'Дворец'; break
    default :
      element.offer.type = 'Непонятно';
  }
  popupElement.querySelector('.popup__type').textContent = element.offer.type;
  popupElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
  popupElement.querySelector('.popup__description').textContent = element.offer.description;

  //Создание преимуществ
  const features = popupElement.querySelector('.popup__features');
  features.innerHTML = '';

  const arrayFeauteres = element.offer.features;

  arrayFeauteres.forEach(item => {
    const createItem = makeElement('li', 'popup__feature');
    const newClassName = `popup__feature--${item}`
    createItem.classList.add(newClassName);

    features.appendChild(createItem);
  })

  //Создание фото
  const photos = popupElement.querySelector('.popup__photos');
  photos.innerHTML = '';

  const arrayPhotos = element.offer.photos;

  arrayPhotos.forEach(item => {
    const createItem = makeElement('img', 'popup__photo');
    createItem.alt = 'Фотография жилья';
    createItem.width = '45';
    createItem.height = '40';
    createItem.src = item;

    photos.appendChild(createItem);
  });

  return popupElement;
};

// Отрисовка меток
const mapMarkers = [];

const renderMarkers = (element) => {
  const lat = element.location.lat
  const lng = element.location.lng
  const pinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      pinIcon,
    },
  );
  marker
    .addTo(map)
    .bindPopup(
      createCustomPopup(element),
      {
        keepInView: true,
      },
    );

  mapMarkers.push(marker)
}

//Получение данных отрисовка обьявлений
getData((data) => {
  data
    .slice()
    .slice(0, MAXELEMETS)
    .forEach(element =>
    {
      renderMarkers(element);
    },
    );
  filterElements.forEach(element => {
    element.addEventListener('change', () => {
      for(let i = 0; i < mapMarkers.length; i++){
        map.removeLayer(mapMarkers[i]);
      }
      getData((data) => {
        data
          .slice()
          .slice(0, MAXELEMETS)
          .filter(filterRules)
          .forEach((element) =>
          {
            setTimeout(() => {
              renderMarkers(element)
            }, TIMEDELAY)
          },
          );
      })
    })
  });
})

export {mainMarker, VALUELAT, VALUELNG, ZOOMMAP, map};
