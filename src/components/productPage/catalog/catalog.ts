import { Main } from '../../mainPage/Main';
import { Filters, ProductData } from '../../../dataBase/types';
import { AllFiltersBlock } from '../filters/filters';
import { CatalogMenu } from '../catalogMenu/catalogMenu';
import { CheckObject } from './CheckObjectInterface';
import { EmptyProductList } from '../notFoundProducts/emptyProductList';
import { SmallCard } from '../productCard/smallCard/SmallCard';

const bannerPath = require('../../../assets/images/banner.jpg');

export class Catalog {
  public catalog: HTMLElement;
  public isGridView: boolean;
  public productArray: Array<ProductData>;
  public categoriesList: Array<Filters>;
  public brandsList: Array<Filters>;
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
  public filtredByPriceProducts: Array<ProductData>;
  public filtredByQuantityProducts: Array<ProductData>;
  public filtredByCheckboxProducts: Array<ProductData>;
  public filtredBySliderProducts: Array<ProductData>;
  public filtredByAllFiltersProducts: Array<ProductData>;
  public quantityInscription: HTMLParagraphElement;
  public sortBy: string;

  constructor(
    productArray: Array<ProductData>,
    categoriesList: Array<Filters>,
    brandsList: Array<Filters>
  ) {
    this.applyedFilters = [];
    this.applyedCategoryFilters = [];
    this.applyedBrandFilters = [];
    this.filtersState = {};
    this.filtredByPriceProducts = productArray;
    this.filtredByQuantityProducts = productArray;
    this.filtredByCheckboxProducts = productArray;
    this.filtredBySliderProducts = productArray;
    this.filtredByAllFiltersProducts = productArray;
    this.isGridView = true;
    this.productArray = productArray;
    this.categoriesList = categoriesList;
    this.brandsList = brandsList;
    this.sortBy = 'sort-by-nocondition';

    this.catalogContainer = this.createCatalogContainer();
    this.pageContext = this.createCatalogContext();
    this.filtersBlock = this.createFilters(categoriesList, brandsList);
    this.productWrapper = this.createProductWrapper();
    this.quantityInscription = this.createQuantityInscription();
    this.catalogMenu = this.createMenu();
    this.productBlock = this.createProductBlock(productArray);
    this.catalog = this.collectCatalog();
  }

