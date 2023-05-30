import { Checkbox } from '../checkbox/Checkbox';
import { Filters } from '../../../dataBase/types';
import { categoriesList, brandsList } from '../../../dataBase/filtersList';

export class CheckboxBlock {
  public checkboxBlock: DocumentFragment;

  constructor(
    filter: Array<Filters>,
    setFilters: (
      category: Filters,
      categoriesList: Array<Filters>,
      brandsList: Array<Filters>
    ) => void
  ) {
    this.checkboxBlock = this.createCheckboxBlock(filter, setFilters);
  }

  private createCheckboxBlock(
    filter: Array<Filters>,
    setFilters: (
      category: Filters,
      categoriesList: Array<Filters>,
      brandList: Array<Filters>
    ) => void
  ) {
    const fragment = document.createDocumentFragment();
    const categoryBlock = document.createElement('div');
    filter.map((filterUnit) => {
      const checkbox = new Checkbox(filterUnit);
      const rangeCheckbox = checkbox.checkbox;
      checkbox.handleChange(setFilters, filterUnit, categoriesList, brandsList);
      rangeCheckbox.classList.add('filters__checkbox-alignment');
      categoryBlock.append(rangeCheckbox);
    });

    fragment.appendChild(categoryBlock);
    return fragment;
  }
}
