import './map.js';
import './form.js';
import './validate.js';
import './filter.js';
import './avatar.js';

import {
  showLoadingErrorModal
} from './modal.js';

import {
  getData
} from './create-fetch.js';

import {
  renderPins,
  setMapFiltersChangeHandler,
  ANNOUNCEMENT_LIMIT
} from './map.js';

import {
  setFormSubmitHandler,
  setFormResetHandler
} from './form.js';

getData(
  (data) => {
    renderPins(data.slice(0, ANNOUNCEMENT_LIMIT));
    setMapFiltersChangeHandler(data);
    setFormSubmitHandler(data);
    setFormResetHandler(data);
  },
  showLoadingErrorModal);
