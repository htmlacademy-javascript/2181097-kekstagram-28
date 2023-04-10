import { isEscapeKey } from './utils.js';
import { sendData } from './fetch.js';

const pictureLoader = document.querySelector('#upload-file');
const closeLoader = document.querySelector('#upload-cancel');
const showLoader = document.querySelector('.img-upload__overlay');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleDefinition = document.querySelector('.scale__control--value');
const uploadForm = document.querySelector('.img-upload__form');
const successMessage = document.querySelector('#success');
const failureMessage = document.querySelector('#error');
const loadingMessage = document.querySelector('#messages');
const scaleStep = 25;
const minScale = 25;
const maxScale = 100;
const scaleDefault = 100;
const photoPreview = document.querySelector('.img-upload__preview img');
const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const sliderDefaultValue = 100;
const sliderContainer = document.querySelector('.effect-level');
const slider = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const imgUploadSubmit = document.querySelector('.img-upload__submit');

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

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;


const scaleIconChange = (value) => {
  photoPreview.style.transform = `scale(${value / 100})`;
  scaleDefinition.value = `${value}%`;
};

const loaderModal = () => {
  showLoader.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleIconChange(scaleDefault);
};

pictureLoader.addEventListener('change', loaderModal);
const onSmallerClick = () => {
  const currentValue = parseInt(scaleDefinition.value, 10);
  let newValue = currentValue - scaleStep;
  if (newValue < minScale) {
    newValue = minScale;
  }
  scaleIconChange(newValue);
};

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

const closerModal = () => {
  showLoader.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener ('keydown', onDocumentKeyDown);
  function onDocumentKeyDown (evt) {
    if (evt.key === 'Escape') {
      closerModal();
    }
  }
};

closeLoader.addEventListener('click', closerModal);

const isDefault = () => chosenEffect === DEFAULT_EFFECT;
const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};
const showSlider = () => {
  sliderContainer.classList.remove('hidden');
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

const resetScale = () => {
  scaleIconChange(scaleDefault);
};

const changeEffect = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  const currentEffect = evt.target.value;
  chosenEffect = EFFECTS.find((effect) => effect.name === currentEffect);
  photoPreview.className = `effects__preview--${chosenEffect.name}`;
  sliderValue.value = sliderDefaultValue;
  updateSlider();
  if (currentEffect === 'marvin') {
    photoPreview.style.filter = 'invert(100%)';
    sliderValue.value = sliderDefaultValue;
    slider.noUiSlider.on('update', () => {
      sliderValue.value = slider.noUiSlider.get();
      photoPreview.style.filter = `invert(${sliderValue.value}%)`;
    });
  }

  if (currentEffect === 'chrome') {
    photoPreview.style.filter = 'grayscale(1)';
    sliderValue.value = sliderDefaultValue;
    slider.noUiSlider.on('update', () => {
      sliderValue.value = slider.noUiSlider.get();
      photoPreview.style.filter = `grayscale(${sliderValue.value})`;
    });
  }

  if (currentEffect === 'sepia') {
    photoPreview.style.filter = 'sepia(1)';
    sliderValue.value = sliderDefaultValue;
    slider.noUiSlider.on('update', () => {
      sliderValue.value = slider.noUiSlider.get();
      photoPreview.style.filter = `sepia(${sliderValue.value})`;
    });
  }

  if (currentEffect === 'phobos') {
    photoPreview.style.filter = 'blur(3px)';
    sliderValue.value = sliderDefaultValue;
    slider.noUiSlider.on('update', () => {
      sliderValue.value = slider.noUiSlider.get();
      photoPreview.style.filter = `blur(${sliderValue.value}px)`;
    });
  }

  if (currentEffect === 'heat') {
    photoPreview.style.filter = 'brightness(3)';
    sliderValue.value = sliderDefaultValue;
    slider.noUiSlider.on('update', () => {
      sliderValue.value = slider.noUiSlider.get();
      photoPreview.style.filter = `brightness(${sliderValue.value})`;
    });
  }

  if (currentEffect === 'none') {
    photoPreview.style.filter = '';
    sliderValue.value = '';
  }
};

effectsList.addEventListener('change', changeEffect);
hideSlider();

