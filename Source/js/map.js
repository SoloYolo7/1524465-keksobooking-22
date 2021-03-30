/* global L:readonly */

import {
  setFilterActive,
  setFormActive
} from './form.js';

import {
  renderAnnouncement
} from './render-announcement.js';

import {
  mapFilters,
  filterAnnouncements
} from './filter.js';

import {
  debounce
} from './util.js';

const DIGITS = 5;
const ZOOM = 10;
const ANNOUNCEMENT_LIMIT = 10;
const RERENDER_DELAY = 500;

const TokyoCenter = {
  lat: 35.66566,
  lng: 139.76103,
};

const addressField = document.querySelector('.ad-form').querySelector('#address');

const tokyoMap = L.map('map-canvas');

const showDefaultMainPinAddress = () => {
  addressField.value = `${TokyoCenter.lat}, ${TokyoCenter.lng}`
}

tokyoMap.on('load', () => {
  setFilterActive();
  setFormActive();
  showDefaultMainPinAddress();
}).setView(TokyoCenter, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(tokyoMap);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  TokyoCenter,
  {
    draggable: true,
    icon: mainPinIcon,
  },
)
  .addTo(tokyoMap);

mainPinMarker.on('move', (evt) => {
  addressField.value = `${evt.target.getLatLng().lat.toFixed(DIGITS)}, ${evt.target.getLatLng().lng.toFixed(DIGITS)}`;
});

const tokyoPinsLayer = L.layerGroup().addTo(tokyoMap);

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const renderPins = (announcementsList) => {
  announcementsList.forEach(({ author, offer, location }) => {
    const marker = L.marker({
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: pinIcon,
    },
    );

    marker
      .addTo(tokyoPinsLayer)
      .bindPopup(
        renderAnnouncement({ author, offer, location }),
      );
  });
}

const removePins = () => {
  tokyoPinsLayer.clearLayers();
};

const resetMap = () => {
  tokyoMap.setView(TokyoCenter, ZOOM);
  mainPinMarker.setLatLng(TokyoCenter);
  showDefaultMainPinAddress();
};

const setMapFiltersChangeHandler = (announcements) => {
  mapFilters.addEventListener('change', debounce(() => {
    removePins();
    renderPins(filterAnnouncements(announcements).slice(0, ANNOUNCEMENT_LIMIT));
  }, RERENDER_DELAY));
};


export {
  setMapFiltersChangeHandler,
  renderPins,
  removePins,
  resetMap,
  ANNOUNCEMENT_LIMIT
}
