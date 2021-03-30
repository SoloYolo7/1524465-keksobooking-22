const ALERTSHOWTIME = 5000;
const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// Рандом число в диапазоне
const getRandomInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    return alert('Максимальное значение не может быть меньше минимальной!');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Рандом число в диапазоне с плавающей точкой
const getRandomFractionalNumber = (min, max, symbol) => {
  if (min > max) {
    return alert('Максимальное значение не может быть меньше минимальной!');
  }

  return (Math.random() * (max - min) + min).toFixed(symbol);
}

// Рандом элемент в массиве
const getRandomItem = (arr) => {
  const randomItemIndex = Math.floor(Math.random() * arr.length);
  const randomItem = arr[randomItemIndex];
  return randomItem;
};

// Рандом элементы в массиве без повторения и с рандом количеством
const getRandomItemNoRepeat = (arr) => {
  for (let i = 0 ; i < arr.length; i++) {
    let r = Math.floor(Math.random() * (arr.length - i)) + i;
    let city = arr[r];
    arr[r] = arr[i];
    arr[i] = city;
  }

  const sumElements = getRandomInRange(0, arr.length - 1);

  return arr.slice(sumElements)
}

//Создаем вывод сообщения об ошибке
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => alertContainer.remove(), ALERTSHOWTIME);
}

const openMessage = (messageTemplate) => {
  const element = messageTemplate.cloneNode(true);
  element.style.zIndex = 50000;

  main.addEventListener('click', () => {
    element.style.display = 'none';
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      element.style.display = 'none';
    }
  }, true);


  main.append(element);
}

//Создаем попап об успешном размещении обьявлении
const openMessageSuccess = () =>  openMessage(successTemplate);

//Создаем попап об ошибке размещении обьявлении
const openMessageError = () => openMessage (errorTemplate);

export {getRandomInRange, getRandomFractionalNumber, getRandomItem, getRandomItemNoRepeat, showAlert, openMessageSuccess, openMessageError};
