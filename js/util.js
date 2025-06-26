export const createFragment = (data, template, cb) => {
  const fragment = document.createDocumentFragment();

  fragment.append(...data.map((element) => cb(element, template)));

  return fragment;
};

export const isEscKey = (evt) => evt.key === 'Escape';

export const toggleClass = (element, className = '') => {
  if (element) {
    element.classList.toggle(className);
  }
};

export const debounce = (cb, delay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => cb.apply(this, rest), delay);
  };
};
