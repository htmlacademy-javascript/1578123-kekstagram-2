import { createFragment, isEscKey, getArrayItemById } from './util.js';

const COMMENTS_SHOWN_COUNT = 5;

const postElement = document.querySelector('.big-picture');
const closePostElement = document.querySelector('.big-picture__cancel');
const imageElement = postElement.querySelector('.big-picture__img > img');

const likesElement = postElement.querySelector('.likes-count');

const captionElement = postElement.querySelector('.social__caption');

const commentsCountElement = postElement.querySelector('.social__comment-count');
const commentsShownElement = postElement.querySelector('.social__comment-shown-count');
const commentsTotalElement = postElement.querySelector('.social__comment-total-count');

const commentsLoaderElement = postElement.querySelector('.comments-loader');

const commentsContainer = postElement.querySelector('.social__comments');

const commentTemplate = commentsContainer.querySelector('.social__comment');

let visibleCommentsCount = COMMENTS_SHOWN_COUNT;
let postData = null;

function renderPost() {
  imageElement.src = postData.url;
  likesElement.textContent = postData.likes;
  captionElement.textContent = postData.description;

  renderCommentsCount();
  renderCommentsList();
  renderCommentsLoader();

  commentsCountElement.classList.add('hiddem');
}

function openPost() {
  renderPost(postData);

  postElement.classList.remove('hidden');
  document.body.classList.add('modal-opent');

  closePostElement.addEventListener('click', onClosePostElementClick);
  document.addEventListener('keydown', onDocumentKeyDown);
}

function closePost() {
  postElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  visibleCommentsCount = COMMENTS_SHOWN_COUNT;

  closePostElement.removeEventListener('click', onClosePostElementClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
}

function setSinglePost(data) {
  const thumbnailContainer = document.querySelector('.pictures');

  thumbnailContainer.addEventListener('click', (evt) => {
    const thumbnailElement = evt.target.closest('.picture');

    if (thumbnailElement) {
      postData = getArrayItemById(data, thumbnailElement.dataset.id);
      visibleCommentsCount = postData.comments.length;

      openPost(postData);
    }
  });
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
  } else {
    commentsLoaderElement.classList.remove('hidden');
    commentsLoaderElement.addEventListener('click', onCommentsLoaderClick, { once: true });
  }
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

export { setSinglePost };
