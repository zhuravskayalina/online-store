import { Main } from '../../mainPage/Main';
import { ProductData, Filters } from '../../../dataBase/types';
import { AllFiltersBlock } from '../filters/filters';
import { CatalogMenu } from '../catalogMenu/catalogMenu';
import { Card } from '../productCard/Card';
import { CheckObject } from './CheckObjectInterface';

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
  public applyedCategoryFilters: Array<string>;
  public applyedBrandFilters: Array<string>;
  public filtersState: CheckObject;
  public priceFrom: void;
  public priceTo: void;
  public quantityFrom: void;
  public quantityTo: void;

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
    this.applyedCategoryFilters = [];
    this.applyedBrandFilters = [];
    this.filtersState = {};
    this.priceFrom = this.setLS('priceFrom', 0);
    this.priceTo = this.setLS('priceTo', 900);
    this.quantityFrom = this.setLS('quantityFrom', 0);
    this.quantityTo = this.setLS('quantityTo', 150);
  }

  //Local Storage methods
  setLS(key: string, value: string | number): void {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLS(key: string): string | null {
    return localStorage.getItem(key);
  }

  clearLSItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearLSAll(): void {
    localStorage.clear();
    this.priceFrom = this.setLS('priceFrom', 0);
    this.priceTo = this.setLS('priceTo', 900);
    this.quantityFrom = this.setLS('quantityFrom', 0);
    this.quantityTo = this.setLS('quantityTo', 150);
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

  setPriceFilter = () => {};

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

  setFilter = (
    label: string,
    categoriesList: Array<Filters>,
    brandsList: Array<Filters>
  ) => {
    //проверка содержится ли чекнутый чекбокс в массиве с категориями
    //проверка на категорию, формирование строки из категорий
    if (categoriesList.some((category) => category === label)) {
      this.applyedCategoryFilters = this.applyedCategoryFilters.includes(label)
        ? this.applyedCategoryFilters.filter((item) => item !== label)
        : [...this.applyedCategoryFilters, label];
    }
    console.log('this.applyedCategoryFilters', this.applyedCategoryFilters);
    let categoryFilters = this.applyedCategoryFilters.join('');

    //проверка на бренд, формирование строки из брендов
    if (brandsList.some((brand) => brand === label)) {
      this.applyedBrandFilters = this.applyedBrandFilters.includes(label)
        ? this.applyedBrandFilters.filter((item) => item !== label)
        : [...this.applyedBrandFilters, label];
    }
    console.log('this.applyedBrandFilters', this.applyedBrandFilters);
    let brandFilters = this.applyedBrandFilters.join('');

    this.filtersState.category = categoryFilters;
    this.filtersState.brand = brandFilters;

    // создаем массив отфильтрованных продуктов
    let filtredProducts: Array<ProductData> = [];
    //проверка на категорию
    //вариант когда выбрана категория, две ветки -  есть бренд и нет бренда
    if (this.filtersState.category) {
      if (this.filtersState.brand) {
        if (
          this.productArray.some(
            ({ brand, category }) =>
              this.filtersState.category!.includes(category) &&
              this.filtersState.brand!.includes(brand)
          )
        ) {
          filtredProducts = this.productArray.filter(({ brand, category }) => {
            return (
              brandFilters.includes(brand) && categoryFilters.includes(category)
            );
          });
        }
      }
      if (!this.filtersState.brand) {
        if (
          this.productArray.some(({ category }) =>
            this.filtersState.category!.includes(category)
          )
        ) {
          filtredProducts = this.productArray.filter(({ brand, category }) => {
            return categoryFilters.includes(category);
          });
        }
      }
    }
    //вариант когда нет категории
    if (!this.filtersState.category) {
      if (this.filtersState.brand) {
        if (
          this.productArray.some(({ brand }) =>
            this.filtersState.brand!.includes(brand)
          )
        ) {
          filtredProducts = this.productArray.filter(({ brand, category }) => {
            return brandFilters.includes(brand);
          });
        }
      }
    }
    //нет категории и нет бренда значит рисуем всю страницу
    if (!this.filtersState.category) {
      if (!this.filtersState.brand) {
        console.log(
          'NO category:',
          this.filtersState.category,
          'brand:',
          this.filtersState.brand
        );
        filtredProducts = this.productArray;
      }
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
