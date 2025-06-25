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

const scaleControl = document.querySelector('.scale');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleImage = document.querySelector('.img-upload__preview > img');
const effectLevel = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectElements = document.querySelectorAll('.effects__radio');

let activeEffect = null;
let imgScale = ScaleValue.MAX;

function onScaleControlElementClick (evt) {
  if (evt.target.closest('.scale__control--smaller')) {
    imgScale = Math.max(ScaleValue.MIN, imgScale - ScaleValue.STEP);
  }
  if (evt.target.closest('.scale__control--bigger')) {
    imgScale = Math.min(ScaleValue.MAX, imgScale + ScaleValue.STEP);
  }
  scaleControlValue.value = `${imgScale}%`;
  scaleImage.style.transform = `scale(${imgScale / 100})`;
}

const initSlider = () => {
  sliderContainer.style.display = 'none';

  noUiSlider.create(sliderElement, {
    range: {
      min: SliderValue.MIN,
      max: SliderValue.MAX,
    },
    start: SliderValue.MAX,
    step: SliderValue.STEP,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(parseInt(value, 10) ? 0 : 1),
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

const resetSlider = () => {
  activeEffect = null;
  sliderContainer.style.display = 'none';
  scaleImage.style.filter = '';
};

function onEffectClick () {
  activeEffect = effects.find((effect) => effect.name === this.value);

  if (!activeEffect) {
    resetSlider();

    return;
  }

  sliderContainer.style.display = '';
  sliderElement.noUiSlider.updateOptions(activeEffect.options);
  scaleImage.style.filter = activeEffect.setFilter(activeEffect.options.start);
}

const resetImageEditor = () => {
  resetSlider();

  imgScale = ScaleValue.MAX;
  scaleImage.style.transform = '';
};

const initImageEditor = () => {
  initSlider();
  scaleControl.addEventListener('click', onScaleControlElementClick);
};

export { initImageEditor, resetImageEditor };
