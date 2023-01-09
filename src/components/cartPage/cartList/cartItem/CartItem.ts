import { ProductCount } from './productCount/ProductCount';
import { ProductData } from '../../../../dataBase/types';

export class CartItem {
  public element: HTMLElement;
  imgBox: HTMLDivElement;
  img: HTMLImageElement;
  infoBox: HTMLDivElement;
  itemName: HTMLParagraphElement;
  itemPrice: HTMLParagraphElement;
  countBlock: HTMLDivElement;
  deleteBox: HTMLDivElement;
  deleteIcon: HTMLParagraphElement;

  constructor(product: ProductData) {
    this.element = this.createItemContainer();
    this.imgBox = this.createImgBox();
    this.img = this.createImg(product);
    this.infoBox = this.createInfoBox();
    this.itemName = this.createItemName(product);
    this.itemPrice = this.createItemPrice(product);
    this.countBlock = this.createCountBox();
    this.deleteBox = this.createDeleteBox();
    this.deleteIcon = this.createCloseIcon(product);

    this.imgBox.append(this.img);
    this.infoBox.append(this.itemName, this.itemPrice, this.countBlock);
    this.deleteBox.append(this.deleteIcon);
    this.element.append(this.imgBox, this.infoBox, this.deleteBox);

    const removeFromCartEvent = new CustomEvent('removeFromCart', {
      detail: product.vendorCode,
    });

    this.deleteIcon.addEventListener('click', function () {
      const productId = this.dataset.productId;

      localStorage.removeItem(`product-${productId}`);

      document.dispatchEvent(removeFromCartEvent);
    });
  }

  private createImgBox() {
    const imgBox = document.createElement('div');
    imgBox.classList.add('cart-item__img-box');
    return imgBox;
  }

  private createImg({ images }: ProductData) {
    const img = document.createElement('img');
    img.classList.add('cart-item__img');
    img.setAttribute('src', images[0]);

    return img;
  }

  private createInfoBox() {
    const infoBox = document.createElement('div');
    infoBox.classList.add('cart-item__info-box');
    return infoBox;
  }

  private createItemName({ name }: ProductData) {
    const itemName = document.createElement('p');
    itemName.classList.add('cart-item__name');
    itemName.innerHTML = name;
    return itemName;
  }

  private createItemPrice({ price }: ProductData) {
    const itemPrice = document.createElement('p');
    itemPrice.classList.add('cart-item__price');
    itemPrice.innerHTML = `${this.formatSum(price)} $`;
    return itemPrice;
  }

  private createDeleteBox() {
    const deleteBox = document.createElement('div');
    deleteBox.classList.add('cart-item__deleteBox');
    return deleteBox;
  }

  private createCloseIcon({ vendorCode }: ProductData) {
    const cross = document.createElement('p');
    cross.setAttribute('data-product-id', vendorCode.toString());
    cross.classList.add('icon-cross', 'cart-item__delete-icon');
    return cross;
  }

  private createItemContainer(): HTMLDivElement {
    const cart = document.createElement('div');
    cart.classList.add('cart-item');

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
