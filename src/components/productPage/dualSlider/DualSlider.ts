import { RangeSliderTypes } from './types';
import { fillLine, getNumbersValues, setZIndex } from './utils';

export class DualSlider {
  priceSlider: HTMLDivElement;
  quantitySlider: HTMLDivElement;
  private priceFrom: number;
  private quantityFrom: number;
  private priceTo: number;
  private quantityTo: number;
  private sliderValues: {
    [key: string]: {
      from: number;
      to: number;
    };
  };

  constructor() {
    this.priceSlider = this.createSlider('price', 'slider-price');
    this.quantitySlider = this.createSlider('quantity', 'slider-quantity');
    this.priceFrom = 0;
    this.priceTo = 900;
    this.quantityFrom = 0;
    this.quantityTo = 150;
    this.sliderValues = {
      price: {
        from: 0,
        to: 900,
      },
      quantity: {
        from: 0,
        to: 150,
      },
    };
  }

  handleChangeInput(
    callback: (min: number, max: number) => void,
    callbackQuantity: (min: number, max: number) => void
  ) {
    this.priceSlider.addEventListener('change', () => {
      callback(this.sliderValues.price.from, this.sliderValues.price.to);
    });
    this.quantitySlider.addEventListener('change', () => {
      callbackQuantity(
        this.sliderValues.quantity.from,
        this.sliderValues.quantity.to
      );
    });
  }

  private createSlider(
    dataType: RangeSliderTypes,
    className: string
  ): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('slider');
    container.classList.add(className);

    const controlsBox = document.createElement('div');
    controlsBox.classList.add('slider__controls');

    let min = 0;
    const priceMax = 900;
    const quantityMax = 150;

    let fromSlider: HTMLInputElement;
    let toSlider: HTMLInputElement;

    let max = priceMax;

    if (dataType === 'quantity') {
      max = quantityMax;

      fromSlider = this.createRangeInput(
        'quantity',
        'slider__slider-from',
        min,
        max
      );
      fromSlider.value = min.toString();
      toSlider = this.createRangeInput(
        'quantity',
        'slider__slider-to',
        min,
        max
      );
      toSlider.value = max.toString();
    } else {
      fromSlider = this.createRangeInput(
        'price',
        'slider__slider-from',
        min,
        max
      );
      fromSlider.value = min.toString();
      toSlider = this.createRangeInput('price', 'slider__slider-to', min, max);
      toSlider.value = max.toString();
    }

    fromSlider.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      let fromInput = document.querySelector(
        `.num-controls__times-input_from[data-input-type='price']`
      ) as HTMLInputElement;
      let fromSlider = document.querySelector(
        `.slider__slider-from[data-type='price']`
      ) as HTMLInputElement;

      if (target.dataset.type === 'quantity') {
        fromInput = document.querySelector(
          `.num-controls__times-input_from[data-input-type='quantity']`
        ) as HTMLInputElement;
        fromSlider = document.querySelector(
          `.slider__slider-from[data-type='quantity']`
        ) as HTMLInputElement;
      }

      const [from, to] = getNumbersValues(fromSlider, toSlider);
      this.sliderValues[target.dataset.type as string].from = from;

