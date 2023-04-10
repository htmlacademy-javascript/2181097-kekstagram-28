const bigPictureCommentsList = document.querySelector('.social__comments');
const COMMENTS_PORTION = 5;
let commentsLength = 0;
const commentsCount = document.querySelector('.comments-count');
const commentsVisible = document.querySelector('.comments-shown');
const commentLoader = document.querySelector('.comments-loader');
let commentsShown = 0;
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const createComment = ({avatar, message, name}, visible) => {
  const comment = commentTemplate.cloneNode(true);
  const picture = comment.querySelector('.social__picture');
  picture.src = avatar;
  picture.alt = name;
  comment.querySelector('.social__text').textContent = message;
  if (!visible) {
    comment.classList.add('hidden');
  }
  return comment;
};
const showExtraComment = () => {
  const hiddenComments = Array.from(document.querySelectorAll('.social__comment.hidden'));
  hiddenComments.slice(0, COMMENTS_PORTION).forEach((item) => {
    item.classList.remove('hidden');
  });
  if (!(hiddenComments.length > COMMENTS_PORTION)) {
    commentLoader.classList.add('hidden');
  }
  commentsShown += COMMENTS_PORTION;
  commentsVisible.innerHTML = commentsShown < commentsLength ? commentsShown : commentsLength;
};
const renderComments = (comments) => {
  commentsShown += COMMENTS_PORTION;
  commentsLength = comments.length;
  if (commentsShown >= comments.length) {
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.classList.remove('hidden');
  }
  bigPictureCommentsList.innerHTML = '';
  comments.forEach((comment, index) => bigPictureCommentsList.append(createComment(comment, index < commentsShown)));
  commentsVisible.innerHTML = commentsShown < commentsLength ? commentsShown : commentsLength;
  commentsCount.innerHTML = comments.length;
};

commentLoader.addEventListener('click', showExtraComment);
export {renderComments};
