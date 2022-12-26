export class PayModal {
  constructor() {}

  createModal() {
    const container = document.createElement('div');
    container.classList.add('modal');

    const modal = document.createElement('div');
    modal.classList.add('modal__window');

    const heading = document.createElement('p');
    heading.classList.add('modal__heading');
    heading.innerHTML = 'Personal details';

    const name = document.createElement('input');
    name.classList.add('modal__name', 'modal__input');
    name.setAttribute('type', 'text');
    name.setAttribute('placeholder', 'Your Name');

    const number = document.createElement('input');
    number.classList.add('modal__number', 'modal__input');
    number.setAttribute('type', 'number');
    number.setAttribute('placeholder', 'Phone number');

    const delivery = document.createElement('input');
    delivery.classList.add('modal__delivery', 'modal__input');
    delivery.setAttribute('type', 'text');
    delivery.setAttribute('placeholder', 'Delivery address');
  }
}
