import { ProductData } from '../../../dataBase/types';
import { Main } from '../../mainPage/Main';
import { Card } from '../productCard/Card';
import { Detail } from '../productDescription/bigCardProductDescription';

export function createProductPage(product: ProductData): void {
  const app = document.querySelector('.app') as HTMLDivElement;
  const main = new Main().element;
  main.classList.add('product-page');
  app.append(main);

  const container = document.createElement('div');
  container.classList.add('main__container');
  main.appendChild(container);

  const card = new Card(product).bigCard;
  container.appendChild(card);

  const description = new Detail(product).detail;
  container.appendChild(description);
}
