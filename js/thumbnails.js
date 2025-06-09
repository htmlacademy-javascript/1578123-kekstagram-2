import { createFragment } from './util';


const renderThumbnailElement = (data, template) => {
  const { url, description, comments, likes, id } = data;

  const element = template.cloneNode(true);
  const image = element.querySelector('.picture__img');

  image.src = url;
  image.alt = description;

  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;
  element.dataset.id = id;

  return element;
};

const renderThumbnails = (postData) => {
  const container = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = createFragment(postData, template, renderThumbnailElement);

  container.append(fragment);
};

export { renderThumbnails };
