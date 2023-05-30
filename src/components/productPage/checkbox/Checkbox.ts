import { CheckboxLabelText } from './checkboxTypes';
import { Filters } from '../../../dataBase/types';

export class Checkbox {
  public checkbox: HTMLFormElement;

  constructor(category: CheckboxLabelText) {
    this.checkbox = this.createCheckbox(category);
  }

  handleChange(
    callback: (
      category: Filters,
      categoriesList: Array<Filters>,
      brandsList: Array<Filters>
    ) => void,
    category: Filters,
    categoriesList: Array<Filters>,
    brandsList: Array<Filters>
  ) {
    this.checkbox.addEventListener('change', () => {
      callback(category, categoriesList, brandsList);
    });
  }

  private createCheckbox(category: CheckboxLabelText): HTMLFormElement {
    const formForInput = document.createElement('form');
    const inputCheckbox = document.createElement('input');
    const label = document.createElement('label');

    inputCheckbox.classList.add('filters__checkbox-custom');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.id = `checkbox-${category.toString().toLowerCase()}`;

    inputCheckbox.classList.add('filters__label');
    label.htmlFor = `checkbox-${category.toString().toLowerCase()}`;
    label.textContent = category.toString();

    formForInput.appendChild(inputCheckbox);
    formForInput.appendChild(label);
    // console.log(category);
    return formForInput;
  }
}
