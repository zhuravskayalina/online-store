import { Search } from './search/Search';
import { Cart } from './cart/Cart';
import { Navigation } from './navigation/Navigation';

const logoImg = require('../../../assets/logo.svg');

export class Header {
  element: HTMLElement;

  constructor(sum: number, quantity: number) {
    this.element = this.createHeader(sum, quantity);
  }

  createHeader(sum: number, quantity: number) {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header__container');

    const headerUpper = document.createElement('div');
    headerUpper.classList.add('header__upper-box');

    const logoLink = document.createElement('a');
    logoLink.setAttribute('href', '#');
    logoLink.classList.add('header__logo-link');

    const logo = document.createElement('img');
    logo.setAttribute('src', logoImg);
    logo.classList.add('header__logo');

    logoLink.append(logo);

    const input = new Search().element;
    const cart = new Cart(sum, quantity).element;

    const headerNav = new Navigation().element;

    headerUpper.append(logoLink, input, cart);
    headerContainer.append(headerUpper, headerNav);

    header.append(headerContainer);

    return header;
  }
}
