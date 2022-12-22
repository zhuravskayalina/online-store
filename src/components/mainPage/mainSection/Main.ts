export class Main {
  element: HTMLElement;

  constructor() {
    this.element = this.createMainSection();
  }

  createMainSection() {
    const main = document.createElement('main');
    main.classList.add('main');

    const container = document.createElement('div');
    container.classList.add('main__container');

    const heading = document.createElement('h1');
    heading.classList.add('main__heading');
    heading.innerHTML = 'Snowboard shop';

    const button = document.createElement('a');
    button.setAttribute('href', '#');
    button.innerHTML = 'Go to catalog';
    button.classList.add('main__catalog-btn');

    container.append(heading, button);
    main.append(container);
    return main;
  }
}
