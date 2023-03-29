import {getRandomInteger, getRandomArrayElement} from './utils.js';
const IDS_COUNT = 25;
const AVATARS_COUNT= 6;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_COUNT = 20;
const DESCRIPTIONS = [
  'Тагииил!',
  'Самое вкусное хрючево',
  'Моя ласточка - летает быстрее сокола',
  'Теперь я видел все',
  'Ничто не вечно, ты тоже умрешь',
  'Самое красивое место',
  'Самый лучший день',
  'Carpe diem',
  'Баба Яга против',
  'И откроется на страшном суде, что смыслом жизни была любовь',
  'Подай ключ на 12',
  'Я тебя запомнила',
  'Какой сейчас год?',
  'Какого хрена, Тамара?',
  'Галя, у нас отмена!',
  'Валера, ты больной?',
  'Мы снова едем к маме',
  'Нельзя жалеть!',
  'Дети это радость',
  'Сын маминой подруги - моя шестерка',
  'Мамина радость, папина гордость',
  'Брат за брата - так за основу взято',
  'Любви достойна только мать',
  'Майонезик - лучшая еда',
  'Я люблю людей'
];
const COMMENTS = [
  'Всё отлично! В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Алиса', 'Сергей', 'Николай', 'Константин', 'Ольга', 'Федор'];

const createComment = (index) => ({
  id: index + 1,
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const createItem = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comment: Array.from({ length: getRandomInteger(0, COMMENTS_COUNT) }, (_,index) => createComment(index)),
});
const generatedContent = () => Array.from({length: IDS_COUNT}, (_, index) => createItem(index));

export {generatedContent};
