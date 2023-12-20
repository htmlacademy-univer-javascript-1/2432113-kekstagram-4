const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
import {updateRadios, resetEffects } from './post-form-effects.js';
import { updateButtons } from './post-form-size-manager.js';
import { uploadData } from './post-form-api.js';
import { onSuccessfulSubmit, onFailedSubmit } from './post-form-submit.js';

const onFormUploadSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  uploadData(onSuccessfulSubmit, onFailedSubmit, 'POST', formData);
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeFormButton.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeByEsc);
  uploadForm.removeEventListener('submit', onFormUploadSubmit);
  resetEffects();
  uploadForm.reset();
};

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');


  closeFormButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeByEsc);
  uploadForm.addEventListener('submit', onFormUploadSubmit);
};

const onFormOpening = () =>
{
  openForm();
  updateRadios();
  updateButtons();
};

function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
}

uploadInput.addEventListener('change', onFormOpening);

export {uploadForm, openForm, closeForm};
