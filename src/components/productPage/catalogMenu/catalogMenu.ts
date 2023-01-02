import { SelectSort } from '../selectSort/selectSort';

export class CatalogMenu {
  public catalogMenu: DocumentFragment;

  constructor() {
    this.catalogMenu = this.createMenu();
  }

  private createMenu(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const filtersResetButton = document.createElement('button');
    const copyLinkButton = document.createElement('button');
    const selectForm = new SelectSort().selectForme;
    const grigButton = document.createElement('button');

    filtersResetButton.classList.add('catalog__menu-reset');
    filtersResetButton.textContent = 'Reset filters'

    fragment.append(filtersResetButton);
    fragment.append(copyLinkButton);
    fragment.append(selectForm);
    fragment.append(grigButton);

    return fragment;
  }
}
