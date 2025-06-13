import { createFragment, isEscKey, toggleClass } from './util.js';

const COMMENTS_SHOWN_COUNT = 5;

const postElement = document.querySelector('.big-picture');
const closePostElement = document.querySelector('.big-picture__cancel');
const imageElement = postElement.querySelector('.big-picture__img > img');

const likesElement = postElement.querySelector('.likes-count');

const captionElement = postElement.querySelector('.social__caption');

const commentsShownElement = postElement.querySelector('.social__comment-shown-count');
const commentsTotalElement = postElement.querySelector('.social__comment-total-count');

const commentsLoaderElement = postElement.querySelector('.comments-loader');

const commentsContainer = postElement.querySelector('.social__comments');

const commentTemplate = commentsContainer.querySelector('.social__comment');

let visibleCommentsCount = COMMENTS_SHOWN_COUNT;
let postData;

function renderPost() {
  imageElement.src = postData.url;
  likesElement.textContent = postData.likes;
  captionElement.textContent = postData.description;

  renderCommentsCount();
  renderCommentsList();
  renderCommentsLoader();
}

function openPost(data) {
  postData = data;

  renderPost(postData);

  toggleModal();

  document.addEventListener('keydown', onDocumentKeyDown);
}

function closePost() {
  visibleCommentsCount = COMMENTS_SHOWN_COUNT;

  toggleModal();

  document.removeEventListener('keydown', onDocumentKeyDown);
}

function renderCommentElement({ avatar, message, name }, template) {
  const commentElement = template.cloneNode(true);
  const commentImageElement = commentElement.querySelector('.social__picture');

  commentImageElement.src = avatar;
  commentImageElement.alt = name;

  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
}

function renderCommentsCount() {
  commentsShownElement.textContent = Math.min(visibleCommentsCount, postData.comments.length);
  commentsTotalElement.textContent = postData.comments.length;
}

function renderCommentsList() {
  const fragment = createFragment(postData.comments.slice(0, visibleCommentsCount), commentTemplate, renderCommentElement);

  commentsContainer.replaceChildren(fragment);
}

function renderCommentsLoader() {
  if (visibleCommentsCount >= postData.comments.length) {
    commentsLoaderElement.classList.add('hidden');

    return;
  }

  commentsLoaderElement.classList.remove('hidden');
}

function toggleModal () {
  toggleClass(postElement, 'hidden');
  toggleClass(document.body, 'modal-open');
}

function onCommentsLoaderClick() {
  visibleCommentsCount += COMMENTS_SHOWN_COUNT;

  renderCommentsCount();
  renderCommentsList();
  renderCommentsLoader();
}

function onDocumentKeyDown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();

    closePost();
  }
}

function onClosePostElementClick() {
  closePost();
}

commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
closePostElement.addEventListener('click', onClosePostElementClick);

export { openPost };
