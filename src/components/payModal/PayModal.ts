import { Main } from '../mainPage/Main';
import { defaultCard } from './cardImages';
import {
  updateCardDataIcon,
  limitStrLength,
  switchInputBorder,
  changeSubmitButtonClass,
  showMessage,
  redirectToMainPage,
  checkAllFields,
} from './utils';

const successImg = require('../../assets/images/success-payment.webp');

export class PayModal {
  public element: HTMLElement;

  constructor() {
    this.element = this.createModal();
  }

  private createModal(): HTMLElement {
    const main = new Main().element;
    main.classList.add('pay-modal');

    const container = document.createElement('div');
    container.classList.add('modal');

    const modal = document.createElement('div');
    modal.classList.add('modal__window');

    const form = document.createElement('form');
    form.classList.add('modal__form');

    const successBox = this.createSuccessBox();

    const heading = this.createHeading();
    const name = this.createNameField();
    const number = this.createPhoneField();
    const delivery = this.createDeliveryInput();
    const email = this.createEmailField();
    const cartData = this.createCardDataField();
    const securityData = this.createSecurityData();
    const confirmBtn = this.createSubmitButton();
    const closeIcon = this.createCloseIcon();

    form.append(
      heading,
      name,
      number,
      delivery,
      email,
      cartData,
      securityData,
      confirmBtn,
      closeIcon
    );
    modal.append(form);
    container.append(modal);
    main.append(container, successBox);

    return main;
  }

  private createHeading(): HTMLParagraphElement {
    const heading = document.createElement('p');
    heading.classList.add('modal__heading');
    heading.innerHTML = 'Personal details';
    return heading;
  }

  private createNameField(): HTMLInputElement {
    const name = document.createElement('input');
    name.classList.add('modal__name', 'modal__input');
    name.setAttribute('type', 'text');
    name.setAttribute('required', '');
    name.setAttribute('placeholder', 'Name Lastname');

    name.addEventListener('input', function (event) {
      switchInputBorder(event, 'name', Infinity);
    });

    name.addEventListener('input', function (event) {
      changeSubmitButtonClass(event);
    });

    return name;
  }

  private createPhoneField(): HTMLInputElement {
    const number = document.createElement('input');
    number.classList.add('modal__number', 'modal__input');
    number.setAttribute('inputmode', 'numeric');
    number.setAttribute('type', 'text');
    number.setAttribute('required', '');
    number.setAttribute('placeholder', 'Phone number');

    number.addEventListener('input', function () {
      this.value = this.value.replace(/[^+0-9]/g, '');
    });

    number.addEventListener('input', function (event: Event) {
      switchInputBorder(event, 'number', Infinity);
    });

    number.addEventListener('input', function (event) {
      changeSubmitButtonClass(event);
    });
    return number;
  }

  private createDeliveryInput(): HTMLInputElement {
    const delivery = document.createElement('input');
    delivery.classList.add('modal__delivery', 'modal__input');
    delivery.setAttribute('type', 'text');
    delivery.setAttribute('required', '');
    delivery.setAttribute('placeholder', 'Delivery address');

    delivery.addEventListener('input', function (event) {
      switchInputBorder(event, 'delivery', 5);
    });

    delivery.addEventListener('input', function (event) {
      changeSubmitButtonClass(event);
    });

    return delivery;
  }

  private createEmailField(): HTMLInputElement {
    const email = document.createElement('input');
    email.classList.add('modal__email', 'modal__input');
    email.setAttribute('type', 'email');
    email.setAttribute('placeholder', 'Email');
    email.setAttribute('required', '');

    email.addEventListener('input', function (event) {
      switchInputBorder(event, 'email', Infinity);
    });

    email.addEventListener('input', function (event) {
      changeSubmitButtonClass(event);
    });

    return email;
  }

  private createCardDataField(): HTMLDivElement {
    const cartData = document.createElement('div');
    cartData.classList.add('modal__cart-data');

    const creditCard = this.createCardNumberField();

    const paymentSystemIcon = this.createPaymentImg();

    cartData.append(creditCard, paymentSystemIcon);
    return cartData;
  }

