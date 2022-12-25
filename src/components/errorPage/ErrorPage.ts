import { Main } from '../mainPage/Main';
const errorImg = require('../../assets/images/error.webp');

export class ErrorPage {
  element: HTMLElement;

  constructor() {
    this.element = this.createErrorSection();
  }

  createErrorSection(): HTMLElement {
    const main = new Main().element;
    main.classList.add('error-page');

    const container = document.createElement('div');
    container.classList.add('error-page__container');

    const image = document.createElement('img');
    image.setAttribute('src', errorImg);
    image.classList.add('error-page__image');

    const button = document.createElement('a');
    button.setAttribute('href', '#');
    button.setAttribute('alt', 'Go to main page');
    button.classList.add('error-page__back-btn');
    button.innerHTML = 'back to Home page';

    container.append(image, button);
    main.append(container);

    return main;
  }
}
