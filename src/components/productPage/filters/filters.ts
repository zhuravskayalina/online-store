import { CheckboxBlock } from "../checkboxFilters/checkboxFiltersBlock";
import { Filters } from "../../../dataBase/types";

// ToDo здесь собрать блок из чекбоксов и ползунков - добавить ползунки. Сделала через заголовки

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
    const stockHeader = document.createElement('p');

    categoriesHeader.classList.add('filters__header');
    categoriesHeader.textContent = 'Categories';

    //ToDo как сделать отступы между блоками? можно добавить в класс, но мне кажется это неправильно т.к. класс описывает независимый блок
    brandsHeader.classList.add('filters__header');
    brandsHeader.textContent = 'Brand';

    priceHeader.classList.add('filters__header');
    priceHeader.textContent = 'Price';

    stockHeader.classList.add('filters__header');
    stockHeader.textContent = 'Stock';

    fragment.appendChild(categoriesHeader);
    fragment.appendChild(assortmentSet);
    fragment.appendChild(brandsHeader);
    fragment.appendChild(brandsSet);
    fragment.appendChild(priceHeader);
    fragment.appendChild(stockHeader);

    return fragment;
  }
}
