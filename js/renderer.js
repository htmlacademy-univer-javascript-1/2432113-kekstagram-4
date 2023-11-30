export const renderPictures = (pictures) => {
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureTemplate = document.querySelector('#picture').content.cloneNode(true);
    const pictureElement = pictureTemplate.querySelector('.picture__img');
    const commentsElement = pictureTemplate.querySelector('.picture__comments');
    const likesElement = pictureTemplate.querySelector('.picture__likes');

    pictureElement.src = picture.url;
    pictureElement.alt = picture.description;
    commentsElement.textContent = picture.comments.length;
    likesElement.textContent = picture.likes;

    fragment.appendChild(pictureTemplate);
  });

  picturesContainer.appendChild(fragment);
};
