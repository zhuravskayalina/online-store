import { Main } from "../../mainPage/Main";
import { ProductData, SnowboardBrand, BootsBrand, AccessoriesBrand, Category  } from "../../../dataBase/types";
import { AllFiltersBlock } from '../filters/filters';
import { categoriesList, brandsList } from '../../../dataBase/filtersList';
import { CatalogMenu } from '../catalogMenu/catalogMenu';

// ToDo написать здесь класс для сборки итоговой страницы. Отдельно сделать класс с фильтрами, отдельно с продуктовой сеткой

export class Catalog {
  public catalog: HTMLElement;

  constructor(productUnit: ProductData) {
    this.catalog = this.createCatalog(productUnit);
  }

  private createCatalog(productUnit: ProductData): HTMLElement {
    const main = new Main().element;
    main.classList.add('catalog'); //todo class

    const catalogWrapper = document.createElement('div');
    const catalogHeader = document.createElement('p');
    const catalogContext = document.createElement('div'); // todo display-grid
    const filtersBlock = document.createElement('div');
    const productWrapper = document.createElement('div');
    const functionalBlock  = new CatalogMenu().catalogMenu;
    const constProductGrid = document.createElement('div');

    catalogWrapper.classList.add('catalog__container');

    catalogHeader.classList.add('catalog__header');
    catalogHeader.textContent = 'Catalog';

    catalogContext.classList.add('catalog__context');

    const filters = new AllFiltersBlock(categoriesList, brandsList).allFiltersBlock;
    filtersBlock.append(filters);

    productWrapper.appendChild(functionalBlock);
    productWrapper.appendChild(constProductGrid);
    catalogContext.appendChild(filtersBlock);
    catalogContext.appendChild(productWrapper);
    catalogWrapper.appendChild(catalogHeader);
    catalogWrapper.appendChild(catalogContext);


    main.appendChild(catalogWrapper);
    return main;
  }


}
