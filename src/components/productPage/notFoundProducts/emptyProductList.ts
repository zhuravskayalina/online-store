export class EmptyProductList {
  public emptyProductList: HTMLParagraphElement;

  constructor() {
    this.emptyProductList = this.createEmptyProductList();
  }

  private createEmptyProductList() {
    const emptyProductList = document.createElement('p');
    emptyProductList.textContent = 'No products found';
    emptyProductList.classList.add('catalog__empty-list');
    return emptyProductList;
  }
}
