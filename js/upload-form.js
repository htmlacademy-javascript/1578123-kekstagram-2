import { initValidator } from './form-validator.js';
import { initImageEditor, resetImageEditor } from './image-editor.js';
import { toggleClass, isEscKey } from './util.js';
import { sendData } from './api.js';
import { onSendDataSuccess, onSendDataError } from './notifications.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInputElement = uploadForm.querySelector('.img-upload__input');
const overlayElement = uploadForm.querySelector('.img-upload__overlay');
const closeOverlayElement = uploadForm.querySelector('.img-upload__cancel');
const uploadButtonElement = uploadForm.querySelector('.img-upload__submit');

let validationHandler;

const toggleModal = () => {
  toggleClass(overlayElement, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const blockSubmitButton = () => {
  uploadButtonElement.disabled = true;
};

const unblockSubmitButton = () => {
  uploadButtonElement.disabled = false;
};

const openForm = () => {
  toggleModal();

  document.addEventListener('keydown', onEscKeydown);
};

const closeForm = () => {
  uploadInputElement.value = '';

  uploadForm.reset();

  unblockSubmitButton();

  validationHandler.reset();

  resetImageEditor();
  toggleModal();

  document.removeEventListener('keydown', onEscKeydown);
};

function onEscKeydown (evt) {
  if (isEscKey(evt) && !document.body.classList.contains('notification-open') && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    closeForm();
  }
}

const onUploadInputChange = () => {
  openForm();
};

const onCloseOverlayClick = () => {
  closeForm();
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  if (validationHandler.validate()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(onSendDataSuccess)
      .catch(onSendDataError)
      .finally(unblockSubmitButton);
  }
};

const initUploadForm = () => {
  uploadInputElement.addEventListener('change', onUploadInputChange);
  closeOverlayElement.addEventListener('click', onCloseOverlayClick);
  uploadForm.addEventListener('submit', onUploadFormSubmit);

  validationHandler = initValidator();
  initImageEditor();
};

export { initUploadForm, closeForm };
