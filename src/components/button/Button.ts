export class Button {
  public addToCardButton: HTMLButtonElement;

  constructor(name: string, className: string) {
    this.addToCardButton = this.createAddToCardButton(name, className);
    this.addToCardButton.addEventListener('click', function (event) {
      const target = event.target as HTMLButtonElement;

      if (target.classList.contains('card__button_added')) {
        target.classList.remove('card__button_added');
        target.innerHTML = name;
      } else {
        target.classList.add('card__button_added');
        target.innerHTML = 'go to cart';
      }
    });
  }

  private createAddToCardButton(name: string, className: string) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.innerHTML = name;
    return button;
  }
}
