export class Cart {
  element: HTMLDivElement;

  constructor(sum: number, quantity: number) {
    this.element = this.createCart(sum, quantity);
  }

  createCart(totalSum: number, quantity: number) {
    const box = document.createElement('div');
    box.classList.add('cart');

    const cartIconBox = document.createElement('div');
    cartIconBox.classList.add('cart__icon');

    const iconLink = document.createElement('a');
    iconLink.setAttribute('href', '#');
    iconLink.classList.add('cart__icon-link');

    const icon = document.createElement('div');
    icon.classList.add('icon-cart', 'cart__icon-cart');

    iconLink.append(icon);

    const quantityBox = document.createElement('div');
    quantityBox.classList.add('cart__quantity');

    const quantityTxt = document.createElement('span');
    quantityTxt.classList.add('cart__quantity-num')
    quantityTxt.innerHTML = quantity.toString();

    quantityBox.append(quantityTxt);

    cartIconBox.append(iconLink, quantityBox);

    const line = document.createElement('div');
    line.classList.add('cart__line');

    const sumBlock = document.createElement('div');
    sumBlock.classList.add('cart__sum-box');

    const sumHeading = document.createElement('p');
    sumHeading.classList.add('cart__sum-heading')
    sumHeading.innerHTML = 'Cart total:';

    const sum = document.createElement('p');
    sum.classList.add('cart__sum');
    sum.innerHTML = `$${this.formatSum(totalSum)}`;

    sumBlock.append(sumHeading, sum);

    box.append(cartIconBox, line, sumBlock);

    return box;
  }

  formatSum(sum: number) {
    return new Intl.NumberFormat('ru-RU').format(sum);
  }

}
