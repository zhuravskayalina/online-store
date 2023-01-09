import { TotalSum } from './cartList/totalSum/TotalSum';
import { CartList } from './cartList/CartList';
import { Main } from '../mainPage/Main';
import { ProductData } from '../../dataBase/types';
import {
  isHaveProductsInCart,
} from '../../types/utils';

export class CartPage {
  public element: HTMLElement;
  public container: HTMLDivElement;
  public heading: HTMLHeadingElement;
  public productsBox: HTMLDivElement;
  public totalSum: HTMLDivElement;
  public main: HTMLElement;
  public products: HTMLUListElement;
  public cartList: CartList;
  public addedToCartItems: ProductData[];
  public noProductsInCartBlock: HTMLDivElement;

  constructor() {
    this.addedToCartItems = [];
    this.container = this.createContainer();
    this.heading = this.createHeading();
    this.cartList = new CartList();
    this.products = this.cartList.element;
    this.productsBox = this.createProductsBox();
    this.productsBox.append(this.products);
    this.totalSum = new TotalSum().element;
    this.main = this.createMainBlock();
    this.noProductsInCartBlock = this.createNoProductsInCartBlock();

    this.container.append(this.heading, this.productsBox, this.totalSum);

    const isProductsInTheCart = isHaveProductsInCart();

    console.log(isProductsInTheCart, 'isProductsInTheCart');

    if (isProductsInTheCart) {
      this.main.append(this.container);
    } else {
      this.main.classList.add('cart-list_no-goods')
      this.main.append(this.noProductsInCartBlock);
    }

    this.element = this.main;

    this.cartList.handleCartUpdate(this.updateList);
  }

  createNoProductsInCartBlock() {
    const block = document.createElement('div');
    block.classList.add('cart-list__no-products-message');
    block.innerHTML = 'No goods in cart';
    return block;
  }

  updateList = () => {
    let keys = Object.keys(localStorage);

    for (let key of keys) {
      this.addedToCartItems = [];
      const item = localStorage.getItem(key) as string;
      this.addedToCartItems.push(JSON.parse(item));
    }

    const products = new CartList().element;

    this.main.classList.remove('cart-list_no-goods');
    this.main.replaceChildren(this.container);
    this.productsBox.replaceChildren(products);
  };

  private createMainBlock() {
    const main = new Main().element;
    main.classList.add('cart-list');
    return main;
  }

  private createProductsBox() {
    const productsListBox = document.createElement('div');
    productsListBox.classList.add('cart-list__products-box');
    return productsListBox;
  }

  private createContainer() {
    const container = document.createElement('div');
    container.classList.add('cart-list__container');
    return container;
  }

  private createHeading() {
    const heading = document.createElement('h2');
    heading.classList.add('cart-list__heading');
    heading.innerHTML = 'Cart';
    return heading;
  }
}
