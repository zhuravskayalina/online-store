export class Navigation {
  element: HTMLElement;

  constructor() {
    this.element = this.createNavigation();
  }

  createNavigation() {
    const nav = document.createElement('nav');
    nav.classList.add('nav');
    const list = this.createList();
    nav.append(list);
    return nav;
  }

  createList() {
    const list = document.createElement('ul');
    list.classList.add('nav__list');

    for (let i = 0; i <= 3; i++) {
      const item = document.createElement('li');
      item.classList.add('nav__item');
      const link = document.createElement('a');
      link.classList.add('nav__link');
      link.setAttribute('href', '#');

      let text: string = '';

      switch (i) {
        case 0:
          text = 'All';
          break;
        case 1:
          text = 'Snowboards';
          break;
        case 2:
          text = 'Boots';
          break;
        case 3:
          text = 'Accessories';
          break;
      }

      link.innerHTML = text;
      item.append(link);
      list.append(item);
    }
    return list;
  }
}
