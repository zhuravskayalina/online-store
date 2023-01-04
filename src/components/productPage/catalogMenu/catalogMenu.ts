import { SelectSort } from '../selectSort/selectSort';
import { ProductData } from '../../../dataBase/types';

export class CatalogMenu {
  public catalogMenu: HTMLDivElement;
  public changeViewButton: HTMLButtonElement;
  public isGridView: boolean;
  public copyLinkButton: HTMLButtonElement;
  public resetFiltersButton: HTMLButtonElement;
  public selectSortContainer: HTMLDivElement;
  private selectSort: HTMLSelectElement;

  constructor() {
    this.isGridView = true;
    this.catalogMenu = this.createMenu();
    this.copyLinkButton = this.createCopyLinkButton();
    this.changeViewButton = this.createChangeViewButton();
    this.resetFiltersButton = this.createResetFiltersButton();
    this.selectSort = new SelectSort().selectList;
    this.selectSortContainer = this.createSelectSortContainer();

    this.catalogMenu.append(this.copyLinkButton);
    this.catalogMenu.append(this.resetFiltersButton);
    this.catalogMenu.append(this.selectSortContainer);
    this.catalogMenu.append(this.changeViewButton);
  }

  handleChangeView(handler: () => void) {
    this.changeViewButton.addEventListener('click', () => {
      handler();
      this.isGridView = !this.isGridView;
      this.changeViewButton.replaceChildren(this.createNewIconViewButton());
    });
  }

  private createResetFiltersButton() {
    const resetFiltersButton = document.createElement('button');
    resetFiltersButton.classList.add('catalog__menu-buttons');
    const iconReset = document.createElement('span');
    iconReset.classList.add('icon-reset', 'catalog__icon-pos');
    resetFiltersButton.append(iconReset);
    resetFiltersButton.append('Reset filters');
    resetFiltersButton.type = 'button';
    return resetFiltersButton;
  }


  private createChangeViewButton() {
    const gridButton = document.createElement('button');
    gridButton.classList.add('catalog__menu-buttons');
    const iconGrid = document.createElement('span');
    iconGrid.classList.add('icon-list');

    gridButton.append(iconGrid);
    gridButton.type = 'button';
    return gridButton;
  }

  private createNewIconViewButton() {
    const iconGrid = document.createElement('span');
    if (this.isGridView) {
      iconGrid.classList.add('icon-list');
    }
    if (!this.isGridView) {
      iconGrid.classList.add('icon-grid');
    }
    return iconGrid;
  }

  private createCopyLinkButton() {
    const copyLinkButton = document.createElement('button');
    copyLinkButton.classList.add('catalog__menu-buttons');
    const iconCopyLink = document.createElement('span');
    iconCopyLink.classList.add('icon-copy', 'catalog__icon-pos');
    copyLinkButton.append(iconCopyLink);
    copyLinkButton.append('Copy Link');
    copyLinkButton.type = 'button';
    return copyLinkButton;
  }

  private createSelectSortContainer() {
    const selectContainer = document.createElement('div');
    selectContainer.classList.add('catalog__menu-sort');

    const selectFormArrow = document.createElement('span');
    selectFormArrow.classList.add('icon-arrow', 'catalog__menu-sort-arrow');

    selectContainer.append(this.selectSort, selectFormArrow);
    return selectContainer;
  }

  private createMenu(): HTMLDivElement {
    const menuBlock = document.createElement('div');
    menuBlock.classList.add('catalog__menu');

    return menuBlock;
  }
}
