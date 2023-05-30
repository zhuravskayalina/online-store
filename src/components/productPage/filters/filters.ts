import { CheckboxBlock } from '../checkboxFilters/checkboxFiltersBlock';
import { Filters } from '../../../dataBase/types';
import { DualSlider } from '../dualSlider/DualSlider';

export class AllFiltersBlock {
  public allFiltersBlock: DocumentFragment;

  constructor(
    categories: Array<Filters>,
    brands: Array<Filters>,
    setFilters: (
      category: Filters,
      categoriesList: Array<Filters>,
      brandsList: Array<Filters>
    ) => void,
    getPriceFilter: (min: number, max: number) => void,
    getQuantityFilter: (min: number, max: number) => void
  ) {
    this.allFiltersBlock = this.createAllFiltersBlock(
      categories,
      brands,
      setFilters,
      getPriceFilter,
      getQuantityFilter
    );
  }

  private createAllFiltersBlock(
    categories: Array<Filters>,
    brands: Array<Filters>,
    setFilters: (
      category: Filters,
      categoriesList: Array<Filters>,
      brandsList: Array<Filters>
    ) => void,
    getPriceFilter: (min: number, max: number) => void,
    getQuantityFilter: (min: number, max: number) => void
  ): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const categoriesHeader = document.createElement('p');
    const assortmentSet = new CheckboxBlock(categories, setFilters)
      .checkboxBlock;
    const brandsHeader = document.createElement('p');
    const brandsSet = new CheckboxBlock(brands, setFilters).checkboxBlock;
    const priceHeader = document.createElement('p');
    const priceInput = new DualSlider();
    const stockSlider = priceInput.quantitySlider;
    const priceSlider = priceInput.priceSlider;
    priceInput.handleChangeInput(getPriceFilter, getQuantityFilter);
    const stockHeader = document.createElement('p');
    // const stockSlider = new DualSlider().quantitySlider;

    categoriesHeader.classList.add('filters__header');
    categoriesHeader.textContent = 'Categories';

    brandsHeader.classList.add('filters__header');
    brandsHeader.textContent = 'Brand';

    priceHeader.classList.add('filters__header');
    priceHeader.textContent = 'Price';

    stockHeader.classList.add('filters__header', 'filters__header_stock');
    stockHeader.textContent = 'Stock';

    fragment.appendChild(categoriesHeader);
    fragment.appendChild(assortmentSet);
    fragment.appendChild(brandsHeader);
    fragment.appendChild(brandsSet);
    fragment.appendChild(priceHeader);
    fragment.appendChild(priceSlider);
    fragment.appendChild(stockHeader);
    fragment.appendChild(stockSlider);

    return fragment;
  }
}
