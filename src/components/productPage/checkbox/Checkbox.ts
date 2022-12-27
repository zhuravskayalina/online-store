import { CheckboxLabelText} from './checkboxTypes';
import { Main } from '../../mainPage/Main';

export class Checkbox {

  public checkbox: DocumentFragment;

  constructor(category: CheckboxLabelText) {
    this.checkbox = this.createCheckbox(category);
  }

  private createCheckbox(category: CheckboxLabelText): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const formForInput = document.createElement('form');
    const inputCheckbox = document.createElement('input')
    const label = document.createElement('label');

    inputCheckbox.classList.add('filters_checkbox-custom');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.id = `checkbox-${category.toString().toLowerCase()}`;

    inputCheckbox.classList.add('filters_label');
    label.htmlFor = `checkbox-${category.toString().toLowerCase()}`;
    label.textContent = category.toString();

    formForInput.appendChild(inputCheckbox);
    formForInput.appendChild(label);
    fragment.appendChild(formForInput);

    return fragment;
  }
}
