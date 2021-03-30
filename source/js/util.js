/**
 * Склонение окончаний существительных после числа
 * @param {number} number — число перед существительным
 * @param {array} words — массив с вариантами слов в зависимости от числа
 * @return {string} — выбранное слово в зависимости от числа
 */
const getNumeralDeclension = (number, words) => {
  number = Math.abs(number) % 100;
  const number2 = number % 10;
  if (number > 10 && number < 20) {
    return words[2];
  }
  if (number2 > 1 && number2 < 5) {
    return words[1];
  }
  if (number2 === 1) {
    return words[0];
  }
  return words[2];
}


/**
 * Создает и возвращает переданную в качестве параметра функцию, откладывая ее выполнение до тех пор, пока не пройдет таймаут ожидания с момента ее последнего вызова.
 * @param {callback} func — передаваемая callback-функция
 * @param {number} wait — количество миллисекунд таймаута
 * @return {callback} — callback-функция
 */
const debounce = (func, wait) => {
  let timeout;

  return (...args) => {
    const waitTime = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(waitTime, wait);
  };
};

export {
  getNumeralDeclension,
  debounce
};