      fillLine(fromSlider, toSlider, toSlider);
      if (from > to) {
        fromSlider.value = to.toString();
        fromInput.value = to.toString();
      } else {
        fromInput.value = from.toString();
      }
    });

    toSlider.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      let fromSlider = document.querySelector(
        '.slider__slider-from[data-type="price"]'
      ) as HTMLInputElement;

      let toInput = document.querySelector(
        '.num-controls__times-input_to[data-input-type="price"]'
      ) as HTMLInputElement;

      if (target.dataset.type === 'quantity') {
        fromSlider = document.querySelector(
          '.slider__slider-from[data-type="quantity"]'
        ) as HTMLInputElement;

        toInput = document.querySelector(
          '.num-controls__times-input_to[data-input-type="quantity"]'
        ) as HTMLInputElement;
      }

      const [from, to] = getNumbersValues(fromSlider, target);

      this.sliderValues[target.dataset.type as string].to = to;

      const type = target.dataset.type;

      fillLine(fromSlider, target, target);

      if (type) {
        setZIndex(target, type);
      }

      if (from <= to) {
        toSlider.value = to.toString();
        toInput.value = to.toString();
      } else {
        toInput.value = from.toString();
        toSlider.value = from.toString();
      }
    });

    controlsBox.append(fromSlider, toSlider);

    const numbersControlsBox = document.createElement('div');
    numbersControlsBox.classList.add('num-controls');

    const inputBoxMin = this.createInputContainer(dataType, 'min', 'from');
    const inputBoxMax = this.createInputContainer(dataType, 'max', 'to');

    const line = document.createElement('p');
    line.innerHTML = '—';

    numbersControlsBox.append(inputBoxMin, line, inputBoxMax);

    container.append(numbersControlsBox, controlsBox);
    return container;
  }

  private createRangeInput(
    dataType: RangeSliderTypes,
    className: string,
    min: number,
    max: number
  ): HTMLInputElement {
    const input = document.createElement('input');
    input.classList.add('input-range');
    input.setAttribute('type', 'range');
    input.setAttribute('min', min.toString());
    input.setAttribute('max', max.toString());
    input.setAttribute('data-type', dataType);
    input.classList.add(className);
    return input;
  }

  private createInputContainer(
    dataType: RangeSliderTypes,
    type: 'min' | 'max',
    direction: 'from' | 'to'
  ): HTMLDivElement {
    const numbersContainer = document.createElement('div');
    numbersContainer.classList.add('num-controls__container');

    const dollarIcon = document.createElement('p');
    dollarIcon.classList.add('num-controls__dollar-icon');
    dollarIcon.innerHTML = dataType === 'price' ? '$' : '-';

    if (type === 'max') {
      dollarIcon.classList.add('num-controls__dollar-icon_max');
    }

    const label = document.createElement('label');
    label.classList.add('num-controls__label');
    label.setAttribute('for', `${direction}Input`);
    label.innerHTML = `${type} ${dataType}`;

    if (type === 'max') {
      label.classList.add('num-controls__label_max');
    }

    let input;

    if (type === 'min') {
      if (dataType === 'price') {
        input = this.createFromInput('price', 0, 0, 900);
      } else {
        input = this.createFromInput('quantity', 0, 0, 150);
      }
    } else {
      if (dataType === 'price') {
        input = this.createToInput('price', 900, 0, 900);
      } else {
        input = this.createToInput('quantity', 150, 0, 150);
      }
    }

    numbersContainer.append(dollarIcon, label, input);

    return numbersContainer;
  }

  private createFromInput(
    dataType: RangeSliderTypes,
    initialValue: number,
    min: number,
    max: number
  ): HTMLInputElement {
    const input = document.createElement('input');
    input.classList.add(
      'num-controls__times-input',
      `num-controls__times-input_from`
    );
    input.setAttribute('type', 'number');
    input.setAttribute('id', `fromInput`);
    input.setAttribute('value', initialValue.toString());
    input.setAttribute('min', min.toString());
    input.setAttribute('max', max.toString());
    input.setAttribute('data-type', 'min');
    input.setAttribute('data-input-type', dataType);

    input.addEventListener('input', function (event) {
      const target = event.target as HTMLInputElement;

      let toInput = document.querySelector(
        '.num-controls__times-input_to[data-input-type="price"]'
      ) as HTMLInputElement;
      let toSlider = document.querySelector(
        '.slider__slider-to[data-type="price"]'
      ) as HTMLInputElement;
      let fromSlider = document.querySelector(
        '.slider__slider-from[data-type="price"]'
      ) as HTMLInputElement;

      if (dataType === 'quantity') {
        toInput = document.querySelector(
          '.num-controls__times-input_to[data-input-type="quantity"]'
        ) as HTMLInputElement;
        toSlider = document.querySelector(
          '.slider__slider-to[data-type="quantity"]'
        ) as HTMLInputElement;
        fromSlider = document.querySelector(
          '.slider__slider-from[data-type="quantity"]'
        ) as HTMLInputElement;
      }

      const [from, to] = getNumbersValues(target, toInput);

      fillLine(target, toInput, toSlider);

      if (from > to) {
        fromSlider.value = to.toString();
        input.value = to.toString();
      } else {
        fromSlider.value = from.toString();
      }
    });

    return input;
  }

  private createToInput(
    dataType: RangeSliderTypes,
    initialValue: number,
    min: number,
    max: number
  ): HTMLInputElement {
    const input = document.createElement('input');
    input.classList.add(
      'num-controls__times-input',
      `num-controls__times-input_to`
    );

    input.setAttribute('type', 'number');
    input.setAttribute('id', `toInput`);
    input.setAttribute('value', initialValue.toString());
    input.setAttribute('min', min.toString());
    input.setAttribute('max', max.toString());
    input.setAttribute('data-type', 'max');
    input.setAttribute('data-input-type', dataType);

    input.addEventListener('input', function (event) {
      const target = event.target as HTMLInputElement;
      let fromInput = document.querySelector(
        '.num-controls__times-input_from[data-input-type="price"]'
      ) as HTMLInputElement;

      let toInput = document.querySelector(
        '.num-controls__times-input_to[data-input-type="price"]'
      ) as HTMLInputElement;
      let toSlider = document.querySelector(
        '.slider__slider-to[data-type="price"]'
      ) as HTMLInputElement;

      if (dataType === 'quantity') {
        fromInput = document.querySelector(
          '.num-controls__times-input_from[data-input-type="quantity"]'
        ) as HTMLInputElement;
        toInput = document.querySelector(
          '.num-controls__times-input_to[data-input-type="quantity"]'
        ) as HTMLInputElement;
        toSlider = document.querySelector(
          '.slider__slider-to[data-type="quantity"]'
        ) as HTMLInputElement;
      }

      const [from, to] = getNumbersValues(fromInput, target);

      fillLine(fromInput, target, toSlider);
      setZIndex(toInput, dataType);

      if (from <= to) {
        toSlider.value = to.toString();
        toInput.value = to.toString();
      } else {
        toInput.value = from.toString();
      }
    });

    return input;
  }
}
