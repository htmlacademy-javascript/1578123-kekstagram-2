// Функция для проверки длины строки
const checkStringLength = (str, length) => str.length <= length;

// Функция для проверки, является ли строка палиндромом
const checkIfStringIsPalindrome = (str) => str.replaceAll(' ', '').toLowerCase().split('').reverse().join('') === str.replaceAll(' ', '').toLowerCase();

// Функция для извлечения целых положительных чисел из строки
const extractNumbersFromString = (str) => !str.toString().match(/\d/g) ? NaN : parseInt(str.toString().match(/\d/g).join(''), 10);
