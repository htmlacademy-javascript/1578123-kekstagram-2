import { openPost } from './post.js';
import { createFragment } from './util.js';


const renderThumbnailElement = (data, template) => {
  const { url, description, comments, likes } = data;

  const element = template.cloneNode(true);
  const image = element.querySelector('.picture__img');

  image.src = url;
  image.alt = description;

  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;

  const onThumbnailElementClick = (evt) => {
    evt.preventDefault();

    openPost(data);
  };

  element.addEventListener('click', onThumbnailElementClick);

  return element;
};

const renderThumbnails = (postData) => {
  const container = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = createFragment(postData, template, renderThumbnailElement);

  container.append(fragment);
};

export { renderThumbnails };
