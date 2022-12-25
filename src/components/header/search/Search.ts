export class Search {
  public element: HTMLDivElement;

  constructor() {
    this.element = this.createSearch();
  }

  createSearch(): HTMLDivElement {
    const searchBox = document.createElement('div');
    searchBox.classList.add('search-wrapper');

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.classList.add('search-input');
    input.setAttribute('placeholder', 'Search...');

    const icon = document.createElement('span');
    icon.classList.add('icon-search', 'search-input__icon');

    searchBox.append(input, icon);
    return searchBox;
  }
}
