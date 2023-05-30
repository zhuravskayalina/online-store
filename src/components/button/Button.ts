import { router } from '../../index';

export class Button {
  public addToCard: HTMLButtonElement;
  public goToCart: HTMLButtonElement;

  constructor(name: string, className: string) {
    this.addToCard = this.createButton(name, className);
    this.goToCart = this.createButton(name, className);

    this.goToCart.addEventListener('click', function () {
      router.loadRoute(false, 'cart');
    });
  }

  private createButton(name: string, className: string) {
    const button = document.createElement('button');
    button.classList.add('card__button');
    button.classList.add(className);
    button.innerHTML = name;
    return button;
  }
}
