import { initValidator } from './form-validator.js';
import { initImageEditor, resetImageEditor } from './image-editor.js';
import { toggleClass, isEscKey } from './util.js';
import { sendData } from './api.js';
import { showSendDataSuccess, showSendDataError, showLoadFileSuccess, showLoadFileError } from './notifications.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const uploadInputElement = uploadForm.querySelector('.img-upload__input');
const hashtagsInputElement = uploadForm.querySelector('.text__hashtags');
const descriptionInputElement = uploadForm.querySelector('.text__description');
const overlayElement = uploadForm.querySelector('.img-upload__overlay');
const closeOverlayElement = uploadForm.querySelector('.img-upload__cancel');
const uploadButtonElement = uploadForm.querySelector('.img-upload__submit');
const scaleImageElement = uploadForm.querySelector('.img-upload__preview > img');
const effectsPreview = document.querySelectorAll('.effects__preview');

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

const closeForm = () => {
  uploadInputElement.value = '';

  hashtagsInputElement.value = '';
  descriptionInputElement.value = '';

  validationHandler.reset();

  unblockSubmitButton();
  resetImageEditor();
  toggleModal();

  document.removeEventListener('keydown', onEscKeydown);
};

const onUploadInputChange = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const fileExtension = fileName.split('.').pop();
  const isFileExtensionValid = FILE_TYPES.includes(fileExtension);

  if (!isFileExtensionValid) {
    showLoadFileError();
    uploadInputElement.value = '';

    return;
  }

  const url = URL.createObjectURL(file);

  scaleImageElement.src = url;

  effectsPreview.forEach((effectPreview) => {
    effectPreview.style.backgroundImage = `url(${url})`;
  });

  showLoadFileSuccess();
  toggleModal();

  document.addEventListener('keydown', onEscKeydown);
};

const onCloseOverlayClick = () => {
  closeForm();
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  if (validationHandler.validate()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(showSendDataSuccess)
      .catch(showSendDataError)
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

function onEscKeydown (evt) {
  if (isEscKey(evt) && !document.body.classList.contains('notification-open') && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    closeForm();
  }
}

export { initUploadForm, closeForm };
