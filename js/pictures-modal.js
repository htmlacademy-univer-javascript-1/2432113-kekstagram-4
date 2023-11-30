/* eslint-disable no-use-before-define */

const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const imgContainer = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const COMMENTS_CHUNK_SIZE = 5;
let currentCommentsIndex = 0;
let currentPicture;

const openModal = (picture) => {
  currentPicture = picture;

  imgContainer.querySelector('img').src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;

  currentCommentsIndex = 0;
  showCommentsChunk(picture.comments);

  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onEscPress);
  bigPicture.querySelector('#picture-cancel').addEventListener('click', closeModal);
  commentsLoader.addEventListener('click', onLoadMoreComments);
};

const showCommentsChunk = (comments) => {
  const chunk = comments.slice(currentCommentsIndex, currentCommentsIndex + COMMENTS_CHUNK_SIZE);
  currentCommentsIndex += COMMENTS_CHUNK_SIZE;

  chunk.forEach((comment) => {
    const commentTemplate = document.createElement('li');
    commentTemplate.classList.add('social__comment');
    commentTemplate.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    socialComments.appendChild(commentTemplate);
  });

  updateCommentCount();
};

const updateCommentCount = () => {
  const shownCommentsCount = socialComments.querySelectorAll('.social__comment').length;
  socialCommentCount.textContent = `${shownCommentsCount} из ${commentsCount.textContent} комментариев`;
};

const onLoadMoreComments = () => {
  const remainingComments = currentPicture.comments.length - currentCommentsIndex;
  if (remainingComments > 0) {
    showCommentsChunk(currentPicture.comments);
  } else {
    commentsLoader.classList.add('hidden');
  }
};

const closeModal = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onEscPress);
  bigPicture.querySelector('#picture-cancel').removeEventListener('click', closeModal);
  commentsLoader.removeEventListener('click', onLoadMoreComments);

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  socialComments.innerHTML = '';
};

const onEscPress = (evt) => {
  if (evt.key === 'Escape') {
    closeModal();
  }
};

export { openModal };
