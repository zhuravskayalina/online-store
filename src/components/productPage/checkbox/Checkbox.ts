import {
  SnowboardBrand,
  BootsBrand,
  AccessoriesBrand,
  Category,
  BootsSize
} from '../../../dataBase/types';

type CheckboxCategories =
  SnowboardBrand
  | BootsBrand
  | AccessoriesBrand
  | Category
  | BootsSize;

type CheckboxLabel = <T extends CheckboxCategories>;

export class Checkbox {
  public checkbox: DocumentFragment;

  constructor(category: <T>) {
      this.checkbox = this.createCheckbox(category: <T>)
    }

    private createCheckbox({ category: <T>): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'name';
    // checkbox.value = 'value';
    // checkbox.id = 'id';

    const.label = document.createElement('label');
    label.htmlFor = 'id';
    label.textContent = category;

    fragment.appendChild(checkbox);

    fragment.appendChild(label);

    return fragment;
  }
}
