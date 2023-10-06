/* eslint-disable no-unused-vars */
function isFittingStringLength (str, length){
  return str.length  <= length;
}

function isPalindrome(str) {
  str = str.toLowerCase().replace(' ', '');
  const lastIndex = str.length - 1;
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[lastIndex - i]) {
      return false;
    }
  }
  return true;
}

function extractNumberRegular(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i]) && str[i] !== ' ') {
      result += str[i];
    }
  }
  return result === '' ? NaN : Number(result);
}

// магия реплейса
function extractNumberCool(str) {
  const result = str.replace(/\D/g, '');
  return result === '' ? NaN : Number(result);
}
