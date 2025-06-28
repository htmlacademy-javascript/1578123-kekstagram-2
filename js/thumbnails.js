import { openPost } from './post.js';
import { createFragment } from './util.js';

const thumbnailsContainerElement = document.querySelector('.pictures');

const renderThumbnailElement = (post, template) => {
  const { url, description, comments, likes } = post;

  const element = template.cloneNode(true);
  const image = element.querySelector('.picture__img');
  const imageComments = element.querySelector('.picture__comments');
  const imageLikes = element.querySelector('.picture__likes');

  image.src = url;
  image.alt = description;

  imageComments.textContent = comments.length;
  imageLikes.textContent = likes;

  const onThumbnailElementClick = (evt) => {
    evt.preventDefault();

    openPost(post);
  };

  element.addEventListener('click', onThumbnailElementClick);

  return element;
};

const renderThumbnails = (posts) => {
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = createFragment(posts, template, renderThumbnailElement);

  thumbnailsContainerElement.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());
  thumbnailsContainerElement.append(fragment);
};

export { renderThumbnails };
