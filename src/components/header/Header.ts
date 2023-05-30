import { Search } from './search/Search';
import { Cart } from './cart/Cart';
import { Navigation } from './navigation/Navigation';
import { router } from '../../index';

const logoImg = require('../../assets/images/logo.svg');

export class Header {
  public element: HTMLElement;

  constructor() {
    this.element = this.createHeader();
  }

  private createHeader(): HTMLElement {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header__container');

    const headerUpper = document.createElement('div');
    headerUpper.classList.add('header__upper-box');

    const logo = document.createElement('img');
    logo.setAttribute('src', logoImg);
    logo.classList.add('header__logo');

    logo.addEventListener('click', function () {
      router.loadRoute(false, '');
    });

    const input = new Search().element;
    const cart = new Cart().element;

    const headerNav = new Navigation().element;

    headerUpper.append(logo, input, cart);
    headerContainer.append(headerUpper, headerNav);

    header.append(headerContainer);

    return header;
  }
}
