import { Main } from '../mainPage/Main';

const successImg = require('../../assets/images/success-payment.webp');

export class SuccessPaymentPage {
  public element: HTMLElement;

  constructor() {
    this.element = this.createSuccessPage();
  }

  private createSuccessPage() {
    const main = new Main().element;

    const successContainer = document.createElement('div');
    successContainer.classList.add('success-container');

    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');

    const paragraph1 = document.createElement('h3');
    paragraph1.classList.add('message-box__heading');
    paragraph1.innerHTML = 'Thank you!';

    const paragraph2 = document.createElement('p');
    paragraph2.classList.add('message-box__title');
    paragraph2.innerHTML = 'Your order is accepted.';

    const paragraph3 = document.createElement('p');
    paragraph3.classList.add('message-box__title');
    paragraph3.innerHTML = 'We will contact you soon.';

    messageBox.append(paragraph1, paragraph2, paragraph3);

    const img = document.createElement('div');
    img.classList.add('success-container__img');
    img.setAttribute('src', successImg);

    successContainer.append(messageBox, img);
    main.append(successContainer);

    return main;
  }
}
