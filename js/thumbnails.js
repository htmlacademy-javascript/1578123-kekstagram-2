const createThumbnailElement = (data, template) => {
  const { url, description, comments, likes } = data;

  const element = template.cloneNode(true);
  const image = element.querySelector('.picture__img');

  image.src = url;
  image.alt = description;

  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;

  return element;
};

const createThumbnails = (photosData) => {
  const fragment = document.createDocumentFragment();

  const container = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture');

  fragment.append(...photosData.map((currentPhotoItem) => createThumbnailElement(currentPhotoItem, template)));
  container.append(fragment);
};

export { createThumbnailElement, createThumbnails };
