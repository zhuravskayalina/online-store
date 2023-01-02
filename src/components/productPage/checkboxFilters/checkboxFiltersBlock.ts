import { Checkbox } from "../checkbox/Checkbox";
import { Filters } from "../../../dataBase/types";

export class CheckboxBlock {
  public checkboxBlock: DocumentFragment;

  constructor(filter: Array<Filters>) {
    this.checkboxBlock = this.createCheckboxBlock(filter);
  }

  private createCheckboxBlock(filter: Array<Filters>) {

    const fragment = document.createDocumentFragment();
    const categoryBlock = document.createElement('div');
    filter.map(element => {
      const rangeCheckbox = new Checkbox(element).checkbox;
      rangeCheckbox.classList.add('filters__checkbox-alignment');
      categoryBlock.append(rangeCheckbox);
    });

    fragment.appendChild(categoryBlock);
    return fragment;
  }
}
