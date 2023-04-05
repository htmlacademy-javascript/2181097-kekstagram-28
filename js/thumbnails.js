import {generatedContent} from './data.js';
import { showBigPicture } from './big-picture.js';
const content = generatedContent();
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = ({id, comment, description, likes, url}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const picture = thumbnail.querySelector('.picture__img');
  picture.src = url;
  picture.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comment.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  picture.dataset.thumbnailId = id;
  return thumbnail;
};
const renderThumbnails = () => {
  content.forEach((picture) => container.append(createThumbnail(picture)));
  container.addEventListener('click', (evt) => {
    const thumbnailId = evt.target.dataset.thumbnailId;
    const dataId = content.find(({id}) => +thumbnailId === id);
    showBigPicture(dataId);
  });
};
export {renderThumbnails};
