import { Main } from "../../mainPage/Main";
import { ProductData } from "../../../dataBase/types";
import { AllFiltersBlock } from '../filters/filters';
import { CatalogMenu } from '../catalogMenu/catalogMenu';
import { Filters} from '../../../dataBase/types';
import { Card } from '../productCard/Card';


export class Catalog {
  public catalog: HTMLElement;
  public isGridView: boolean;
  public productArray: Array<ProductData>;
  public categoriesList: Array<Filters>;
  public brandsList: Array<Filters>;
  constructor(productArray: Array<ProductData>, categoriesList: Array<Filters>, brandsList: Array<Filters>) {
    this.catalog = this.createCatalog(productArray, categoriesList, brandsList);
    this.isGridView = true;
    this.productArray = productArray;
    this.categoriesList = categoriesList;
    this.brandsList = brandsList;
  }
  setView = () => {
    this.isGridView = !this.isGridView;
    if (!this.isGridView) {
      this.catalog.replaceChildren(''); //вместо пустой строки метод,
      // рисующий линии продуктов
    }
  }

  private createCatalog(productArray: Array<ProductData>, categoriesList: Array<Filters>, brandsList: Array<Filters>): HTMLElement {
    const main = new Main().element;
    main.classList.add('catalog'); //todo class

    const catalogWrapper = document.createElement('div');
    const catalogHeader = document.createElement('p');
    const catalogContext = document.createElement('div');
    const filtersBlock = document.createElement('div');
    const productWrapper = document.createElement('div');

    const catalogMenu = new CatalogMenu();
    catalogMenu.handleChangeView(this.setView);

    const functionalBlock = catalogMenu.catalogMenu;
    const productGrid = document.createElement('div');
    catalogWrapper.classList.add('catalog__container');

    catalogHeader.classList.add('catalog__header');
    catalogHeader.textContent = 'Catalog';

    catalogContext.classList.add('catalog__context');

    const filters = new AllFiltersBlock(categoriesList, brandsList).allFiltersBlock;
    filtersBlock.append(filters);

    // ToDo  здесь нужно предусмотреть отрисовку smallCardInline - добавить
    //  такой тип в конструктор класса Card

    productGrid.classList.add('catalog__cards');
    for (let i = 0; i < 15; i++) {
      const productItem = productArray[i]
      if (this.isGridView) {
        const productCard = new Card(productItem).smallCard;
        productGrid.append(productCard);
      } else {
        const productCard = new Card(productItem).smallCard;
        productGrid.append(productCard);
      }
     }

    productWrapper.appendChild(functionalBlock);
    productWrapper.appendChild(productGrid);
    catalogContext.appendChild(filtersBlock);
    catalogContext.appendChild(productWrapper);
    catalogWrapper.appendChild(catalogHeader);
    catalogWrapper.appendChild(catalogContext);



    main.appendChild(catalogWrapper);
    return main;
  }


}
