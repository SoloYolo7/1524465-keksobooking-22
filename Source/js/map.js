/* global L:readonly */

import {
  setFilterActive,
  setFormActive
} from './form.js';

import {
  AccommodationElement
} from './validate.js';

import {
  renderAnnouncement
} from './render-announcement.js';

/* import {
  filterAnnouncements
} from './filter.js'; */


const DIGITS = 5;
const ZOOM = 10;

const tokyoCenter = {
  lat: 35.66566,
  lng: 139.76103,
};

const tokyoMap = L.map('map-canvas');

const mainPinAddress = `${tokyoCenter.lat}, ${tokyoCenter.lng}`;

tokyoMap.on('load', () => {
  setFilterActive();
  setFormActive();
}).setView(tokyoCenter, ZOOM);

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
  tokyoCenter,
  {
    draggable: true,
    icon: mainPinIcon,
  },
)
  .addTo(tokyoMap);

AccommodationElement.ADDRESS.value = mainPinAddress;

mainPinMarker.on('move', (evt) => {
  AccommodationElement.ADDRESS.value = `${evt.target.getLatLng().lat.toFixed(DIGITS)}, ${evt.target.getLatLng().lng.toFixed(DIGITS)}`;
});

const tokyoPinsLayer = L.layerGroup()
  .addTo(tokyoMap);

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

export {
  mainPinAddress,
  renderPins,
  removePins
}
