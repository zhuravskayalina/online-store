import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { MainSection } from '../mainPage/mainSection/Main';
import { Page } from '../../router/types';
import { Catalog } from '../productPage/catalog/catalog';
import { dataBase } from '../../dataBase/dataBase';
import { brandsList, categoriesList } from '../../dataBase/filtersList';
import { CartPage } from '../cartPage/cartPage';

export class PageConstructor {
  container: HTMLDivElement;

  constructor() {
    this.container = this.createContainer();
  }

  private createContainer() {
    const container = document.createElement('div');
    container.classList.add('app-container');
    return container;
  }

  public buildPage(pageKind: Page) {
    const header = new Header().element;
    const footer = new Footer().element;
    let main = new MainSection().element;

    if (pageKind === 'shop') {
      main = new Catalog(dataBase, categoriesList, brandsList).catalog;
    } else if (pageKind === 'cart') {
      main = new CartPage().element;
    }

    this.container.append(header, main, footer);
    return this.container;
  }
}
