import { renderComments } from './gallery.js';
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const BigPictureDescription = bigPicture.querySelector('.social__caption');

const showBigPicture = ({url, description, likes, comment}) => {
  bigPictureImg.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsCount.textContent = comment.length;
  BigPictureDescription.textContent = description;
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  renderComments(comment);
};
const closeButton = document.querySelector('.big-picture__cancel');
function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener ('keydown', onDocumentKeyDown);
}
function onDocumentKeyDown (evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}
closeButton.addEventListener('click', closeBigPicture);
export {showBigPicture};

