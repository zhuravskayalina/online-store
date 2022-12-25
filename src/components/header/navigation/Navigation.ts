export class Navigation {
  public element: HTMLElement;

  constructor() {
    this.element = this.createNavigation();
  }

  createNavigation(): HTMLElement {
    const nav = document.createElement('nav');
    nav.classList.add('nav');
    const list = this.createList();
    nav.append(list);
    return nav;
  }

  private createList(): HTMLUListElement {
    const navItems = ['all', 'snowboards', 'boots', 'accessories'];

    const list = document.createElement('ul');
    list.classList.add('nav__list');

    navItems.forEach((navItem) => {
      const item = document.createElement('li');
      item.classList.add('nav__item');

      const link = document.createElement('a');
      link.classList.add('nav__link');
      link.setAttribute('href', '#');

      link.innerHTML = navItem;
      item.append(link);
      list.append(item);
    });

    return list;
  }
}
