/*
1. Описание утилитарных функций.
2. Описание модальных окон с сообщениями об успешной операции или ошибке.
3. Деактивация полей формы фильтрации жилья и формы создания собственного объявления.
4. Создание шаблона одного объявления.
5. Получение данных с сервера и рендер пинов с объявлениями.
6. Активация полей формы фильтрации жилья и формы создания собственного объявления.
7. Валидация формы создания собственного объявления.
8. Фильтр жилья.
9.
*/

import './map.js';
import './form.js';
import './validate.js';
import './filter.js';
import './avatar.js';

import {
  showModal
} from './modal.js';

import {
  getData
} from './create-fetch.js';

import {
  renderPins,
  removePins
} from './map.js';

import {
  mapFilters,
  filterAnnouncements
} from './filter.js';

import {
  debounce
} from './util.js';


const ANNOUNCEMENT_LIMIT = 10;
const RERENDER_DELAY = 500;

getData((data) => {
  renderPins(data.slice(0, ANNOUNCEMENT_LIMIT));
  mapFilters.addEventListener('change', () => {
    (debounce(() => {
      removePins();
      renderPins(filterAnnouncements(data).slice(0, ANNOUNCEMENT_LIMIT));
    }, RERENDER_DELAY))();
  });
}, showModal);
