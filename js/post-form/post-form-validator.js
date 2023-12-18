import {uploadForm} from './post-form.js';

const MAX_DESC_LENGTH = 140;
const MAX_HASHTAGS = 5;
const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descInput = uploadForm.querySelector('.text__description');
const submitButton = document.querySelector('#upload-submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error'
}, true);

const isValidHashtag = (value) => {
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
    return 'Хэштег должен состоять из букв и чисел, длина которого меньше 20';
  }
  if (new Set(hashtags).size !== hashtags.length) {
    return 'Хэштеги не должны повторяться';
  }

};

const validateInput = () =>{
  if(pristine.validate()){
    submitButton.disabled = false;
  }
  else{
    submitButton.disabled = true;
  }
};

pristine.addValidator(hashtagInput, isValidHashtag, getMessageOfHashtagError);

const isDescValid = (value) => value.length < MAX_DESC_LENGTH;

pristine.addValidator(descInput, isDescValid, `Длина комментария должна быть не больше ${MAX_DESC_LENGTH} символов`);

hashtagInput.addEventListener('input', validateInput);
descInput.addEventListener('input', validateInput);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
