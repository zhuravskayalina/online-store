import { Checkbox } from '../checkbox/Checkbox';
import { Filters } from '../../../dataBase/types';
import { categoriesList, brandsList } from '../../../dataBase/filtersList';

export class CheckboxBlock {
  public checkboxBlock: DocumentFragment;

  constructor(filter: Array<Filters>, setFilters: (category: string) => void) {
    this.checkboxBlock = this.createCheckboxBlock(filter, setFilters);
  }

  private createCheckboxBlock(
    filter: Array<Filters>,
    setFilters: (category: string) => void
  ) {
    const fragment = document.createDocumentFragment();
    const categoryBlock = document.createElement('div');
    filter.map((filterUnit) => {
      const checkbox = new Checkbox(filterUnit, categoriesList, brandsList);
      const rangeCheckbox = checkbox.checkbox;
      checkbox.handleChange(setFilters, filterUnit, categoriesList, brandsList);
      rangeCheckbox.classList.add('filters__checkbox-alignment');
      categoryBlock.append(rangeCheckbox);
    });

    fragment.appendChild(categoryBlock);
    return fragment;
  }
}
