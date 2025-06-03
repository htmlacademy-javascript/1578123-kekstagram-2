import { getRandomArrayElement, getRandomInt } from './util';

const PHOTOS_COUNT = 25;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Алевтина',
  'Антон',
  'Екатерина',
  'Наталья',
  'Олег',
  'Рахим',
  'Павел',
  'Полина',
  'Сергей',
  'Сона',
  'Юлия'
];

const likesCount = {
  MIN: 15,
  MAX: 200
};

const commentsCount = {
  MIN: 0,
  MAX: 30
};

const avatarsCount = {
  MIN: 1,
  MAX: 6
};

const createCommentObject = (id = 0) => ({
  id,
  avatar: `img/avatar-${getRandomInt(avatarsCount.MIN, avatarsCount.MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createCommentsArray = (length = 0) => Array.from({ length }, (_, i) => createCommentObject(i + 1));

const createPhotoObject = (id = 0) => ({
  id,
  url: `photos/${id}.jpg`,
  description: `Фотография №${id}`,
  likes: getRandomInt(likesCount.MIN, likesCount.MAX),
  comments: createCommentsArray(getRandomInt(commentsCount.MIN, commentsCount.MAX))
});

const createPhotosArray = (length = 0) => Array.from({ length }, (_, i) => createPhotoObject(i + 1));

const createMockData = () => createPhotosArray(PHOTOS_COUNT);

export { createMockData };
