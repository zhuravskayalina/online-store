import { ProductData } from '../../../dataBase/types';
import { Main } from '../../mainPage/Main';
import { Card } from '../productCard/Card';
import { Detail } from '../productDescription/bigCardProductDescription';

export class CreateProductItemPage {
  element: HTMLElement;

  constructor(product: ProductData) {
    this.element = this.createItemPage(product);
  }

  private createItemPage(product: ProductData) {
    const main = new Main().element;
    main.classList.add('product-page');

    const container = document.createElement('div');
    container.classList.add('main__container');
    main.appendChild(container);

    const card = new Card(product).bigCard;
    container.appendChild(card);

    const description = new Detail(product).detail;
    container.appendChild(description);
    main.append(container);
    return main;
  }
}