noUiSlider.create(slider, {
  range: {
    'min': DEFAULT_EFFECT.min,
    'max': DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.max,
  connect: 'lower',
});

slider.noUiSlider.on('update', () => {
  sliderValue.value = slider.noUiSlider.get();
});


// подключает Пристин
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const validateHashtag = (value) => {

  const validateHashtagLength = () => {
    const arrHashtags = value.trim().split(' ');
    if(arrHashtags.length > 5){
      return false;
    }
    return true;
  };

  const validateHashtagExp = () => {
    const regexpForHashtag = (/^#[a-zа-яё0-9]{1,19}$/i);
    const arrHashtags = value.trim().split(' ');
    for(let i = 0; i < arrHashtags.length; i++){
      if(!regexpForHashtag.test(arrHashtags[i])){
        return false;
      }
    }
    return true;
  };

  const validateHashtagDublicate = () => {
    const arrHashtags = value.trim().split(' ');
    function hasDuplicates() {
      return new Set(arrHashtags).size !== arrHashtags.length;
    }

    if (hasDuplicates(arrHashtags)) {
      return false;
    }else {
      return true;
    }
  };

  if(validateHashtagLength(value) && validateHashtagExp(value) && validateHashtagDublicate(value)){
    imgUploadSubmit.disabled = false;
    return true;
  }else if (value.length === 0){
    imgUploadSubmit.disabled = false;
    return true;
  }else{
    imgUploadSubmit.disabled = true;
    return false;
  }
};
pristine.addValidator(hashtagField,validateHashtag,'Должен начинаться с символа #, содержать более 1 менее 20 символов или чисел,должно быть указанно максимум 5 хэштегов, один и тот же хэш-тег не может быть использован дважды.');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgEditForm();
  }
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

function openImgEditForm () {
  showLoader.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  const file = pictureLoader.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    photoPreview.src = URL.createObjectURL(file);
  }
}
function closeImgEditForm () {
  showLoader.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetScale();
  form.reset();
  pristine.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
}
function addRemovingListener () {
  document.removeEventListener('keydown', onDocumentKeydown);
}
function addAddingListenter () {
  document.addEventListener('keydown', onDocumentKeydown);
}
hashtagField.addEventListener('focus',addRemovingListener);
commentField.addEventListener('focus',addRemovingListener);
hashtagField.addEventListener('blur',addAddingListenter);
commentField.addEventListener('blur',addAddingListenter);
pictureLoader.addEventListener('change',openImgEditForm);
closeLoader.addEventListener('click',closeImgEditForm);
const hideMessage = (evt) => {
  if (isEscapeKey(evt)) {
    const success = document.querySelector('.success');
    const error = document.querySelector('.error');
    if (success) {
      success.remove();
    }
    if (error) {
      error.remove();
    }
    document.removeEventListener('keydown', hideMessage);
  }
};
const showLoadingMessage = () => {
  const loading = loadingMessage.content.cloneNode(true);
  document.body.append(loading);
};
const removeLoadingMessage = () => {
  const loading = document.querySelector('.img-upload__message--loading');
  loading.remove();
};
const removeSuccessMessage = () => {
  const success = document.querySelector('.success');
  success.remove();
};
const showSuccessMessage = () => {
  const success = successMessage.content.cloneNode(true);
  const closeSuccessButton = success.querySelector('.success__button');
  closeSuccessButton.addEventListener('click', removeSuccessMessage);
  document.addEventListener('keydown', hideMessage);
  document.body.append(success);
};

const removeErrorMessage = () => {
  const error = document.querySelector('.error');
  error.remove();
};
const showErrorMessage = () => {
  const error = failureMessage.content.cloneNode(true);
  const closeErrorButton = error.querySelector('.error__button');
  closeErrorButton.addEventListener('click', removeErrorMessage);
  document.addEventListener('keydown', hideMessage);
  document.body.append(error);
};
const onSubmitForm = (evt) => {
  evt.preventDefault();
  showLoadingMessage();
  const body = new FormData(evt.target);
  sendData(body)
    .then((response) => {
      removeLoadingMessage();
      if (!response.ok) {
        showErrorMessage();
        return;
      }
      showSuccessMessage();
      return response.json();
    })
    .catch((error) => {
      showErrorMessage(error);
    });
};
uploadForm.addEventListener('submit', onSubmitForm);
