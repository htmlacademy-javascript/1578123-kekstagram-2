import { renderThumbnails } from './thumbnails.js';
import { debounce } from './util.js';

const RANDOM_POSTS_COUNT = 10;
const RENDER_DELAY = 500;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const FilterFunctions = {
  showDefault: (items) => items.slice(),
  showRandom: (items) => items.toSorted(() => 0.5 - Math.random()).slice(0, RANDOM_POSTS_COUNT),
  showDiscussed: (items) => items.toSorted((a, b) => b.comments.length - a.comments.length)
};

const filtersSectionElement = document.querySelector('.img-filters');
const filtersContainer = filtersSectionElement.querySelector('.img-filters__form');

let activeFilterElement = filtersContainer.querySelector('.img-filters__button--active');

let posts = [];

const renderDebouncedThumbnails = debounce(renderThumbnails, RENDER_DELAY);

const useFilter = (filterName) => {
  let sortFunction = FilterFunctions.showDefault;

  switch (filterName) {
    case Filters.RANDOM:
      sortFunction = FilterFunctions.showRandom;
      break;
    case Filters.DISCUSSED:
      sortFunction = FilterFunctions.showDiscussed;
      break;
  }

  renderDebouncedThumbnails(sortFunction(posts));
};

const onFiltersContainerClick = (evt) => {
  const targetFilterElement = evt.target.closest('.img-filters__button');

  if (targetFilterElement && targetFilterElement !== activeFilterElement) {
    activeFilterElement.classList.remove('img-filters__button--active');
    targetFilterElement.classList.add('img-filters__button--active');
    activeFilterElement = targetFilterElement;

    useFilter(targetFilterElement.id);
  }
};

const initFilters = (data) => {
  posts = data;
  filtersSectionElement.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFiltersContainerClick);
};

export { initFilters };
