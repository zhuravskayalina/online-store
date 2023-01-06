import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { MainSection } from '../mainPage/mainSection/Main';
import { Page } from '../../router/types';
import { Catalog } from '../productPage/catalog/catalog';
import { dataBase } from '../../dataBase/dataBase';
import { brandsList, categoriesList } from '../../dataBase/filtersList';
import { CartPage } from '../cartPage/cartPage';
import { ErrorPage } from '../errorPage/ErrorPage';
import { CreateProductItemPage } from '../productPage/bigCardPageAssembly/bigCardPageAssembly';

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
    } else if (pageKind === 'error') {
      main = new ErrorPage().element;
    }

    this.container.append(header, main, footer);
    return this.container;
  }

  public buildProductItemPage(pageKind: Page, productId: number) {
    const header = new Header().element;
    const footer = new Footer().element;

    const matchedItem = dataBase.find((item) => {
      return item.vendorCode === Number(productId);
    });

    let main;

    if (matchedItem) {
      main = new CreateProductItemPage(matchedItem).element;
    } else {
      main = new ErrorPage().element;
    }
    this.container.append(header, main, footer);
    return this.container;
  }
}
