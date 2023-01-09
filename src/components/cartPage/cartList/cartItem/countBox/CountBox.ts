import { ProductData } from '../../../../../dataBase/types';
import {
  cartUpdateEvent,
  removeFromCartEvent,
} from '../../../../../types/custom-events';
import { setItemToLocalStorage } from '../../../../../types/utils';

export class CountBox {
  element: HTMLElement;
  minButton: HTMLSpanElement;
  countBox: HTMLSpanElement;
  countText: string;
  plusButton: HTMLSpanElement;

  constructor(product: ProductData) {
    this.element = this.createCountContainer();
    this.minButton = this.createMinButton();
    this.plusButton = this.createPlusButton();
    this.countBox = this.createCountBox();
    this.countText = this.createCountText(product);

    this.countBox.append(this.countText);
    this.element.append(this.minButton, this.countBox, this.plusButton);

    this.plusButton.addEventListener('click', function () {
      product.countInCart += 1;

      if (product.countInCart > product.quantity) {
        product.countInCart = product.quantity;
      }

      setItemToLocalStorage(product.vendorCode, product);

      document.dispatchEvent(cartUpdateEvent);
    });

    this.minButton.addEventListener('click', function () {
      product.countInCart -= 1;

      setItemToLocalStorage(product.vendorCode, product);

      if (product.countInCart <= 0) {
        localStorage.removeItem(`product-${product.vendorCode}`);
      }

      document.dispatchEvent(removeFromCartEvent);
    });
  }

  private createMinButton(): HTMLSpanElement {
    const min = document.createElement('span');
    min.classList.add('count-icon');
    min.innerHTML = '-';
    return min;
  }

  private createPlusButton(): HTMLSpanElement {
    const plus = document.createElement('span');
    plus.classList.add('count-icon');
    plus.innerHTML = '+';
    return plus;
  }

  private createCountBox(): HTMLSpanElement {
    const count = document.createElement('span');
    count.classList.add('cart-item__product-count');
    return count;
  }

  private createCountText({ countInCart }: ProductData): string {
    return countInCart.toString();
  }

  private createCountContainer(): HTMLDivElement {
    const countBox = document.createElement('div');
    countBox.classList.add('cart-item__count-box');
    return countBox;
  }
}
