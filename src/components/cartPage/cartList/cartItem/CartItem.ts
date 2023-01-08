import { ProductCount } from './productCount/ProductCount';
import { ProductData } from '../../../../dataBase/types';

export class CartItem {
  public element: HTMLElement;

  constructor(product: ProductData) {
    this.element = this.createItem(product);
  }

  private createItem({ name, price, images }: ProductData): HTMLDivElement {
    const cart = document.createElement('div');
    cart.classList.add('cart-item');

    const imgBox = document.createElement('div');
    imgBox.classList.add('cart-item__img-box');

    const img = document.createElement('img');
    img.classList.add('cart-item__img');
    img.setAttribute('src', images[0]);

    imgBox.append(img);

    const infoBox = document.createElement('div');
    infoBox.classList.add('cart-item__info-box');

    const itemName = document.createElement('p');
    itemName.classList.add('cart-item__name');
    itemName.innerHTML = name;

    const itemPrice = document.createElement('p');
    itemPrice.classList.add('cart-item__price');
    itemPrice.innerHTML = `${this.formatSum(price)} $`;

    const size = document.createElement('div');
    size.classList.add('cart-item__size');

    const countBlock = this.createCountBox();

    infoBox.append(itemName, itemPrice);

    infoBox.append(countBlock);

    const deleteBox = document.createElement('div');
    deleteBox.classList.add('cart-item__deleteBox');
    const cross = document.createElement('p');
    cross.classList.add('icon-cross', 'cart-item__delete-icon');

    deleteBox.append(cross);

    cart.append(imgBox, infoBox, deleteBox);

    return cart;
  }

  private formatSum(sum: number): string {
    return new Intl.NumberFormat('ru-RU').format(sum);
  }

  private createCountBox(): HTMLDivElement {
    const sizeCountBox = document.createElement('div');
    sizeCountBox.classList.add('cart-item__size-count');

    const countBox = document.createElement('div');
    countBox.classList.add('cart-item__count-box');

    const min = document.createElement('span');
    min.classList.add('count-icon');
    min.innerHTML = '-';

    const count = new ProductCount(1).element;
    count.classList.add('cart-item__product-count');

    const plus = document.createElement('span');
    plus.classList.add('count-icon');
    plus.innerHTML = '+';

    countBox.append(min, count, plus);
    sizeCountBox.append(countBox);
    return sizeCountBox;
  }
}
