import { CartItem } from './cartItem/CartItem';
import { ProductData } from '../../../dataBase/types';
import { getProductsInLocalStorage } from '../../../types/utils';

export class CartList {
  public element: HTMLUListElement;
  addedToCartItems: ProductData[];

  constructor() {
    this.addedToCartItems = getProductsInLocalStorage();

    this.element = this.createList(this.addedToCartItems);
    this.element.classList.add('cart-list__products-list');
  }

  handleCartUpdate(callback: () => void) {
    document.addEventListener('cartUpdate', function () {
      callback();
    });
  }

  private createList(products: ProductData[]): HTMLUListElement {
    const list = document.createElement('ul');
    list.classList.add('cart-list__products-block');

    products.forEach((product) => {
      console.log(product);
      const li = document.createElement('li');
      li.classList.add('cart-list__prod-item');
      const item = new CartItem(product).element;

      li.append(item);
      list.append(li);
    });

    return list;
  }
}
