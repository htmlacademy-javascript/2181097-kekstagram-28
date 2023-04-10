const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить станицу',
  SEND_DATA: 'Ну удалось отправить форму. Попробуйте еще раз'
};
const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body});
const getData = () => load(Route.GET_DATA);
const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);


const getLivePhoto = () => {
  return getData();
};

export {getLivePhoto, getData, sendData};
