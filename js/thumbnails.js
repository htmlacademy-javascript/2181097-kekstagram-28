// Отобразить фотографии других пользователей.

// Заведите модуль, который будет отвечать за отрисовку миниатюр.

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Подключите модуль в проект.
import {generatedContent} from './data.js';
generatedContent();
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = ({comment, description, likes, url}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const picture = thumbnail.querySelector('.picture__img');
  picture.src = url;
  picture.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comment.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  return thumbnail;
};
const renderThumbnails = () => {
  generatedContent().forEach((picture) => container.append(createThumbnail(picture)));
};
export {renderThumbnails};
