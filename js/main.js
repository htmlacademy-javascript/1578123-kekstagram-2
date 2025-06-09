import { createMockData } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { setSinglePost } from './post.js';

const postsData = createMockData();

renderThumbnails(postsData);
setSinglePost(postsData);
