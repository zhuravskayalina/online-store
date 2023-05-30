import { TotalProductsSum } from '../../../totalProductSum/TotalProductsSum';

export class TotalSum {
  public element: HTMLDivElement;
  public headingBox: HTMLParagraphElement;
  public sumString: HTMLElement;
  public promoCodeInput: HTMLInputElement;
  public confirmButton: HTMLButtonElement;
  public headingInSumBox: HTMLHeadingElement;
  public totalSumBox: HTMLDivElement;

  constructor() {
    this.element = this.createSumBox();
    this.headingBox = this.createHeadingBox();
    this.headingInSumBox = this.createHeadingInSumBox();
    this.sumString = this.createSumString();
    this.promoCodeInput = this.createPromoCodeInput();
    this.confirmButton = this.createConfirmButton();
    this.totalSumBox = this.createTotalSumBox();
    this.totalSumBox.append(this.sumString);

    this.headingBox.append(this.headingInSumBox, this.totalSumBox);
    this.element.append(
      this.headingBox,
      this.promoCodeInput,
      this.confirmButton
    );

    this.confirmButton.addEventListener('click', function () {
      const modal = document.querySelector('.app-modal') as HTMLDivElement;
      modal.classList.add('app-modal_shown');
      document.body.classList.add('open-modal');
      document.body.scrollIntoView({ behavior: 'smooth' });
    });
  }

  private createTotalSumBox() {
    return document.createElement('div');
  }

  changeTotalSum = () => {
    this.totalSumBox.replaceChildren(new TotalProductsSum().totalSum);
  };

  private createConfirmButton() {
    const button = document.createElement('button');
    button.classList.add('sum-box__button');
    button.innerHTML = 'Proceed to payment';

    return button;
  }

  private createPromoCodeInput() {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Enter promo code');
    input.classList.add('sum-box__input');
    return input;
  }

  private createHeadingBox() {
    const box = document.createElement('div');
    box.classList.add('sum-box__sum-head');

    return box;
  }

  private createHeadingInSumBox() {
    const sumHeading = document.createElement('p');
    sumHeading.classList.add('sum-box__heading');
    sumHeading.innerHTML = 'Total';
    return sumHeading;
  }

  private createSumString() {
    const sumEl = document.createElement('span');
    sumEl.classList.add('sum-box__sum');
    const sum = new TotalProductsSum();
    sum.handleCartTotalSumChange(this.changeTotalSum);
    const sumStr = sum.totalSum;
    sumEl.innerHTML = `${sumStr}`;
    return sumEl;
  }

  private createSumBox(): HTMLDivElement {
    const sumBlock = document.createElement('div');
    sumBlock.classList.add('sum-box');

    return sumBlock;
  }
}
