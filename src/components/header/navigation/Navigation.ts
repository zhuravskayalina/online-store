import { router } from '../../../index';

export class Navigation {
  public element: HTMLElement;
  public navItems: string[];

  constructor() {
    this.navItems = ['all', 'snowboards', 'boots', 'accessories'];
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
    const list = document.createElement('ul');
    list.classList.add('nav__list');

    this.navItems.forEach((navItem) => {
      const item = this.createListItem(navItem);

      if (navItem === 'all') {
        item.addEventListener('click', function (event: MouseEvent) {
          event.preventDefault();
          router.loadRoute('shop');
        });
      }
      list.append(item);
    });

    return list;
  }

  private createListItem(itemName: string) {
    const item = document.createElement('li');
    item.classList.add('nav__item');

    const link = document.createElement('a');
    link.classList.add('nav__link');
    link.setAttribute('href', '');

    link.innerHTML = itemName;
    return link;
  }
}
