import { getData } from './api.js';
import { onLoadDataError } from './notifications.js';
import { renderThumbnails } from './thumbnails.js';
import {initUploadForm} from './upload-form.js';

getData()
  .then((data) => renderThumbnails(data.slice()))
  .catch((onLoadDataError));

initUploadForm();

