import { Main } from "../../mainPage/Main";
import { ProductData } from "../../../dataBase/types";
import { AllFiltersBlock } from '../filters/filters';
import { CatalogMenu } from '../catalogMenu/catalogMenu';
import { Filters} from '../../../dataBase/types';
import { Card } from '../productCard/Card';


// ToDo написать здесь класс для сборки итоговой страницы. Отдельно сделать класс с фильтрами, отдельно с продуктовой сеткой

export class Catalog {
  public catalog: HTMLElement;

  constructor(productArray: Array<ProductData>, categoriesList: Array<Filters>, brandsList: Array<Filters>) {
    this.catalog = this.createCatalog(productArray, categoriesList, brandsList);
  }

  private createCatalog(productArray: Array<ProductData>, categoriesList: Array<Filters>, brandsList: Array<Filters>): HTMLElement {
    const main = new Main().element;
    main.classList.add('catalog'); //todo class

    const catalogWrapper = document.createElement('div');
    const catalogHeader = document.createElement('p');
    const catalogContext = document.createElement('div'); // todo display-grid
    const filtersBlock = document.createElement('div');
    const productWrapper = document.createElement('div');
    const functionalBlock = new CatalogMenu().catalogMenu;
    const productGrid = document.createElement('div');

    catalogWrapper.classList.add('catalog__container');

    catalogHeader.classList.add('catalog__header');
    catalogHeader.textContent = 'Catalog';

    catalogContext.classList.add('catalog__context');

    const filters = new AllFiltersBlock(categoriesList, brandsList).allFiltersBlock;
    filtersBlock.append(filters);

    productGrid.classList.add('catalog__cards');
    for (let i = 0; i < 15; i++) {
      const productItem = productArray[i];
      const productCard = new Card(productItem).smallCard;
      productGrid.append(productCard);
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
