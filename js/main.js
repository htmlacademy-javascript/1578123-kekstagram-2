import { createMockData } from './data.js';
import { createThumbnails } from './thumbnails.js';

const photos = createMockData();

createThumbnails(photos);
