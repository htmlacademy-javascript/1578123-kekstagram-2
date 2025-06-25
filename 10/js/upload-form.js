import { initValidator } from './form-validator.js';
import { initImageEditor, resetImageEditor } from './image-editor.js';
import { toggleClass, isEscKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInputElement = uploadForm.querySelector('.img-upload__input');
const overlayElement = uploadForm.querySelector('.img-upload__overlay');
const hashtagsInputElement = uploadForm.querySelector('.text__hashtags');
const descriptionInputElement = uploadForm.querySelector('.text__description');
const closeOverlayElement = uploadForm.querySelector('.img-upload__cancel');
const uploadButtonElement = uploadForm.querySelector('.img-upload__submit');

let validationHandler;

const toggleModal = () => {
  toggleClass(overlayElement, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const openForm = () => {
  toggleModal();

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  uploadInputElement.value = '';

  uploadForm.reset();
  validationHandler.reset();
  uploadButtonElement.disabled = false;

  resetImageEditor();
  toggleModal();

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscKey(evt) && document.activeElement !== hashtagsInputElement && document.activeElement !== descriptionInputElement) {
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
    uploadForm.submit();
  }
};

const initUploadForm = () => {
  uploadInputElement.addEventListener('change', onUploadInputChange);
  closeOverlayElement.addEventListener('click', onCloseOverlayClick);
  uploadForm.addEventListener('submit', onUploadFormSubmit);

  validationHandler = initValidator();
  initImageEditor();
};

export { initUploadForm };
