const pictureLoader = document.querySelector('#upload-file');
const closeLoader = document.querySelector('#upload-cancel');
const showLoader = document.querySelector('.img-upload__overlay');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleDefinition = document.querySelector('.scale__control--value');
const scaleStep = 25;
const minScale = 25;
const maxScale = 100;
const scaleDefault = 100;
const photoPreview = document.querySelector('.img-upload__preview img');
// изменение значения на шкале визуально
const scaleIconChange = (value) => {
  photoPreview.style.transform = `scale(${value / 100})`;
  scaleDefinition.value = `${value}%`;
};
// открытие модалки
const loaderModal = () => {
  showLoader.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleIconChange(scaleDefault);
};
// обработка открытия окна загрузки
pictureLoader.addEventListener('change', loaderModal);
// обработка нажатия -
scaleSmaller.addEventListener('click', scaleSmaller);
// обработка нажатия +
scaleBigger.addEventListener('click', scaleBigger);
// обработка кнопки -
const onSmallerClick = () => {
  const currentValue = parseInt(scaleDefinition.value, 10);
  let newValue = currentValue - scaleStep;
  if (newValue < minScale) {
    newValue = minScale;
  }
  scaleIconChange(newValue);
};
// обработка кнопки +
const onBiggerClick = () => {
  const currentValue = parseInt(scaleDefinition.value, 10);
  let newValue = currentValue + scaleStep;
  if (newValue > maxScale) {
    newValue = maxScale;
  }
  scaleIconChange(newValue);
};
scaleSmaller.addEventListener('click', onSmallerClick);
scaleBigger.addEventListener('click', onBiggerClick);
// закрытие окна загрузки
// закрытие по кнопке
const closerModal = () => {
  showLoader.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // закрытие по клавише
  document.removeEventListener ('keydown', onDocumentKeyDown);
  function onDocumentKeyDown (evt) {
    if (evt.key === 'Escape') {
      closeOnEscape();
    }
  }
};

closeLoader.addEventListener('click', closerModal);


const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: '',
  },

  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const sliderDefaultValue = 100;
const sliderToggle = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const slider = document.querySelector('.effect-level__slider');

const DEFAUL_EFFECT = EFFECTS[0];
let chosenEffect = DEFAUL_EFFECT;
const isDefault = () => chosenEffect === DEFAUL_EFFECT;
const hideSlider = () => {
  slider.classList.add('hidden');
};
const showSlider = () => {
  slider.classList.remove('hidden');
};

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
    connect: 'lower',
  });
  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const changeEffect = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  };
  const currentEffect = evt.target.value;
  chosenEffect = EFFECTS.find((effect) => effect.name === currentEffect);
  photoPreview.className = `effects__preview--${chosenEffect.name}`;
  sliderToggle.value = sliderDefaultValue;
  updateSlider();
  if (currentEffect === 'marvin') {
    photoPreview.style.filter = 'invert(100%)';
    sliderToggle.value = `${sliderDefaultValue}%`;
  }
  if (currentEffect === 'chrome') {
    photoPreview.style.filter = 'grayscale(1)';
    sliderToggle.value = `${sliderDefaultValue / 100}`;
  }
  if (currentEffect === 'sepia') {
    photoPreview.style.filter = 'sepia(1)';
    sliderToggle.value = `${sliderDefaultValue / 100}%`;
  }
  if (currentEffect === 'phobos') {
    photoPreview.style.filter = 'blur(3px)';
    sliderToggle.value = `${sliderDefaultValue / 100 * 3}px`;
  }
  if (currentEffect === 'heat') {
    photoPreview.style.filter = 'brightness(3)';
    sliderToggle.value = `${sliderDefaultValue / 100 * 3}`;
  }
  if (currentEffect === 'none') {
    photoPreview.style.filter = '';
    sliderToggle.value = '';
  }
};

effectsList.addEventListener('change', changeEffect);

noUiSlider.create(slider, {
  range: {
    'min': EFFECTS[0].min,
    'max': EFFECTS[0].max,
  },
  step: EFFECTS[0].step,
  start: EFFECTS[0].max,
  connect: 'lower',
});






// const VALID_SYMBOLS = /^[a-zа-яё0-9]{1,19}$/i;
// const MAX_HASHTAG_COUNT = 5;
// const TAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';
// const form = document.querySelector('.img-uplosd__form');
// const hashtagField = document.querySelector('.text__hashtags');
// const commentField = document.querySelector('.text__description');
// // подключает Пристин
// const pristine = new Pristine(form, {
//   classTo: 'img-upload__field-wrapper',
//   errorTextParent: 'img-upload__field-wrapper',
//   errorTextClass: 'img-upload__field-wrapper__error',
// });
// // проверяет хэштэги на уникальность
// // разобрать механику
// const uniqueTags = (tags) => {
//   const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
//   // разобрать сет
//   return lowerCaseTags.length === new Set(lowerCaseTags).size;
// };
// const isValidTag = (tag) => VALID_SYMBOLS.test(tag);
// const validateTags = (value) => {
//   const tags = value
//   .trin(),
//   .split(' '),
//  // разобрать
//   .filter((tag) => tag.trin().length);
//   return validateTags && uniqueTags && tags.every(isValidTag);
// };
//  // разобрать
//  pristine.addValidator(
//   hashtagField,
//   validateTags,
//   TAG_ERROR_TEXT
//  );
//  const onFormSubmit = (evt) => {
//   evt.preventDefault();
//   const isValid = pristine.validate();
// // дописать функции в проверку
//   if (isValid) {
//     blockSubmitButton();
//     await CSSLayerBlockRule(new FormData(form));
//     unblockSubmitButton();
//   }
//  };
// const isTextFieldFocused = () => {
//   document.activeElement === hashtagField ||
//   document.activeElement === commentField;
// };
// const onDocumentKeyDown(evt) {
//   if (evt.key === 'Escape') && !isTextFieldFocused() {
//     evt.preventDefault();
//     closerModal();
//   }
// };
// // отменяет обработчик Escape при фокусе
// // разобрать
// commentField.addEventListener('keydown', (evt) => {
//   if (evt.key === 'Escape') {
//     evt.stopPropagation();
//   }
// });
// // контейнерп для вывода хэштэгов .social__caption


// Если хотя бы один из тегов не проходит нужных проверок, показывать сообщение об ошибке.(строка через 3 значения с испольтзованием &&
// нельзя указать больше пяти хэш-тегов;(ВАЛИДАЦИЯ В ПРИСТИН?????)проверить длину массива до 5 длина setа
// если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения
// (снимать листенер с кнопки esc при фокусе на инпуте и добавлять при блюре) через состояния актив на элементе)
// Как отменить обработчик Esc при фокусе?
// Задача не имеет одного верного решения, однако намекнём на самый простой — использовать stopPropagation для события нажатия клавиш в поле при фокусе.

//КОММЕНТАРИЙ
// Как отменить обработчик Esc при фокусе?
// Задача не имеет одного верного решения, однако намекнём на самый простой — использовать stopPropagation для события нажатия клавиш в поле при фокусе.
// (тоже через чочтояние акитив на элементе
// Реализуйте логику проверки так, чтобы, как минимум, она срабатывала при попытке отправить форму и не давала этого сделать,
// если форма заполнена не по правилам.(ПРИСТИН?????)
//  При желании, реализуйте проверки сразу при вводе значения в поле.(ШТОАА?)
