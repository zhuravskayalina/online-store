import { Main } from '../../mainPage/Main';
import { ProductData } from '../../../dataBase/types';
import { AllFiltersBlock } from '../filters/filters';
import { CatalogMenu } from '../catalogMenu/catalogMenu';
import { Filters } from '../../../dataBase/types';
import { Card } from '../productCard/Card';

export class Catalog {
  public catalog: HTMLElement;
  public isGridView: boolean;
  public productArray: Array<ProductData>;
  public categoriesList: Array<Filters>;
  public brandsList: Array<Filters>;

  // public pageBase: HTMLElement;
  public catalogContainer: HTMLDivElement;
  public pageContext: HTMLDivElement;
  public filtersBlock: HTMLDivElement;
  public productWrapper: HTMLDivElement;
  public catalogMenu: HTMLDivElement;
  public productBlock: HTMLDivElement;

  constructor(
    productArray: Array<ProductData>,
    categoriesList: Array<Filters>,
    brandsList: Array<Filters>
  ) {
    this.isGridView = true;
    // this.catalog = this.createCatalog(productArray, categoriesList, brandsList);
    this.productArray = productArray;
    this.categoriesList = categoriesList;
    this.brandsList = brandsList;
    this.catalogContainer = this.createCatalogContainer();
    this.pageContext = this.createCatalogContext();
    this.filtersBlock = this.createFilters(categoriesList, brandsList);
    this.productWrapper = this.createProductWrapper();
    this.catalogMenu = this.createMenu();
    this.productBlock = this.createProductBlock(productArray);
    this.catalog = this.collectCatalog();
  }

  collectCatalog() {
    const pageBase = this.createBase();
    pageBase.append(this.catalogContainer);
    // pageBase.append(this.pageContext);
    this.catalogContainer.append(this.pageContext);
    this.pageContext.append(this.filtersBlock);
    this.productWrapper.append(this.catalogMenu);
    this.productWrapper.append(this.productBlock);
    this.pageContext.append(this.productWrapper);
    return pageBase;
  }

  setView = () => {
    this.isGridView = !this.isGridView;
    console.log(this.isGridView);
    if (!this.isGridView) {
      this.productBlock.classList.remove('grid');
      this.productBlock.replaceChildren(this.createProductBlock(this.productArray));
    }
    if (this.isGridView) {
        this.productBlock.replaceChildren(this.createProductBlock(this.productArray));
    }
  };

  private createBase() {
    const main = new Main().element;
    main.classList.add('catalog');
    return main;
  }

  private createCatalogContainer() {
    const catalogWrapper = document.createElement('div');
    catalogWrapper.classList.add('catalog__container');
    const catalogHeader = document.createElement('p');

    catalogHeader.classList.add('catalog__header');
    catalogHeader.textContent = 'Catalog';

    catalogWrapper.appendChild(catalogHeader);
    return catalogWrapper;
  }

  private createCatalogContext() {
    const catalogContext = document.createElement('div');
    catalogContext.classList.add('catalog__context');
    return catalogContext;
  }

  private createFilters(
    categoriesList: Array<Filters>,
    brandsList: Array<Filters>
  ) {
    const filtersBlock = document.createElement('div');
    const filters = new AllFiltersBlock(categoriesList, brandsList)
      .allFiltersBlock;
    filtersBlock.append(filters);
    return filtersBlock;
  }

  private createMenu() {
    const catalogMenu = new CatalogMenu();
    catalogMenu.handleChangeView(this.setView);
    const functionalBlock = catalogMenu.catalogMenu;
    return functionalBlock;
  }

  private createProductWrapper() {
    const productWrapper = document.createElement('div');
    return productWrapper;
  }

  private createProductBlock(productArray: Array<ProductData>) {
    const productGrid = document.createElement('div');
    productGrid.classList.add('catalog__cards');
    console.log(this.isGridView);
    for (let i = 0; i < productArray.length; i++) {
      const productItem = productArray[i];
      if (this.isGridView) {
        const productCard = new Card(productItem).smallCard;
        productGrid.append(productCard);
        productGrid.classList.remove('table');
        productGrid.classList.add('grid');
      }
      if (!this.isGridView) {
        const productCard = new Card(productItem).smallCardTable;
        productGrid.append(productCard);
        productGrid.classList.remove('grid');
        productGrid.classList.add('table');
      }
    }
    return productGrid;
  }

  // private createCatalog(
  //   productArray: Array<ProductData>,
  //   categoriesList: Array<Filters>,
  //   brandsList: Array<Filters>
  // ): HTMLElement {
  //   const main = new Main().element;
  //   main.classList.add('catalog');
  //
  //   const catalogWrapper = document.createElement('div');
  //   const catalogHeader = document.createElement('p');
  //   const catalogContext = document.createElement('div');
  //   const filtersBlock = document.createElement('div');
  //   const productWrapper = document.createElement('div');
  //   const catalogMenu = new CatalogMenu();
  //   catalogMenu.handleChangeView(this.setView);
  //   const functionalBlock = catalogMenu.catalogMenu;
  //   const productGrid = document.createElement('div');
  //   catalogWrapper.classList.add('catalog__container');
  //
  //   catalogHeader.classList.add('catalog__header');
  //   catalogHeader.textContent = 'Catalog';
  //
  //   catalogContext.classList.add('catalog__context');
  //
  //   const filters = new AllFiltersBlock(categoriesList, brandsList)
  //     .allFiltersBlock;
  //   filtersBlock.append(filters);
  //
  //   // ToDo  здесь нужно предусмотреть отрисовку smallCardInline
  //   productGrid.classList.add('catalog__cards');
  //   console.log(this.isGridView);
  //   for (let i = 0; i < productArray.length; i++) {
  //     const productItem = productArray[i];
  //     if (this.isGridView) {
  //       const productCard = new Card(productItem).smallCard;
  //       productGrid.append(productCard);
  //       productGrid.classList.remove('table');
  //       productGrid.classList.add('grid');
  //     }
  //     if (!this.isGridView) {
  //       const productCard = new Card(productItem).smallCardTable;
  //       productGrid.append(productCard);
  //       productGrid.classList.remove('grid');
  //       productGrid.classList.add('table');
  //     }
  //   }
  //
  //   productWrapper.appendChild(functionalBlock);
  //   productWrapper.appendChild(productGrid);
  //   catalogContext.appendChild(filtersBlock);
  //   catalogContext.appendChild(productWrapper);
  //   catalogWrapper.appendChild(catalogHeader);
  //   catalogWrapper.appendChild(catalogContext);
  //
  //   main.appendChild(catalogWrapper);
  //   return main;
  // }
}
