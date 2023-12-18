const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
import {updateRadios, resetFilters } from './post-form-effects.js';
import { updateButtons } from './post-form-size-manager.js';

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeFormButton.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeByEsc);
  resetFilters();
  uploadForm.reset();
};

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');


  closeFormButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeByEsc);
};

const onFormOpening = () =>
{
  openForm();
  updateRadios();
  updateButtons();
};

function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    closeForm();
  }
}

uploadInput.addEventListener('change', onFormOpening);

export {uploadForm, openForm};
