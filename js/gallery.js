const bigPictureCommentsList = document.querySelector('.social__comments');
const COMMENTS_PORTION = 5;
const commentsCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
let commentsShown = 0;
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const createComment = ({avatar, message, name}) => {
  const comment = commentTemplate.cloneNode(true);
  const picture = comment.querySelector('.social__picture');
  picture.src = avatar;
  picture.alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};
const renderComments = (comments) => {
  commentsShown += COMMENTS_PORTION;
  if (commentsShown >= comments.length) {
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.classList.remove('hidden');
  }
  bigPictureCommentsList.innerHTML = '';
  comments.slice(0, commentsShown).forEach((comment) => bigPictureCommentsList.append(createComment(comment)));
  commentsCount.innerHTML = `${commentsShown} из ${comments.length}`;
};

commentLoader.addEventListener('click', renderComments);
export {renderComments};
