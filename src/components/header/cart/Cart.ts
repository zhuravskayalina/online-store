import { TotalProductsSum } from '../../totalProductSum/TotalProductsSum';
import { ProductsQuantity } from '../../productsQuantity/ProductsQuantity';
import { router } from '../../../index';

export class Cart {
  public element: HTMLDivElement;
  public quantityText: HTMLElement;
  public quantityBox: HTMLDivElement;
  public cartIconBox: HTMLDivElement;
  public totalSumBlock: HTMLDivElement;
  public totalSumTextBox: HTMLParagraphElement;
  public line: HTMLDivElement;
  public quantity: ProductsQuantity;
  public quantityStr: string;
  public totalSumData: string;

  constructor() {
    this.quantityText = this.createQuantityText();
    this.quantityBox = this.createQuantityBox();
    this.cartIconBox = this.createCartIconBox();
    this.totalSumBlock = this.createSumBlock();
    this.totalSumTextBox = this.createSumTextBox();
    this.totalSumData = this.createTotalSumData();
    this.line = this.createSeparateLine();
    this.element = this.createCartBox();
    this.quantity = new ProductsQuantity();
    this.quantity.handleCartQuantityChange(this.increaseCartCount);
    this.quantityStr = this.quantity.quantityNumToStr;

    this.quantityText.innerHTML = this.quantityStr;

    this.quantityBox.append(this.quantityText);
    this.cartIconBox.append(this.quantityBox);
    this.totalSumTextBox.append(this.totalSumData);
    this.totalSumBlock.append(this.totalSumTextBox);

    this.element.append(this.cartIconBox, this.line, this.totalSumBlock);
  }

  private createQuantityText() {
    const quantityTxt = document.createElement('span');
    quantityTxt.classList.add('cart__quantity-num');

    return quantityTxt;
  }

  changeTotalSum = () => {
    this.totalSumTextBox.replaceChildren(new TotalProductsSum().totalSum);
  };

  increaseCartCount = () => {
    this.quantityText.innerHTML = (
      Number(this.quantityText.textContent) + 1
    ).toString();
  };

  decreaseCartCount = () => {
    const number = Number(this.quantityText.textContent);
    let text = '';

    if (number < 0) {
      text = '0';
    } else {
      text = (number - 1).toString();
    }
    this.quantityText.innerHTML = text;
  };

  private createQuantityBox() {
    const quantityBox = document.createElement('div');
    quantityBox.classList.add('cart__quantity');
    return quantityBox;
  }

  private createCartIconBox() {
    const cartIconBox = document.createElement('div');
    cartIconBox.classList.add('cart__icon');

    cartIconBox.addEventListener('click', function () {
      router.loadRoute(false, 'cart');
    });

    const icon = document.createElement('div');
    icon.classList.add('icon-cart', 'cart__icon-cart');

    cartIconBox.append(icon);
    return cartIconBox;
  }

  private createSumBlock() {
    const sumBlock = document.createElement('div');
    sumBlock.classList.add('cart__sum-box');

    const sumHeading = document.createElement('p');
    sumHeading.classList.add('cart__sum-heading');
    sumHeading.innerHTML = 'Cart total:';

    sumBlock.append(sumHeading);
    return sumBlock;
  }

  private createSumTextBox() {
    const sumEl = document.createElement('p');
    sumEl.classList.add('cart__sum');

    return sumEl;
  }

  private createTotalSumData() {
    const sum = new TotalProductsSum();
    sum.handleCartTotalSumChange(this.changeTotalSum);
    const sumStr = sum.totalSum;

    return sumStr;
  }

  private createCartBox(): HTMLDivElement {
    const box = document.createElement('div');
    box.classList.add('cart');

    return box;
  }

  private createSeparateLine() {
    const line = document.createElement('div');
    line.classList.add('cart__line');
    return line;
  }
}
