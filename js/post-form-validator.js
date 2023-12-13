import { hashtagInput } from './post-form';

const MAX_DESC_LENGTH = 140;
const MAX_HASHTAGS = 5;
const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

const validHashtag = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(/\s+/);
  return !(hashtagsArray.find((item) => !hashtagRegex.test(item))) &&
        !(hashtagsArray.length > MAX_HASHTAGS) &&
        (new Set(hashtagsArray).size === hashtagsArray.length);
};

const getMessageOfHashtagError = () => {
  const hashtags = hashtagInput.value.toLowerCase().trim().split(/\s+/);
  if (hashtags.length > MAX_HASHTAGS) {
    return `Хэштегов должно быть не больше ${MAX_HASHTAGS}`;
  }
  if (hashtags.find((item) => !hashtagRegex.test(item))) {
    return 'Хэштег должен состоять из букв и чисел';
  }
  if (new Set(hashtags).size !== hashtags.length) {
    return 'Хэштеги не должны повторяться';
  }
};

const isDescValid = (value) => value.length < MAX_DESC_LENGTH;

const getMessageOfDescError = () =>`Длина комментария должна быть не больше ${MAX_DESC_LENGTH} символов`;

export { validHashtag, getMessageOfHashtagError, isDescValid, getMessageOfDescError};
