import { SelectSort } from '../selectSort/selectSort';

export class CatalogMenu {
  public catalogMenu: HTMLDivElement;

  constructor() {
    this.catalogMenu = this.createMenu();
  }

  private createMenu(): HTMLDivElement{
    const menuBlock = document.createElement('div');
    const filtersResetButton = document.createElement('button');
    const copyLinkButton = document.createElement('button');
    const selectContainer = document.createElement('div');
    const selectForm = new SelectSort().selectForme;
    const selectFormArrow = document.createElement('span');
    const gridButton = document.createElement('button');
    const emptyDiv = document.createElement('div');

    selectContainer.classList.add('catalog__menu-sort');
    selectForm.classList.add('catalog__menu-form');
    selectFormArrow.classList.add('icon-arrow', 'catalog__menu-sort-arrow');

    menuBlock.classList.add('catalog__menu');

    filtersResetButton.classList.add('catalog__menu-buttons');
    const iconReset = document.createElement('span');
    iconReset.classList.add('icon-reset', 'catalog__icon-pos');
    filtersResetButton.append(iconReset);
    filtersResetButton.append('Reset filters');
    filtersResetButton.type = 'button';

    copyLinkButton.classList.add('catalog__menu-buttons');
    const iconCopyLink = document.createElement('span');
    iconCopyLink.classList.add('icon-copy', 'catalog__icon-pos');
    copyLinkButton.append(iconCopyLink);
    copyLinkButton.append('Copy Link');
    copyLinkButton.type = 'button';

    gridButton.classList.add('catalog__menu-buttons');
    const iconGrid = document.createElement('span');
    iconGrid.classList.add('icon-list');
    gridButton.append(iconGrid);
    gridButton.type = 'button';

    emptyDiv.classList.add('catalog__menu-empty-div');
    emptyDiv.textContent = '';

    menuBlock.append(filtersResetButton);
    menuBlock.append(copyLinkButton);
    menuBlock.append(emptyDiv);
    selectContainer.append(selectForm);
    selectContainer.append(selectFormArrow);
    menuBlock.append(selectContainer);
    menuBlock.append(gridButton);

    return menuBlock;
  }
}
