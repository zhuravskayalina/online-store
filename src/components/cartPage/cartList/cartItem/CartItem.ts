import { ProductCount } from './productCount/ProductCount';

export class CartItem {
  public element: HTMLElement;

  constructor() {
    this.element = this.createItem();
  }

  private createItem(/*productImg: string*, productBrand: string, productName:
   string, productPrice: number */): HTMLDivElement {
    const cart = document.createElement('div');
    cart.classList.add('cart-item');

    const imgBox = document.createElement('div');
    imgBox.classList.add('cart-item__img-box');

    const img = document.createElement('div');
    img.classList.add('cart-item__img');
    img.setAttribute('src', '');

    imgBox.append(img);

    const infoBox = document.createElement('div');
    infoBox.classList.add('cart-item__info-box');

    const name = document.createElement('p');
    name.classList.add('cart-item__name');
    name.innerHTML = 'Nitro Snowboard Everythingship';

    const price = document.createElement('p');
    price.classList.add('cart-item__price');
    price.innerHTML = `${this.formatSum(1000023.33)} $`;

    const size = document.createElement('div');
    size.classList.add('cart-item__size');

    const countBlock = this.createCountBox();

    infoBox.append(name, price);

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

    if (true) {
      //если будет размер - если карточка ботинок
      const sizeBox = document.createElement('div');
      sizeBox.classList.add('cart-item__size-box');
      const sizeTxt = document.createElement('p');
      sizeTxt.classList.add('cart-item__size-txt');
      sizeTxt.innerHTML = '8';
      sizeBox.append(sizeTxt);

      sizeCountBox.append(sizeBox);
    }

    const countBox = document.createElement('div');
    countBox.classList.add('cart-item__count-box');

    const min = document.createElement('span');
    min.classList.add('count-icon');
    min.innerHTML = '-';

    const count = new ProductCount(2).element;
    count.classList.add('cart-item__product-count');

    const plus = document.createElement('span');
    plus.classList.add('count-icon');
    plus.innerHTML = '+';

    countBox.append(min, count, plus);
    sizeCountBox.append(countBox);
    return sizeCountBox;
  }
}
