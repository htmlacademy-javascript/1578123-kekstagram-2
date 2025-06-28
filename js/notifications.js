import { closeForm } from './upload-form.js';
import { isEscKey } from './util.js';

const SHOW_NOTIFICATION_TIME = 5000;

let toastElement;
let toastTimeoutId;
let notification;
let notificationTrigger;

const removeNotification = () => {
  notificationTrigger = null;
  notification.remove();

  document.body.classList.toggle('notification-open');
  document.removeEventListener('keydown', onEscKeydown);
};

const onNotificationClick = (evt) => {
  if (evt.target === notification || evt.target === notificationTrigger) {
    removeNotification();
  }
};

const showNotification = (templateSelector, contentSelector, triggerSelector) => {
  const template = document.querySelector(templateSelector).content.querySelector(contentSelector);

  notification = template.cloneNode(true);
  notificationTrigger = notification.querySelector(triggerSelector);

  notification.addEventListener('click', onNotificationClick);
  document.addEventListener('keydown', onEscKeydown);

  document.body.classList.toggle('notification-open');
  document.body.append(notification);
};

const showToast = (templateSelector, contentSelector, message = '') => {
  const template = document.querySelector(templateSelector).content.querySelector(contentSelector);
  toastElement = template.cloneNode(true);

  if (message) {
    const messageElement = document.createElement('h2');
    messageElement.classList.add(`${contentSelector}__title`);
    messageElement.textContent = message;
    toastElement.replaceChildren(messageElement);
  }

  document.body.append(toastElement);

  toastTimeoutId = setTimeout(() => {
    toastElement.remove();
  }, SHOW_NOTIFICATION_TIME);
};

const removeToast = () => {
  clearTimeout(toastTimeoutId);
  toastElement.remove();
};

const showLoadDataError = () => {
  showToast('#data-error','.data-error');
};

const showLoadFileSuccess = () => {
  if (toastElement) {
    removeToast();
  }
};

const showLoadFileError = () => {
  if (toastElement) {
    removeToast();
  }

  showToast('#data-error','.data-error' ,'Неверный тип загружаемого файла');
};

const showSendDataSuccess = () => {
  showNotification('#success', '.success', '.success__button');
  closeForm();
};

const showSendDataError = () => {
  showNotification('#error', '.error','.error__button');
};

function onEscKeydown (evt) {
  if (isEscKey(evt)) {
    removeNotification();
  }
}

export { showLoadDataError, showSendDataSuccess, showSendDataError, showLoadFileSuccess, showLoadFileError };
