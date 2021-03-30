import {map} from './map.js'

const CHEAPPRICE = 10000;
const EXPENSIVEPRICE = 50000;

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');

//Закрываем балун при изменении фильтра
const filterElements  = [housingType, housingPrice, housingRooms, housingGuests, housingFeatures];

filterElements.forEach(element => {
  element.addEventListener('change', () => {
    map.closePopup();
  })
})

//Фильтрация меток по форме
//Фильтр по типу жилья
const filterType = element => housingType.value !== 'any' ? element.offer.type === housingType.value : true;

//Фильтр по ценовой категории
const filterPrice = element => {
  switch (housingPrice.value) {
    case 'low' :
      return element.offer.price < CHEAPPRICE;
    case 'middle' :
      return element.offer.price < EXPENSIVEPRICE;
    case 'high' :
      return element.offer.price > EXPENSIVEPRICE;
    case 'any' :
      return true
  }
}

//Фильтр по колличеству комнат
const filterRooms = element => housingRooms.value !== 'any' ?  element.offer.rooms === parseInt(housingRooms.value) : true;

//Фильтр по колличеству мест
const filterGuests = element => housingGuests.value !== 'any' ? element.offer.guests ===  parseInt(housingGuests.value) : true;

//Фильтр по преимуществу
const filterFeatures = element => {
  const checkedFeatures = housingFeatures.querySelectorAll('.map__checkbox:checked');
  if (checkedFeatures.length === 0) {
    return true;
  }
  for (const featureItem of checkedFeatures) {
    if (!element.offer.features.includes(featureItem.value)) {
      return false;
    }
  }
  return true;
};

//Фильтр по всем условиям
const filterRules = element => filterType(element) && filterPrice(element) && filterRooms(element) && filterGuests(element) && filterFeatures(element);

export {filterRules, filterElements}
