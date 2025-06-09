export const getRandomInt = (a, b) => {
  const start = Math.ceil(Math.min(a, b));
  const end = Math.floor(Math.max(a, b));

  return Math.floor(Math.random() * (end - start + 1)) + start;
};

export const getArrayItemById = (array = [], id = '') => array.find((item) => String(item.id) === String(id));

export const getRandomArrayElement = (array) =>
  array[getRandomInt(0, array.length - 1)];

export const createCustomLengthArray = (length = 0, cb = () => {}) =>
  Array.from({ length }, (_, i) => cb(i + 1));

export const createFragment = (data, template, cb) => {
  const fragment = document.createDocumentFragment();

  fragment.append(...data.map((element) => cb(element, template)));

  return fragment;
};

export const isEscKey = (evt) => evt.key === 'Escape';
