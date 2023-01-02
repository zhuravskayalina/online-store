export class SelectSort {
  public selectForme: HTMLFormElement;

  constructor() {
    this.selectForme = this.createSelectForme();
  }

  createSelectForme(): HTMLFormElement {
    const selectForme = document.createElement('form');
    const selectList = document.createElement('select');
    const selectOptionEmpty = document.createElement('option');
    const selectOptionPrice = document.createElement('option');
    const selectOptionRating = document.createElement('option');

    selectList.classList.add('catalog__select-list');

    selectOptionEmpty.classList.add('catalog__sort-option');
    selectOptionEmpty.value = 'no-sort';
    selectOptionEmpty.textContent = 'Sort by';
    selectOptionEmpty.setAttribute('selected', 'selected');

    selectOptionPrice.classList.add('catalog__sort-option');
    selectOptionPrice.value = 'sort-by-price';
    selectOptionPrice.textContent = 'by price';

    selectOptionRating.classList.add('catalog__sort-option');
    selectOptionRating.value = 'sort-by-rating';
    selectOptionRating.textContent = 'by rating';

    selectList.appendChild(selectOptionEmpty);
    selectList.appendChild(selectOptionPrice);
    selectList.appendChild(selectOptionRating);

    selectForme.appendChild(selectList);

    return selectForme;
  }

}
