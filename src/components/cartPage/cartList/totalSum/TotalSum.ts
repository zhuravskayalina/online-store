import { TotalProductsSum } from '../../../totalProductSum/TotalProductsSum';

export class TotalSum {
  element: HTMLDivElement;

  constructor() {
    this.element = this.createSumBox();
  }

  createSumBox() {
    const sumBlock = document.createElement('div');
    sumBlock.classList.add('sum-box');

    const sumHead = document.createElement('div');
    sumHead.classList.add('sum-box__sum-head');

    const sumHeading = document.createElement('p');
    sumHeading.classList.add('sum-box__heading');
    sumHeading.innerHTML = 'Total';

    const sum = document.createElement('span');
    sum.classList.add('sum-box__sum');
    const sumStr = new TotalProductsSum().sum;
    sum.innerHTML = `${sumStr}$`;

    sumHead.append(sumHeading, sum);

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Enter promo code');
    input.classList.add('sum-box__input');

    const button = document.createElement('button');
    button.classList.add('sum-box__button');
    button.innerHTML = 'Proceed to payment';

    sumBlock.append(sumHead, input, button);
    return sumBlock;
  }
}
