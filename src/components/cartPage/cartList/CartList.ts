import { CartItem } from './cartItem/CartItem';

export class CartList {
  element: HTMLElement;

  constructor(quantity: number) {
    this.element = this.createList(quantity);
  }

  createList(quantity: number) {
    const list = document.createElement('ul');
    list.classList.add('cart-list__products-block');

    for (let i = 0; i < quantity; i++) {
      const li = document.createElement('li');
      li.classList.add('cart-list__prod-item');
      const item = new CartItem().element;

      li.append(item);
      list.append(li);
    }

    return list;
  }
}
