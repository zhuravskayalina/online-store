import { CheckboxLabelText } from './checkboxTypes';
import { Filters } from '../../../dataBase/types';
import { categoriesList, brandsList } from '../../../dataBase/filtersList';

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

    inputCheckbox.classList.add('filters_checkbox-custom');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.id = `checkbox-${category.toString().toLowerCase()}`;

    inputCheckbox.classList.add('filters_label');
    label.htmlFor = `checkbox-${category.toString().toLowerCase()}`;
    label.textContent = category.toString();

    formForInput.appendChild(inputCheckbox);
    formForInput.appendChild(label);
    // console.log(category);
    return formForInput;
  }
}

/*
import { CheckboxLabelText } from './checkboxTypes';

export class Checkbox {
  public checkbox: HTMLFormElement;

  constructor(category: CheckboxLabelText) {
    this.checkbox = this.createCheckbox(category);
  }

  handleChange(callback: (category: Filters) => void, category: Filters) {
    this.checkbox.addEventListener('change', () => {
      callback(category);
    });
  }

  private createCheckbox(category: CheckboxLabelText): HTMLFormElement {
    const formForInput = document.createElement('form');
    const inputCheckbox = document.createElement('input');
    const label = document.createElement('label');

    inputCheckbox.classList.add('filters_checkbox-custom');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.id = `checkbox-${category.toString().toLowerCase()}`;

    inputCheckbox.classList.add('filters_label');
    label.htmlFor = `checkbox-${category.toString().toLowerCase()}`;
    label.textContent = category.toString();

    formForInput.appendChild(inputCheckbox);
    formForInput.appendChild(label);
    // console.log(category);
    return formForInput;
  }
}
 */
