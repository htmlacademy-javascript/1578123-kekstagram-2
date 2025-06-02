export const getRandomInt = (a, b) => {
  const start = Math.ceil(Math.min(a, b));
  const end = Math.floor(Math.max(a, b));

  return Math.floor(Math.random() * (end - start + 1)) + start;
};

export const getRandomArrayElement = (array) =>
  array[getRandomInt(0, array.length - 1)];
