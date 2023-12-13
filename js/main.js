import { createPostsArray } from './data.js';
import { renderPictures } from './renderer.js';
import { openModal } from './pictures-modal.js';
import './post-form.js';

const posts = createPostsArray();
renderPictures(posts);
const pictureElements = document.querySelectorAll('.picture');

pictureElements.forEach((pictureElement, index) => {
  pictureElement.addEventListener('click', () => {
    openModal(posts[index]);
  });
});
