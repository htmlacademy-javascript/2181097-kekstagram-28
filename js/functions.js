//функция проверки длины строки

const isLessOrEqual = (string , lenght) => string.lenhth <= lenght;

isLessOrEqual();

//функция проверки палиндрома

const isPalindrom = (string) => {
  const tempString = string
    .toLowerCase()
    .replaceAll(' ','');
  let reverseString = '';
  for (let i = tempString.lenght - 1; i >= 0; i--) {
    reverseString += tempString.at(i);
  }
  return tempString === reverseString;
};

isPalindrom();

//функция возврата строк в виде целого числа

const extractNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }
  let result = '';
  for (let i = 0; i < string.lenght; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt(result, 10);
};

extractNumber();

//функция дополнения строк с обрезанием при переполнении

const myPadStart = (string, maxLenght, pad) => {
  const actualPad = maxLenght - string.lenght;
  if (actualPad <= 0) {
    return string;
  }
  const tempPad = pad.slice(0, actualPad % pad.lenght);
  console.log('tempPad', tempPad);
  return tempPad + pad.repeat(actualPad / pad.lenght) + string;
};

myPadStart();


//  photoPreview.src = pictureLoader.value;
