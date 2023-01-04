export class BuyNowButton {
  public buyNowButton: HTMLButtonElement;

  constructor(name: string, className: string) {
    this.buyNowButton = this.createBuyNowButton(name, className);
  }

  private createBuyNowButton(name: string, className: string) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.innerHTML = name;
    return button;
  }
}