  private createCardNumberField(): HTMLInputElement {
    const creditCard = document.createElement('input');
    creditCard.classList.add('modal__credit-card', 'modal__input');
    creditCard.setAttribute('type', 'number');
    creditCard.setAttribute('inputmode', 'numeric');
    creditCard.setAttribute('required', '');
    creditCard.setAttribute('placeholder', 'Card number');

    creditCard.addEventListener('input', function (event): void {
      const target = event.target as HTMLInputElement;
      let value: string = target.value;
      const firstNum = Number(value[0]);

      updateCardDataIcon(firstNum);
    });

    creditCard.addEventListener('input', function (event) {
      limitStrLength(event, 19);
    });

    creditCard.addEventListener('input', function (event) {
      switchInputBorder(event, 'creditCard', 16);
    });

    creditCard.addEventListener('input', function (event) {
      changeSubmitButtonClass(event);
    });

    return creditCard;
  }

  private createPaymentImg(): HTMLImageElement {
    const icon = document.createElement('img');
    icon.classList.add('modal__payment-icon');

    icon.setAttribute('src', defaultCard);
    return icon;
  }

  private createSecurityData(): HTMLDivElement {
    const securityData = document.createElement('div');
    securityData.classList.add('modal__security-box');

    const expirationInputs = document.createElement('div');
    expirationInputs.classList.add('modal__expiration-box');

    const expDay = this.createExpirationInput('MM', 'month');
    const expMonth = this.createExpirationInput('YY', 'year');
    const cvc = this.createCVCField();

    expirationInputs.append(expDay, expMonth);
    securityData.append(expirationInputs, cvc);
    return securityData;
  }

  private createExpirationInput(
    placeholder: string,
    type: 'year' | 'month'
  ): HTMLInputElement {
    const exp = document.createElement('input');
    exp.classList.add('modal__exp-input', 'modal__input');
    exp.setAttribute('autocomplete', 'off');
    exp.setAttribute('maxlength', '2');
    exp.setAttribute('pattern', '[0-9]*');
    exp.setAttribute('inputmode', 'numerical');
    exp.setAttribute('required', '');
    exp.setAttribute('placeholder', placeholder);
    exp.setAttribute('type', 'number');
    exp.setAttribute('data-type', type);
    exp.setAttribute('data-pattern-validate', '');

    exp.addEventListener('input', function (event) {
      limitStrLength(event, 2);
      switchInputBorder(event, 'exp', 2);
    });

    exp.addEventListener('input', function (event) {
      changeSubmitButtonClass(event);
    });

    return exp;
  }

  private createCVCField(): HTMLInputElement {
    const cvc = document.createElement('input');
    cvc.classList.add('modal__cvc-input', 'modal__input');
    cvc.setAttribute('type', 'number');
    cvc.setAttribute('maxlength', '4');
    cvc.setAttribute('inputmode', 'numeric');
    cvc.setAttribute('placeholder', 'CVC');
    cvc.setAttribute('required', '');

    cvc.addEventListener('input', function (event): void {
      limitStrLength(event, 3);
      switchInputBorder(event, 'cvc', 3);
    });

    cvc.addEventListener('input', function (event) {
      changeSubmitButtonClass(event);
    });

    return cvc;
  }

  private createSubmitButton(): HTMLButtonElement {
    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('modal__submit-btn', 'modal__submit-btn_disabled');
    confirmBtn.setAttribute('type', 'submit');
    confirmBtn.innerHTML = 'submit';

    confirmBtn.addEventListener('click', function (event) {
      event.preventDefault();
      const isAllFieldsValid = checkAllFields();
      if (isAllFieldsValid) {
        showMessage();
        setTimeout(redirectToMainPage, 5000);
      }
    });

    return confirmBtn;
  }

  private createCloseIcon(): HTMLParagraphElement {
    const closeIcon = document.createElement('p');
    closeIcon.classList.add('icon-cross', 'modal__close-icon');

    closeIcon.addEventListener('click', function () {
      const modal = document.querySelector('.modal') as HTMLDivElement;
      modal.classList.add('modal_hidden');
    });

    return closeIcon;
  }

  private createSuccessBox(): HTMLDivElement {
    const successContainer = document.createElement('div');
    successContainer.classList.add(
      'success-container',
      'success-container_hidden'
    );

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

    return successContainer;
  }
}
