import { closeForm } from './upload-form.js';
import { isEscKey } from './util.js';

const SHOW_NOTIFICATION_TIME = 5000;

let activeNotification;
let notificationTrigger;

const showNotification = (templateSelector, contentSelector, triggerSelector) => {
  const template = document.querySelector(templateSelector).content.querySelector(contentSelector);

  activeNotification = template.cloneNode(true);
  notificationTrigger = activeNotification.querySelector(triggerSelector);

  activeNotification.addEventListener('click', onNotificationClick);
  document.addEventListener('keydown', onEscKeydown);

  document.body.classList.toggle('notification-open');
  document.body.append(activeNotification);
};

const removeNotification = () => {
  notificationTrigger = null;
  activeNotification.remove();

  document.body.classList.toggle('notification-open');
  document.removeEventListener('keydown', onEscKeydown);
};

function onEscKeydown (evt) {
  if (isEscKey(evt)) {
    removeNotification();
  }
}

function onNotificationClick (evt) {
  if (evt.target === activeNotification || evt.target === notificationTrigger) {
    removeNotification();
  }
}

const onLoadDataError = () => {
  const template = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorElement = template.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, SHOW_NOTIFICATION_TIME);
};

const onSendDataSuccess = () => {
  showNotification('#success', '.success', '.success__button');
  closeForm();
};

const onSendDataError = () => {
  showNotification('#error', '.error','.error__button');
};

export { onLoadDataError, onSendDataSuccess, onSendDataError};
