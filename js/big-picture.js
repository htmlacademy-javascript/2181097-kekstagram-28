const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const BigPictureDescription = bigPicture.querySelector('.social__caption');
bigPictureCommentsList.innerHTML = '';
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const createComment = ({avatar, message, name}) => {
  const comment = commentTemplate.cloneNode(true);
  const picture = comment.querySelector('.social__picture');
  picture.src = avatar;
  picture.alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const showBigPicture = ({url, description, likes, comment}) => {
  bigPictureImg.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsCount.textContent = comment.length;
  BigPictureDescription.textContent = description;
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  comment.forEach((item) => bigPictureCommentsList.append(createComment(item)));
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
};
const closeButton = document.querySelector('.big-picture__cancel');
const closeBigPicture = closeButton.addEventListener('click',() => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

export {showBigPicture};
//код отображает окно модалки (удаляет класс hidden у элемента с классом .big-picture и заполняет его данными о конкретной фотографии)
//адрес изображения url подставить как src изображения внутри  блока .big-picture__img
// Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
// Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.
// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments.
//Описание фотографии description вставьте строкой в блок .social__caption.

//код после открытия окна прячет блоки счетчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавляя им класс hidden
//код После открытия окна добавляет тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле.
//код При закрытии окна удаляет класс modal-open
//код закрывает модалку по нажатию клавиши Esc
//код закрывает модалку по клику на иконку закрытия
//подключить модуль в проект
