import { TotalProductsSum } from '../../totalProductSum/TotalProductsSum';
import { ProductsQuantity } from '../../productsQuantity/ProductsQuantity';
import { router } from '../../../index';

export class Cart {
  public element: HTMLDivElement;

  constructor() {
    this.element = this.createCart();
  }

  createCart(): HTMLDivElement {
    const box = document.createElement('div');
    box.classList.add('cart');

    const cartIconBox = document.createElement('div');
    cartIconBox.classList.add('cart__icon');

    cartIconBox.addEventListener('click', function () {
      router.loadRoute('cart');
    });

    const icon = document.createElement('div');
    icon.classList.add('icon-cart', 'cart__icon-cart');

    const quantityBox = document.createElement('div');
    quantityBox.classList.add('cart__quantity');

    const quantityTxt = document.createElement('span');
    quantityTxt.classList.add('cart__quantity-num');

    quantityTxt.innerHTML = new ProductsQuantity().quantity;

    quantityBox.append(quantityTxt);

    cartIconBox.append(icon, quantityBox);

    const line = document.createElement('div');
    line.classList.add('cart__line');

    const sumBlock = document.createElement('div');
    sumBlock.classList.add('cart__sum-box');

    const sumHeading = document.createElement('p');
    sumHeading.classList.add('cart__sum-heading');
    sumHeading.innerHTML = 'Cart total:';

    const sum = document.createElement('p');
    sum.classList.add('cart__sum');
    const sumStr = new TotalProductsSum().sum;
    sum.innerHTML = `$${sumStr}`;

    sumBlock.append(sumHeading, sum);

    box.append(cartIconBox, line, sumBlock);

    return box;
  }
}
