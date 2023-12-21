const plusButton = document.querySelector('.scale__control--bigger');
const minusButton = document.querySelector('.scale__control--smaller');
const scaleControl = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const Zoom = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
};

const changeZoom = (factor = 1) => {
  let size = parseInt(scaleControl.value, 10) + Zoom.STEP * factor;
  size = Math.max(Zoom.MIN, Math.min(Zoom.MAX, size));

  scaleControl.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
};

const updateButtons = () => {
  scaleControl.value = `${100}%`;
  minusButton.addEventListener('click', () => changeZoom(-1));
  plusButton.addEventListener('click', () => changeZoom(1));
};

export { updateButtons };
