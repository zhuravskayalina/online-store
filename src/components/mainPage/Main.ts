export class Main {
  public element: HTMLElement;

  constructor() {
    this.element = this.createMainSection();
  }

  createMainSection(): HTMLElement {
    const main = document.createElement('main');
    main.classList.add('main');

    return main;
  }
}
