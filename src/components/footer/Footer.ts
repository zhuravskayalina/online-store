export class Footer {
  public element: HTMLElement;

  constructor() {
    this.element = this.createFooter();
  }

  private createFooter() : HTMLElement {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const container = document.createElement('div');
    container.classList.add('footer__container');

    const logoLink = document.createElement('a');
    logoLink.classList.add('footer__logo-link');
    logoLink.setAttribute('href', 'https://rs.school/js/');

    const logo = document.createElement('div');
    logo.classList.add('footer__rss-logo');

    logoLink.append(logo);

    const authors = this.createAuthors();

    const year = document.createElement('p');
    year.innerHTML = '2022';

    container.append(logoLink, authors, year);
    footer.append(container);

    return footer;
  }

  createAuthors(): HTMLDivElement {
    const authors = document.createElement('div');
    authors.classList.add('footer__authors');

    const authorsCount = 2;

    for (let i = 0; i < authorsCount; i++) {
      const link = document.createElement('a');
      link.classList.add('footer__author-link');

      const author = document.createElement('div');
      author.classList.add('footer__author-box');

      const ghLogo = document.createElement('div');
      ghLogo.classList.add('footer__gh-logo');

      const nameEl = document.createElement('p');
      nameEl.classList.add('footer__author-name');

      let name = '';
      let url = '';
      let title = '';

      switch (i) {
        case 0:
          name = 'Anhelina Zhurauskaya';
          url = 'https://github.com/zhuravskayalina';
          title = 'Anhelina Zhurauskaya github profile';
          break;
        case 1:
          name = 'Elena Smolina';
          url = 'https://github.com/esmolina';
          title = 'Elena Smolina github account';
          break;
      }
      nameEl.innerHTML = name;
      link.setAttribute('href', url);
      link.setAttribute('alt', title);

      author.append(ghLogo, nameEl);
      link.append(author);
      authors.append(link);
    }

    return authors;
  }
}
