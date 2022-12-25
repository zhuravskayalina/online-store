import { TotalSum } from './cartList/totalSum/TotalSum';
import { CartList } from './cartList/CartList';
import { Main } from '../mainPage/Main';

export class CartPage {
  public element: HTMLElement;

  constructor() {
    this.element = this.createCartPage();
  }

  private createCartPage(): HTMLElement {
    const main = new Main().element;
    main.classList.add('cart-list');

    const container = document.createElement('div');
    container.classList.add('cart-list__container');

    const heading = document.createElement('h2');
    heading.classList.add('cart-list__heading');
    heading.innerHTML = 'Cart';

    const products = new CartList(1).element;
    products.classList.add('cart-list__products-list');

    const total = new TotalSum().element;

    container.append(heading, products, total);
    main.append(container);
    return main;
  }
}
