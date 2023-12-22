import { debounce } from './utils.js';
import { postsToFilter } from './main.js';
import { renderPictures, removePictures } from './pictures-renderer.js';

const RANDOM_PICTURES_AMOUNT = 10;

const filtersForm = document.querySelector('.img-filters__form');
let activeButton = document.querySelector('.img-filters__button--active');

const filters = {
  'filter-default': () => [...postsToFilter],
  'filter-random': () => [...postsToFilter].sort(() => Math.random() - 0.5).slice(0, RANDOM_PICTURES_AMOUNT),
  'filter-discussed': () => [...postsToFilter].sort((first, second) => second.comments.length - first.comments.length),
};

const applyFilters = (id) => {
  removePictures();
  renderPictures(filters[id]());
};

const onFilterOptionClick = debounce((evt) => {
  evt.preventDefault();
  if (evt.target.type === 'button') {
    applyFilters(evt.target.id);
    activeButton.classList.remove('img-filters__button--active');
    activeButton = evt.target;
    activeButton.classList.add('img-filters__button--active');
  }
});

const initFilters = () => {
  filtersForm.addEventListener('click', onFilterOptionClick);
};

export { initFilters };
