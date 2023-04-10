import {getLivePhoto} from './fetch.js';
import { showBigPicture } from './big-picture.js';
import { showFilters } from './filter.js';
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = ({id, comments, description, likes, url}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const picture = thumbnail.querySelector('.picture__img');
  picture.src = url;
  picture.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  picture.dataset.thumbnailId = id;
  return thumbnail;
};
const renderPictures = (pictures) => {
  pictures.forEach((picture) => container.append(createThumbnail(picture)));
};
const renderThumbnails = () => {
  getLivePhoto()
    .then((res) => res.json())
    .then((content) => {
      renderPictures(content);
      container.addEventListener('click', (evt) => {
        const thumbnailId = evt.target.dataset.thumbnailId;
        if (!thumbnailId) {
          return;
        }
        evt.preventDefault();
        const dataId = content.find(({id}) => +thumbnailId === id);
        showBigPicture(dataId);
      });
      showFilters();
    });
};
export {renderThumbnails, renderPictures};

