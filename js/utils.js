const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger,getRandomArrayElement};

// удалить функции для отрисовки моков
// const ALERT_SHOW_TIME = 5000;

// const showAllert = (message) => {
//   const alert = document.createElement('div');
//   alert.style.position = 'absolute';
//   alert.style.zIndex = '100';
//   alert.style.left = '0';
//   alert.style.top = '0';
//   alert.style.right = '0';
//   alert.style.padding = '10px 3px';
//   alert.style.fontSize = '30px';
//   alert.style.textAlign = 'center';
//   alert.style.backgroundColor = 'red';
//   alert.textContent = 'message';
//   document.body.append(alert);
//   setTimeout(() => {
//     alert.remove();
//   }, ALERT_SHOW_TIME),
// };
// export {showAllert};
