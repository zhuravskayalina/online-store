import { Main } from '../Main';
import { router } from '../../../index';

export class MainSection {
  public element: HTMLElement;

  constructor() {
    this.element = this.createMainSection();
  }

  createMainSection(): HTMLElement {
    const main = new Main().element;
    main.classList.add('main-page');

    const container = document.createElement('div');
    container.classList.add('main__container');

    const heading = document.createElement('h1');
    heading.classList.add('main__heading');
    heading.innerHTML = 'Snowboard shop';

    const button = this.createButton();

    container.append(heading, button);
    main.append(container);
    return main;
  }

  createButton() {
    const button = document.createElement('button');
    button.innerHTML = 'Go to catalog';
    button.classList.add('main__catalog-btn');

    button.addEventListener('click', function () {
      router.loadRoute(false, 'shop');
    });

    return button;
  }
}
