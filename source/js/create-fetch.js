const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_URL = 'https://22.javascript.pages.academy/keksobooking';

/**
 * Получает данные с сервера, проверяет на корректность и отправляет дальше по цепочке промисов
 * @param {callback} onSuccess — действие при успешном получении данных с сервера
 * @param {callback} onFail — действие при сбое получения данных
 */
const getData = (onSuccess, onFail) => {
  fetch(GET_URL)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};

/**
 * Принимает данные, проверяет на корректность и отправляет на указанный сервер
 * @param {callback} onSuccess — действие при успешной выгрузке данных
 * @param {callback} onFail — действие при сбое выгрузки данных
 * @param {Object} body — данные для выгрузки на сервер
 */
const sendData = (onSuccess, onFail, body) => {
  fetch(SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {
  getData,
  sendData
};
