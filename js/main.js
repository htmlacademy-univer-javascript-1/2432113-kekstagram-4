//import { createPostsArray } from './data.js';
import { loadData } from './post-form/post-form-api.js';
import { renderPictures } from './renderer.js';
import './post-form/post-form.js';
import './post-form/post-form-validator.js';
let posts = [];
//const posts = createPostsArray();

const onSuccess = (data) => {
  posts = data.slice();
  renderPictures(posts);
};

const onFail = () =>{
  const errorMesage = document.createElement('div');
  errorMesage.style.position = 'absolute';
  errorMesage.style.left = 0;
  errorMesage.style.top = 0;
  errorMesage.style.right = 0;

  errorMesage.style.fontSize = '20px';
  errorMesage.style.backgroundColor = '#e1375f';
  errorMesage.style.padding = '15px';

  errorMesage.style.textAlign = 'center';
  errorMesage.textContent = 'Ошибка при загрузке изображений';
  document.body.append(errorMesage);
};


loadData(onSuccess, onFail);
