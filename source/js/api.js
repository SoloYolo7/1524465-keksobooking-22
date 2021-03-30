import {showAlert} from './util.js'

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ad) => onSuccess(ad))
    .catch((response) => {
      if (!response.ok) {
        showAlert('Не удалось получить данные с сервера')
      }
    },
    )
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    })
    .then((response) => response.ok ? onSuccess() : onFail('Не удалось отправить форму. Попробуйте ещё раз'))
    .catch(() => onFail('Не удалось отправить форму. Попробуйте ещё раз'));
};

export {getData ,sendData};
