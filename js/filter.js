import { getLivePhoto } from './fetch.js';
import { renderPictures } from './thumbnails.js';

const filterElement = document.querySelector('.img-filters');
const photoes = document.querySelectorAll('.picture');
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
const showFilters = () => {
  filterElement.classList.remove('img-filters--inactive');
};
const removePhotoes = () => {
  const photoes = document.querySelectorAll('.picture');
  photoes.forEach((photo) => {
    photo.remove();
  });
};
const defaultFilter = document.getElementById(Filter.DEFAULT);
defaultFilter.addEventListener('click', () => {
  getLivePhoto()
    .then((res) => res.json())
    .then((content) => {
      removePhotoes();
      renderPictures(content);
    });
});
const randomFilter = document.getElementById(Filter.RANDOM);
randomFilter.addEventListener('click', () => {
  getLivePhoto()
    .then((res) => res.json())
    .then((content) => {
      const sortedRandom = content.sort(sortRandomly).slice(0, 10);
      removePhotoes();
      renderPictures(sortedRandom);
    });
});
const discussedFilter = document.getElementById(Filter.DISCUSSED);
discussedFilter.addEventListener('click', () => {
  getLivePhoto()
    .then((res) => res.json())
    .then((content) => {
      removePhotoes();
      content.sort((a, b) => b.comments.length - a.comments.length);
      renderPictures(content);
    });
});



let currentFilter = Filter.DEFAULT;
let pictures = [];
const sortRandomly = () => Math.random() - 0.5;
const sortByComments = (pictureA, pictureB) =>
pictureB.comments.length - pictureA.comments.length;

export {showFilters};
// После завершения загрузки изображений с сервера покажите блок .img-filters, убрав у него скрывающий класс.

// Добавьте обработчики изменения фильтров, которые будут управлять порядком отрисовки элементов на странице:

// По умолчанию — фотографии в изначальном порядке с сервера.
// Случайные — 10 случайных, не повторяющихся фотографий.
// Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
// При переключении фильтра все фотографии, отрисованные ранее, нужно убрать и вместо них показать те, которые подходят под новые условия.
//  фильтры:

// «По умолчанию» — фотографии в изначальном порядке с сервера;
// «Случайные» — 10 случайных, не повторяющихся фотографий;
// «Обсуждаемые» — фотографии, отсортированные в порядке убывания количества комментариев.
// 5.2. Блок, с помощью которого производится фильтрация фотографий, скрыт изначально и показывается только после получения от сервера данных об изображениях
// других пользователей.

// 5.3. При переключении фильтров, отрисовка изображений, подходящих под новый фильтр, должна производиться не чаще, чем один раз 500 мс (устранение дребезга).
// Воспользуйтесь приёмом «устранение дребезга», чтобы при переключении фильтра обновление списка элементов, подходящих под фильтры, происходило не чаще,
// чем один раз в полсекунды.
