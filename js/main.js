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

const getRandomInt = (a, b) => {
  const start = Math.ceil(Math.min(a, b));
  const end = Math.floor(Math.max(a, b));

  return Math.floor(Math.random() * (end - start + 1)) + start;
};

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

const createRandomCommentsData = (length = 0) =>
  Array.from({ length }, (_, i) => ({
    id: i + 1,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
  }));

const createRandomPhotosData = (length = 0) =>
  Array.from({ length }, (_, i) => ({
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    description: 'Ещё одна фотография',
    likes: getRandomInt(15, 200),
    comments: createRandomCommentsData(getRandomInt(0, 30))
}));

createRandomPhotosData(PHOTOS_COUNT);
