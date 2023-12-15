const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // eslint-disable-next-line no-use-before-define
  closeFormButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeByEsc);
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeFormButton.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeByEsc);

  uploadForm.reset();
};

function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    closeForm();
  }
}

uploadInput.addEventListener('change', openForm);

export {uploadForm, openForm};
