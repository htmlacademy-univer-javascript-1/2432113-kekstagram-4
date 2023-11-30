/* eslint-disable no-use-before-define */
// picture-modal.js

const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const imgContainer = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

export const openModal = (picture) => {
  imgContainer.querySelector('img').src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;

  socialComments.innerHTML = '';

  picture.comments.forEach((comment) => {
    const commentTemplate = document.createElement('li');
    commentTemplate.classList.add('social__comment');
    commentTemplate.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    socialComments.appendChild(commentTemplate);
  });

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onEscPress);
  bigPicture.querySelector('#picture-cancel').addEventListener('click', closeModal);
};

const closeModal = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onEscPress);
  bigPicture.querySelector('#picture-cancel').removeEventListener('click', closeModal);
};

const onEscPress = (evt) => {
  if (evt.key === 'Escape') {
    closeModal();
  }
};
