import { closeForm } from './post-form.js';

const body = document.body;
const successMessageTemplate = document.querySelector('#success').content.querySelector('section');
const errorMessageTemplate = body.querySelector('#error').content.querySelector('section');

const onBodyClick = (evt) => {
  const clickElem = evt.target;

  if (clickElem.classList.contains('success__inner') || clickElem.classList.contains('error__inner')) {
    return;
  }
  closeMessage();
};

const onBodyKeyDown = (evt) => {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    closeMessage();
  }
};

function closeMessage(){
  body.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onBodyKeyDown);
  body.removeChild(body.lastChild);
}

const showMessage = (messageTemplate) => {
  const message = messageTemplate.cloneNode(true);
  message.style.zIndex = 100;

  document.addEventListener('keydown', onBodyKeyDown);
  body.addEventListener('click', onBodyClick);

  body.appendChild(message);
};

const onSuccessfulSubmit = () => {
  closeForm();
  showMessage(successMessageTemplate);
};

const onFailedSubmit = () => {
  showMessage(errorMessageTemplate);
};

export { onSuccessfulSubmit, onFailedSubmit };
