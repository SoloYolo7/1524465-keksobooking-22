/* global L:readonly */

import {
  Accommodation,
  setFilterActive,
  setFormActive
} from './form.js';

import {
  renderAnnouncement
} from './render-announcement.js';

import {
  getData
} from './create-fetch.js';

const TokyoCenter = {
  LAT: 35.66566,
  LNG: 139.76103,
};

const DIGITS = 5;
const ZOOM = 10;

const map = L.map('map-canvas')
  .on('load', () => {
    setFilterActive();
    setFormActive();
    Accommodation.ADDRESS.value = `${TokyoCenter.LAT}, ${TokyoCenter.LNG}`;
  })
  .setView({
    lat: TokyoCenter.LAT,
    lng: TokyoCenter.LNG,
  }, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: TokyoCenter.LAT,
    lng: TokyoCenter.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('move', (evt) => {
  Accommodation.ADDRESS.value = `${evt.target.getLatLng().lat.toFixed(DIGITS)}, ${evt.target.getLatLng().lng.toFixed(DIGITS)}`;
});


getData((announcementsList) => {
  announcementsList.forEach((announcement) => {
    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: announcement.location.lat,
        lng: announcement.location.lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        renderAnnouncement(announcement),
        {
          keepInView: true,
        },
      );
  });
});
