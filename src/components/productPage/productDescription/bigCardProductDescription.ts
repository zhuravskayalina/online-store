import { ProductData } from '../../../dataBase/types';
import { paymentOptions } from '../../../dataBase/paymentOptions';
import { deliveryTerms } from '../../../dataBase/deliveryTerms';

export class Detail {
  public detail: DocumentFragment;

  constructor(product: ProductData) {
    this.detail = this.createDetail(product);
  }

  private createDetail({ description }: ProductData): DocumentFragment {
    const fragment = document.createDocumentFragment() as DocumentFragment;
    const detail = document.createElement('div') as HTMLDivElement;
    const detailsBlock = document.createElement('div') as HTMLDivElement;
    const detailsHeaderBlock = document.createElement('div') as HTMLDivElement;
    const detailsHeader = document.createElement('p') as HTMLParagraphElement;
    const detailsHideContainer = document.createElement(
      'div'
    ) as HTMLDivElement;
    const detailsText = document.createElement('p') as HTMLParagraphElement;
    const purchase = document.createElement('div') as HTMLDivElement;
    const purchaseHeaderBlock = document.createElement('div') as HTMLDivElement;
    const purchaseHeader = document.createElement('p') as HTMLParagraphElement;
    const purchaseHideContainer = document.createElement(
      'div'
    ) as HTMLDivElement;
    const paymentHeader = document.createElement('p') as HTMLParagraphElement;
    const deliveryBlock = document.createElement('div') as HTMLDivElement;
    const deliveryHeader = document.createElement('p') as HTMLParagraphElement;
    const deliveryText = document.createElement('p') as HTMLParagraphElement;

    detail.classList.add('description');
    detailsBlock.classList.add('description__details');

    detailsHeaderBlock.classList.add('description__header-block');

    detailsHeader.classList.add('description__headers');
    detailsHeader.textContent = 'Description';

    detailsHideContainer.classList.add('description__hide-container');

    detailsText.classList.add('description__text');
    detailsText.textContent = description;

    purchaseHeaderBlock.classList.add('description__header-block');

    purchase.classList.add('description__purchase');
    purchaseHeader.classList.add('description__headers');
    purchaseHeader.textContent = 'Payment and delivery';

    paymentHeader.classList.add('description__subheaders');
    paymentHeader.textContent =
      'There are 3 payment options available' + ' in the online store:';

    purchaseHideContainer.classList.add('description__hide-container');

    detailsBlock.appendChild(detailsHeaderBlock);
    detailsHeaderBlock.appendChild(detailsHeader);
    detailsBlock.appendChild(detailsHideContainer);
    detailsHideContainer.appendChild(detailsText);
    detail.appendChild(detailsBlock);
    detail.appendChild(purchase);
    purchase.appendChild(purchaseHeaderBlock);
    purchaseHeaderBlock.appendChild(purchaseHeader);
    purchase.appendChild(purchaseHideContainer);
    purchaseHideContainer.appendChild(paymentHeader);

    //to fill payment block
    paymentOptions.map((option) => {
      const payment = document.createElement('p') as HTMLParagraphElement;
      payment.classList.add('description__text', 'description__payment-text');
      payment.textContent = option;
      purchaseHideContainer.appendChild(payment);
    });

    deliveryBlock.classList.add('description__delivery-block');

    deliveryHeader.classList.add('description__subheaders');
    deliveryHeader.textContent =
      'Delivery across Belarus is carried out free of charge.';

    deliveryText.classList.add('description__text');
    deliveryText.textContent = deliveryTerms;

    deliveryBlock.appendChild(deliveryHeader);
    deliveryBlock.appendChild(deliveryText);
    purchaseHideContainer.appendChild(deliveryBlock);

    fragment.appendChild(detail);
    return fragment;
  }
}
