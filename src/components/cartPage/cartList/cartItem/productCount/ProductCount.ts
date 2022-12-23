export class ProductCount {
  element: HTMLElement;

  constructor(count: number) {
    this.element = this.createCount(count);
  }

  createCount(count: number) {
    const countEl = document.createElement('span');
    countEl.innerHTML = count.toString();

    return countEl;
  }
}
