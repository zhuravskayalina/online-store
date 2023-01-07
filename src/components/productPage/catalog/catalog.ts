import { Main } from '../../mainPage/Main';
import { ProductData, Filters } from '../../../dataBase/types';
import { AllFiltersBlock } from '../filters/filters';
import { CatalogMenu } from '../catalogMenu/catalogMenu';
import { Card } from '../productCard/Card';
import { categoriesList } from '../../../dataBase/filtersList';

const bannerPath = require('../../../assets/images/banner.jpg');

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
  public applyedFilters: Array<string>;

  constructor(
    productArray: Array<ProductData>,
    categoriesList: Array<Filters>,
    brandsList: Array<Filters>
  ) {
    this.isGridView = true;
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
    this.applyedFilters = [];
  }

  collectCatalog() {
    const pageBase = this.createBase();
    pageBase.append(this.catalogContainer);
    this.catalogContainer.append(this.pageContext);
    this.pageContext.append(this.filtersBlock);
    this.productWrapper.append(this.catalogMenu);
    this.productWrapper.append(this.productBlock);
    this.pageContext.append(this.productWrapper);
    return pageBase;
  }

  setView = () => {
    this.isGridView = !this.isGridView;
    if (!this.isGridView) {
      this.productBlock.replaceChildren(
        this.createProductBlock(this.productArray)
      );
    }
    if (this.isGridView) {
      this.productBlock.replaceChildren(
        this.createProductBlock(this.productArray)
      );
    }
  };

  setFilter = (label: string) => {
    this.applyedFilters = this.applyedFilters.includes(label)
      ? this.applyedFilters.filter((item) => item !== label)
      : [...this.applyedFilters, label];
    const filters = this.applyedFilters.join('');

    let filtredProducts: Array<ProductData> = [];
    if (
      this.productArray.some(
        ({ brand, category }) =>
          filters.includes(brand) && filters.includes(category)
      )
    ) {
      filtredProducts = this.productArray.filter(({ brand, category }) => {
        return filters.includes(brand) && filters.includes(category);
      });
    } else if (
      this.productArray.some(
        ({ brand, category }) =>
          filters.includes(brand) && !filters.includes(category)
      )
    ) {
      filtredProducts = this.productArray.filter(({ brand }) => {
        return filters.includes(brand);
      });
      console.log('filtredProducts:', filtredProducts);
    } else if (
      this.productArray.some(
        ({ brand, category }) =>
          !filters.includes(brand) && filters.includes(category)
      )
    ) {
      filtredProducts = this.productArray.filter(({ category }) => {
        return filters.includes(category);
      });
    } else {
      filtredProducts = this.productArray;
    }
    this.productBlock.replaceChildren(this.createProductBlock(filtredProducts));
    this.productBlock.classList.remove('grid');
  };

  private createBase() {
    const main = new Main().element;
    main.classList.add('catalog');
    return main;
  }

  private createCatalogContainer() {
    const catalogWrapper = document.createElement('div');
    catalogWrapper.classList.add('catalog__container');

    const catalogBanner = document.createElement('img');
    catalogBanner.classList.add('catalog__banner');
    catalogBanner.src = bannerPath;
    catalogBanner.alt = 'Banner';
    catalogWrapper.append(catalogBanner);

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
    const filters = new AllFiltersBlock(
      categoriesList,
      brandsList,
      this.setFilter
    ).allFiltersBlock;
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
    for (let i = 0; i < productArray.length; i++) {
      const productItem = productArray[i];
      if (this.isGridView) {
        const productCard = new Card(productItem).smallCard;
        productCard.addEventListener('click', function () {});
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
}
