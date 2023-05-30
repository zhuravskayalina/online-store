import { amExImg, defaultCard, masterCardImg, visaImg } from './cardImages';
import { router } from '../../index';

export function updateCardDataIcon(paymentMethod: number): void {
  const icon = document.querySelector(
    '.modal__payment-icon'
  ) as HTMLImageElement;
  let url = '';

  switch (paymentMethod) {
    case 3:
      url = amExImg;
      break;
    case 4:
      url = visaImg;
      break;
    case 5:
      url = masterCardImg;
      break;
    default:
      url = defaultCard;
  }

  icon.setAttribute('src', url);
}

export function limitStrLength(event: Event, maxLength: number): void {
  const target = event.target as HTMLInputElement;
  let value: string = target.value;
  if (value.length > maxLength) {
    target.value = value.substring(0, maxLength);
  }
}

export function switchInputBorder(
  event: Event,
  type: string,
  maxLength: number
): void {
  const target = event.target as HTMLInputElement;

  if (isValid(event, type, maxLength)) {
    target.classList.add('modal__input_valid', 'valid');
    target.classList.remove('modal__input_invalid');
    if (type === 'exp') {
      target.classList.add('modal__exp-input_valid', 'valid');
      target.classList.remove('modal__exp-input_invalid');
    }
  } else {
    target.classList.remove('modal__input_valid', 'valid');
    if (type === 'exp') {
      target.classList.remove('modal__exp-input_valid', 'valid');
    }
  }
}

export function changeSubmitButtonClass(): void {
  const button = document.querySelector(
    '.modal__submit-btn'
  ) as HTMLButtonElement;

  if (checkAllFieldsForUnblockButton()) {
    button.classList.remove('modal__submit-btn_disabled');
  } else {
    button.classList.add('modal__submit-btn_disabled');
  }
}

function checkAllFieldsForUnblockButton(): Boolean {
  const form = document.querySelector('.modal__form') as HTMLFormElement;
  const inputs = Array.from(form.querySelectorAll('input'));
  const isEvery = inputs.every((input) => input.classList.contains('valid'));

  return isEvery;
}

export function checkAllFields(): Boolean {
  const form = document.querySelector('.modal__form') as HTMLFormElement;
  const inputs = Array.from(form.querySelectorAll('input'));
  const isEvery = inputs.every((input) => input.classList.contains('valid'));

  if (!isEvery) {
    inputs.forEach((input) => {
      if (!input.classList.contains('valid')) {
        if (input.dataset.type === 'month' || input.dataset.type === 'year') {
          input.classList.add('modal__exp-input_invalid');
        } else {
          input.classList.add('modal__input_invalid');
        }
      }
    });
  }

  return isEvery;
}

export function isValid(
  event: Event,
  type: string,
  maxLength: number
): Boolean {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  const emailReg = new RegExp(
    '^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}.){1,}[-A-Za-z]{2,})$'
  );

  if (value.length === 0) return false;

  switch (type) {
    case 'number':
      if (value.length < 9 || !value.startsWith('+')) return false;
      break;
    case 'creditCard':
      if (value.length > maxLength || value.length < 16) return false;
      break;
    case 'email':
      if (!value.match(emailReg)) return false;
      break;
    case 'name':
      const valueArr = value.split(' ');
      if (valueArr.length < 2) return false;
      const every = valueArr.every((word) => word.length >= 3);
      if (!every) return false;
      break;
    case 'delivery':
      const valueArray = value.split(' ');
      if (valueArray.length < 3) return false;
      const isEvery = valueArray.every((word) => word.length >= 3);
      if (!isEvery) return false;
      break;
    case 'exp':
      if (target.dataset.type === 'month') {
        if (Number(value) > 12) return false;
      } else if (target.dataset.type === 'year') {
        if (Number(value) < 22) return false;
      }
      break;
    case 'cvc':
      if (value.length < maxLength) return false;
  }

  return true;
}

export function showMessage(): void {
  const modal = document.querySelector('.modal') as HTMLElement;

  if (checkAllFields()) {
    document.body.classList.remove('open-modal');
    router.loadRoute(false, 'success');
    modal.classList.add('modal_hidden');
  }
}

export function redirectToMainPage(): void {
  router.loadRoute(false, '');
}