  createQuantityInscription() {
    return document.createElement('p');
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

  getPriceValue = (min: number, max: number): void => {
    this.filtredByPriceProducts = this.productArray.filter(
      ({ price }) => price >= min && price <= max
    );
    this.getSliderFiltersProducts();
    this.renderingByFilters();
  };

  setSortPriseRating = (filterType: string): void => {
    this.sortBy = filterType;
    if (filterType === 'sort-by-price') {
      this.filtredByAllFiltersProducts = this.filtredByAllFiltersProducts.sort(
        (a, b) => a.price - b.price
      );
      this.filtredByQuantityProducts = this.filtredByQuantityProducts.sort(
        (a, b) => a.price - b.price
      );
      this.filtredByPriceProducts = this.filtredByPriceProducts.sort(
        (a, b) => a.price - b.price
      );
      this.filtredBySliderProducts = this.filtredBySliderProducts.sort(
        (a, b) => a.price - b.price
      );
    }
    if (filterType === 'sort-by-rating') {
      this.filtredByAllFiltersProducts = this.filtredByAllFiltersProducts.sort(
        (a, b) => a.rating - b.rating
      );
      this.filtredByQuantityProducts = this.filtredByQuantityProducts.sort(
        (a, b) => a.rating - b.rating
      );
      this.filtredByPriceProducts = this.filtredByPriceProducts.sort(
        (a, b) => a.rating - b.rating
      );
      this.filtredBySliderProducts = this.filtredBySliderProducts.sort(
        (a, b) => a.rating - b.rating
      );
    }
    this.renderingByFilters();
  };

  getQuantityValue = (min: number, max: number): void => {
    this.filtredByQuantityProducts = this.productArray.filter(
      ({ quantity }) => quantity >= min && quantity <= max
    );
    this.getSliderFiltersProducts();
    this.renderingByFilters();
  };

  setView = () => {
    this.isGridView = !this.isGridView;
    if (!this.isGridView) {
      this.renderingByFilters();
    }
    if (this.isGridView) {
      this.renderingByFilters();
    }
  };

  //код в двух функциях ниже повторяется, была идея написать общую, но в
  // таком случае нужно передавать как параметр итоговый массив который
  // изначально содержит вообще все продукты, а потом переназначается.
  // ESlint запрещает переназначение переменной

  // private getCommonForAllFiltersProducts(
  //   firstArray: Array<ProductData>,
  //   secondArray: Array<ProductData>,
  //   summaryArray: Array<ProductData>
  // ) {
  //   const filtredByAllFiltersProducts = [];
  //   for (let i = 0; i < firstArray.length; i++) {
  //     if (
  //       secondArray.find(
  //         (product: ProductData) =>
  //           JSON.stringify(product) === JSON.stringify(firstArray[i])
  //       )
  //     ) {
  //       filtredByAllFiltersProducts.push(firstArray[i]);
  //     }
  //   }
  //   summaryArray = filtredByAllFiltersProducts;
  // }

  private getSliderFiltersProducts() {
    const filtredBySliderProducts = [];
    for (let i = 0; i < this.filtredByPriceProducts.length; i++) {
      if (
        this.filtredByQuantityProducts.find(
          (product) =>
            JSON.stringify(product) ===
            JSON.stringify(this.filtredByPriceProducts[i])
        )
      ) {
        filtredBySliderProducts.push(this.filtredByPriceProducts[i]);
      }
    }
    this.filtredBySliderProducts = filtredBySliderProducts;
  }

  private getCommonForAllFiltersProducts() {
    const filtredByAllFiltersProducts = [];
    for (let i = 0; i < this.filtredByCheckboxProducts.length; i++) {
      if (
        this.filtredBySliderProducts.find(
          (product) =>
            JSON.stringify(product) ===
            JSON.stringify(this.filtredByCheckboxProducts[i])
        )
      ) {
        filtredByAllFiltersProducts.push(this.filtredByCheckboxProducts[i]);
      }
    }
    this.filtredByAllFiltersProducts = filtredByAllFiltersProducts;
    if (this.sortBy === 'sort-by-price') {
      this.filtredByAllFiltersProducts = this.filtredByAllFiltersProducts.sort(
        (a, b) => a.price - b.price
      );
    }
    if (this.sortBy === 'sort-by-rating') {
      this.filtredByAllFiltersProducts = this.filtredByAllFiltersProducts.sort(
        (a, b) => a.rating - b.rating
      );
    }
  }

  private renderingByFilters() {
    this.getCommonForAllFiltersProducts();
    this.quantityInscription.textContent = `Found: ${this.filtredByAllFiltersProducts.length}`;
    if (this.filtredByAllFiltersProducts.length === 0) {
      this.productBlock.replaceChildren(this.createEmptyProductlist());
    } else {
      this.productBlock.replaceChildren(
        this.createProductBlock(this.filtredByAllFiltersProducts)
      );
      this.productBlock.classList.remove('grid');
    }
  }

  setResetFilters = () => {
    this.filtredByAllFiltersProducts = this.productArray;
    this.filtredByQuantityProducts = this.productArray;
    this.filtredByPriceProducts = this.productArray;
    this.filtredBySliderProducts = this.productArray;
    this.filtredByCheckboxProducts = this.productArray;
    this.sortBy = 'sort-by-nocondition';
    this.filtersState = {};
    this.applyedCategoryFilters = [];
    this.applyedBrandFilters = [];
    this.filtersBlock = this.createFilters(
      this.categoriesList,
      this.brandsList
    );
    this.pageContext.replaceChild(
      this.filtersBlock,
      this.pageContext.firstChild!
    );
    this.renderingByFilters();
  };

  setFilter = (
    label: string,
    categoriesList: Array<Filters>,
    brandsList: Array<Filters>
  ) => {
    if (categoriesList.some((category) => category === label)) {
      this.applyedCategoryFilters = this.applyedCategoryFilters.includes(label)
        ? this.applyedCategoryFilters.filter((item) => item !== label)
        : [...this.applyedCategoryFilters, label];
    }
    let categoryFilters = this.applyedCategoryFilters.join('');

    if (brandsList.some((brand) => brand === label)) {
      this.applyedBrandFilters = this.applyedBrandFilters.includes(label)
        ? this.applyedBrandFilters.filter((item) => item !== label)
        : [...this.applyedBrandFilters, label];
    }

    let brandFilters = this.applyedBrandFilters.join('');

    this.filtersState.category = categoryFilters;
    this.filtersState.brand = brandFilters;

    if (this.filtersState.category) {
      if (this.filtersState.brand) {
        if (
          this.productArray.some(
            ({ brand, category }) =>
              this.filtersState.category!.includes(category) &&
              this.filtersState.brand!.includes(brand)
          )
        ) {
          this.filtredByCheckboxProducts = this.productArray.filter(
            ({ brand, category }) => {
              return (
                brandFilters.includes(brand) &&
                categoryFilters.includes(category)
              );
            }
          );
          this.renderingByFilters();
        } else {
          this.filtredByCheckboxProducts = [];
          this.renderingByFilters();
        }
      }
      if (!this.filtersState.brand) {
        if (
          this.productArray.some(({ category }) =>
            this.filtersState.category!.includes(category)
          )
        ) {
          this.filtredByCheckboxProducts = this.productArray.filter(
            ({ category }) => {
              return categoryFilters.includes(category);
            }
          );
          this.renderingByFilters();
        }
      }
    }
    if (!this.filtersState.category) {
      if (this.filtersState.brand) {
        if (
          this.productArray.some(({ brand }) =>
            this.filtersState.brand!.includes(brand)
          )
        ) {
          this.filtredByCheckboxProducts = this.productArray.filter(
            ({ brand }) => {
              return brandFilters.includes(brand);
            }
          );
          this.renderingByFilters();
        }
      }
    }
    if (!this.filtersState.category) {
      if (!this.filtersState.brand) {
        this.filtredByCheckboxProducts = this.productArray;
        this.renderingByFilters();
      }
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
      this.setFilter,
      this.getPriceValue,
      this.getQuantityValue
    ).allFiltersBlock;
    filtersBlock.append(filters);
    return filtersBlock;
  }

  private createMenu() {
    const catalogMenu = new CatalogMenu(
      this.filtredByAllFiltersProducts.length,
      this.setSortPriseRating
    );
    catalogMenu.handleChangeView(this.setView);
    catalogMenu.handleResetFilters(this.setResetFilters);
    const functionalBlock = catalogMenu.catalogMenu;
    this.quantityInscription = catalogMenu.filtredProductsQuantityInscription;
    return functionalBlock;
  }

  private createProductWrapper() {
    return document.createElement('div');
  }

  private createProductBlock(productArray: Array<ProductData>) {
    const productGrid = document.createElement('div');
    productGrid.classList.add('catalog__cards');
    for (let i = 0; i < productArray.length; i++) {
      const productItem = productArray[i];
      if (this.isGridView) {
        const productCard = new SmallCard(productItem, false).cardContainer;
        productCard.addEventListener('click', function () {});
        productGrid.append(productCard);
        productGrid.classList.remove('table');
        productGrid.classList.add('grid');
      }
      if (!this.isGridView) {
        const productCard = new SmallCard(productItem, true).cardContainer;
        productGrid.append(productCard);
        productGrid.classList.remove('grid');
        productGrid.classList.add('table');
      }
    }
    return productGrid;
  }

  createEmptyProductlist() {
    return new EmptyProductList().emptyProductList;
  }
}
