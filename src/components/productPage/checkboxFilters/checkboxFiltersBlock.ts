import { Checkbox } from "../checkbox/Checkbox";
import { Filters } from "../../../dataBase/types";

export class CheckboxBlock {
  public checkboxBlock: DocumentFragment;

  constructor(filter: Array<Filters>) {
    this.checkboxBlock = this.createCheckboxBlock(filter);
  }
//ToDo добавить обработчик handler
  private createCheckboxBlock(filter: Array<Filters>) {

    const fragment = document.createDocumentFragment();
    const categoryBlock = document.createElement('div');
    filter.map(filterUnit => {
      const rangeCheckbox = new Checkbox(filterUnit).checkbox;
      rangeCheckbox.classList.add('filters__checkbox-alignment');
      categoryBlock.append(rangeCheckbox);
    });

    fragment.appendChild(categoryBlock);
    return fragment;
  }
}
