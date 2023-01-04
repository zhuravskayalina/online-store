import { CheckboxBlock } from "../checkboxFilters/checkboxFiltersBlock";
import { Filters } from "../../../dataBase/types";
import { DualSlider } from '../dualSlider/DualSlider';

export class AllFiltersBlock {
  public allFiltersBlock: DocumentFragment;

  constructor(categories: Array<Filters>, brands: Array<Filters>) {
    this.allFiltersBlock = this.createAllFiltersBlock(categories, brands);
  }

  private createAllFiltersBlock(categories: Array<Filters>, brands: Array<Filters>): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const categoriesHeader = document.createElement('p');
    const assortmentSet = new CheckboxBlock(categories).checkboxBlock;
    const brandsHeader = document.createElement('p');
    const brandsSet = new CheckboxBlock(brands).checkboxBlock;
    const priceHeader = document.createElement('p');
    const priceSlider = new DualSlider().priceSlider;
    const stockHeader = document.createElement('p');
    const stockSlider = new DualSlider().quantitySlider;

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
