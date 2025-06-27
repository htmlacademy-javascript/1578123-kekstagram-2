import { getData } from './api.js';
import { onLoadDataError } from './notifications.js';
import { initFilters } from './posts-filter.js';
import { renderThumbnails } from './thumbnails.js';
import {initUploadForm} from './upload-form.js';

initUploadForm();

const displayData = (data) => {
  renderThumbnails(data);
  initFilters(data);
};

getData()
  .then((data) => displayData(data.slice()))
  .catch((onLoadDataError));


