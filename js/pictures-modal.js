import { isEcsape } from './utils.js';

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

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  commentElement.innerHTML = `
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;
  return commentElement;
};

const updateCommentCount = () => {
  const shownCommentsCount = socialComments.children.length;
  socialCommentCount.textContent = `${shownCommentsCount} из ${commentsCount.textContent} комментариев`;
};

const displayComments = (comments) => {
  const remainingComments = comments.length - currentCommentsIndex;
  const chunkSize = Math.min(remainingComments, COMMENTS_CHUNK_SIZE);

  const chunk = comments.slice(currentCommentsIndex, currentCommentsIndex + chunkSize);
  currentCommentsIndex += chunkSize;

  chunk.forEach((comment) => {
    socialComments.appendChild(createCommentElement(comment));
  });

  updateCommentCount();

  if (currentCommentsIndex >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const showCommentsChunk = () => {
  displayComments(currentPicture.comments);
};

const onLoadMoreComments = () => {
  showCommentsChunk();
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
  currentCommentsIndex = 0;
};
const initCommentsLoader = (picture) => {
  if (picture.comments.length > COMMENTS_CHUNK_SIZE) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onLoadMoreComments);
  }
};

const openModal = (picture) => {
  currentPicture = picture;

  imgContainer.querySelector('img').src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;

  currentCommentsIndex = 0;
  socialComments.innerHTML = '';

  showCommentsChunk(picture.comments);

  socialCommentCount.classList.remove('hidden');

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onEscPress);
  bigPicture.querySelector('#picture-cancel').addEventListener('click', closeModal);

  initCommentsLoader(picture);
};

function onEscPress(evt) {
  if (isEcsape(evt)) {
    closeModal();
  }
}

export { openModal };
