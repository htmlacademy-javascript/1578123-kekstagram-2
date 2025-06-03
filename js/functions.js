// Функция для проверки длины строки
const checkStringLength = (str, maxLength) => str.length <= maxLength;

// Функция для проверки, является ли строка палиндромом
const checkIfStringIsPalindrome = (str) => {
  const normalizedString = str.toLowerCase().replaceAll(' ', '');

  return normalizedString === [...normalizedString].reverse().join('');
};

// Функция для извлечения целых положительных чисел из строки
const extractNumbersFromString = (str) => !str.toString().match(/\d/g) ? NaN : parseInt(str.toString().match(/\d/g).join(''), 10);

const isMeetingPossible = (
  workStart,
  workEnd,
  meetingStart,
  meetingDuration
) => {
  const timings = [workStart, workEnd, meetingStart];

  const [workStartInMinutes, workEndInMinutes, meetingStartInMinutes] = timings.map((timing) =>
    timing
      .split(':')
      .reduce(
        (hours, minutes) => parseInt(hours, 10) * 60 + parseInt(minutes, 10)
      )
  );

  const meetingEndInMinutes = meetingStartInMinutes + meetingDuration;

  return (workStartInMinutes <= meetingStartInMinutes) && (workEndInMinutes >= meetingEndInMinutes);
};

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

checkIfStringIsPalindrome('Лёша на полке клопа нашёл ');
checkIfStringIsPalindrome('Я не палиндром');

extractNumbersFromString('2023 год');
extractNumbersFromString('ECMAScript 2022');
extractNumbersFromString('1 кефир, 0.5 батона  ');
extractNumbersFromString('агент 007');
extractNumbersFromString('а я томат');
extractNumbersFromString(2023);
extractNumbersFromString(-1);
extractNumbersFromString(1.5);

isMeetingPossible('08:00', '17:30', '14:00', 90); // true
isMeetingPossible('8:0', '10:0', '8:0', 120); // true
isMeetingPossible('08:00', '14:30', '14:00', 90); // false
isMeetingPossible('14:00', '17:30', '08:0', 90); // false
isMeetingPossible('8:00', '17:30', '08:00', 900); // false
