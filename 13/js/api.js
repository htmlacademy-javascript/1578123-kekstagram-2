const MAIN_URI = 'https://31.javascript.htmlacademy.pro/kekstagram';
const SUCCESS_STATUS = 200;

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Обновите страницу',
  SEND_DATA: 'Не удалось отправить форму. Повторите попытку',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${MAIN_URI}${route}`, {method, body})
    .then((response) => {
      if (response.status !== SUCCESS_STATUS) {
        throw new Error();
      }

      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {getData, sendData};
