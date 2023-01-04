export function getNumbersValues(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
  const from = Number(currentFrom.value);
  const to = Number(currentTo.value);
  return [from, to];
}

export function fillLine(
  fromElement: HTMLInputElement,
  toElement: HTMLInputElement,
  controlSlider: HTMLInputElement
) {
  const distance = Number(toElement.max) - Number(toElement.min);
  const from = Number(fromElement.value) - Number(toElement.min);
  const to = Number(toElement.value) - Number(toElement.min);

  controlSlider.style.background = `linear-gradient(
      to right,
      #eaeaea 0%,
      #eaeaea ${(from / distance) * 100}%,
      #0083e8 ${(from / distance) * 100}%,
      #0083e8 ${(to / distance) * 100}%,
      #eaeaea ${(to / distance) * 100}%,
      #eaeaea 100%)`;
}

export function setZIndex(currentTarget: HTMLInputElement, dataType: string) {
  const toSlider = document.querySelector(
    `.slider__slider-to[data-type='${dataType}']`
  ) as HTMLInputElement;
  if (Number(currentTarget.value) <= 0) {
    toSlider.style.zIndex = '2';
  } else {
    toSlider.style.zIndex = '0';
  }
}
