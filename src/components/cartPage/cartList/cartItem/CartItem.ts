import { ProductData } from '../../../../dataBase/types';
import { CountBox } from './countBox/CountBox';
import { removeFromCartEvent } from '../../../../types/custom-events';

export class CartItem {
  public element: HTMLElement;
  public imgBox: HTMLDivElement;
  public img: HTMLImageElement;
  public infoBox: HTMLDivElement;
  public itemName: HTMLParagraphElement;
  public itemPriceBox: HTMLDivElement;
  public itemPrice: HTMLParagraphElement;
  public countBlock: HTMLElement;
  public deleteBox: HTMLDivElement;
  public deleteIcon: HTMLParagraphElement;
  public itemTotalPrice: HTMLParagraphElement;

  constructor(product: ProductData) {
    this.element = this.createItemContainer();
    this.imgBox = this.createImgBox();
    this.img = this.createImg(product);
    this.itemPriceBox = this.createItemPriceBox();
    this.infoBox = this.createInfoBox();
    this.itemName = this.createItemName(product);
    this.itemPrice = this.createItemPrice(product);
    this.countBlock = new CountBox(product).element;
    this.deleteBox = this.createDeleteBox();
    this.deleteIcon = this.createCloseIcon(product);
    this.itemTotalPrice = this.createItemTotalPrice(product);

    this.imgBox.append(this.img);
    this.itemPriceBox.append(this.itemPrice, this.itemTotalPrice);
    this.infoBox.append(this.itemName, this.itemPriceBox, this.countBlock);
    this.deleteBox.append(this.deleteIcon);
    this.element.append(this.imgBox, this.infoBox, this.deleteBox);

    this.deleteIcon.addEventListener('click', function () {
      const productId = this.dataset.productId;

      localStorage.removeItem(`product-${productId}`);

      document.dispatchEvent(removeFromCartEvent);
    });
  }

  private createItemPriceBox(): HTMLDivElement {
    const box = document.createElement('div');
    box.classList.add('cart-item__price-box');
    return box;
  }

  private createImgBox(): HTMLDivElement {
    const imgBox = document.createElement('div');
    imgBox.classList.add('cart-item__img-box');
    return imgBox;
  }

  private createImg({ images }: ProductData): HTMLImageElement {
    const img = document.createElement('img');
    img.classList.add('cart-item__img');
    img.setAttribute('src', images[0]);

    return img;
  }

  private createInfoBox(): HTMLDivElement {
    const infoBox = document.createElement('div');
    infoBox.classList.add('cart-item__info-box');
    return infoBox;
  }

  private createItemName({ name }: ProductData): HTMLParagraphElement {
    const itemName = document.createElement('p');
    itemName.classList.add('cart-item__name');
    itemName.innerHTML = name;
    return itemName;
  }

  private createItemPrice({ price }: ProductData): HTMLParagraphElement {
    const itemPrice = document.createElement('p');
    itemPrice.classList.add('cart-item__price');
    itemPrice.innerHTML = `Price: ${this.formatSum(price)} $`;
    return itemPrice;
  }

  private createItemTotalPrice({
    price,
    countInCart,
  }: ProductData): HTMLParagraphElement {
    const itemTotalPrice = document.createElement('p');
    itemTotalPrice.classList.add('cart-item__price', 'cart-item__price_total');
    itemTotalPrice.innerHTML = `Total: ${this.formatSum(
      price * countInCart
    )} $`;
    return itemTotalPrice;
  }

  private createDeleteBox() {
    const deleteBox = document.createElement('div');
    deleteBox.classList.add('cart-item__deleteBox');
    return deleteBox;
  }

  private createCloseIcon({ vendorCode }: ProductData): HTMLParagraphElement {
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
}
