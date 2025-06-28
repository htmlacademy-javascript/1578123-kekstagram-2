const ScaleValue = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const SliderValue = {
  MIN: 0,
  MAX: 100,
  STEP: 1
};

const effects = [
  {
    name: 'chrome',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    setFilter: (value) => `grayscale(${value})`
  },
  {
    name: 'sepia',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    setFilter: (value) => `sepia(${value})`
  },
  {
    name: 'marvin',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    setFilter: (value) => `invert(${value}%)`
  },
  {
    name: 'phobos',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    setFilter: (value) => `blur(${value}px)`
  },
  {
    name: 'heat',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    setFilter: (value) => `brightness(${value})`
  }
];

const scaleControlElement = document.querySelector('.scale');
const scaleControlValue = scaleControlElement.querySelector('.scale__control--value');
const scaleImage = document.querySelector('.img-upload__preview > img');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevel = sliderContainerElement.querySelector('.effect-level__value');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');
const effectElements = document.querySelectorAll('.effects__radio');
const defaultEffectElement = document.querySelector('#effect-none');

let imgScale = ScaleValue.MAX;
let activeEffect;

const resetSlider = () => {
  activeEffect = null;
  sliderContainerElement.classList.add('visually-hidden');
  scaleImage.style.filter = '';
};

const onEffectClick = (evt) => {
  const effectElementValue = evt.target.value;

  if (effectElementValue === activeEffect?.name) {
    return;
  }

  activeEffect = effects.find((effectObject) => effectElementValue === effectObject.name);

  if (!activeEffect) {
    resetSlider();

    return;
  }

  sliderContainerElement.classList.remove('visually-hidden');
  sliderElement.noUiSlider.updateOptions(activeEffect.options);
  scaleImage.style.filter = activeEffect.setFilter(activeEffect.options.start);
};

const initSlider = () => {
  sliderContainerElement.classList.add('visually-hidden');

  noUiSlider.create(sliderElement, {
    range: {
      min: SliderValue.MIN,
      max: SliderValue.MAX,
    },
    start: SliderValue.MAX,
    step: SliderValue.STEP,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(Number.isInteger(value) ? 0 : 1),
      from: (value) => parseFloat(value)
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    if (activeEffect) {
      effectLevel.value = sliderElement.noUiSlider.get();
      scaleImage.style.filter = activeEffect.setFilter(effectLevel.value);
    }
  });

  effectElements.forEach((effectElement) => effectElement.addEventListener('click', onEffectClick));
};

const onScaleControlElementClick = (evt) => {
  if (evt.target.closest('.scale__control--smaller')) {
    imgScale = Math.max(ScaleValue.MIN, imgScale - ScaleValue.STEP);
  }
  if (evt.target.closest('.scale__control--bigger')) {
    imgScale = Math.min(ScaleValue.MAX, imgScale + ScaleValue.STEP);
  }

  scaleControlValue.value = `${imgScale}%`;
  scaleImage.style.transform = `scale(${imgScale / 100})`;
};

const resetImageEditor = () => {
  resetSlider();

  imgScale = ScaleValue.MAX;
  scaleControlValue.value = `${imgScale}%`;
  defaultEffectElement.checked = true;
  scaleImage.style.transform = '';
};

const initImageEditor = () => {
  initSlider();

  scaleControlElement.addEventListener('click', onScaleControlElementClick);
};

export { initImageEditor, resetImageEditor };
