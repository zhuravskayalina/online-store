import { ProductData } from '../../../../dataBase/types';
import { router } from '../../../../index';
import {
  isProductInLocalStorage,
  setItemToLocalStorage,
} from '../../../../types/utils';
import { cartUpdateEvent } from '../../../../types/custom-events';
import { Button } from '../../../button/Button';

export class SmallCard {
  public cardContainer: HTMLDivElement;
  public image: HTMLImageElement;
  public infoBlock: HTMLDivElement;
  public brand: HTMLParagraphElement;
  public name: HTMLParagraphElement;
  public price: HTMLParagraphElement;
  public button: HTMLButtonElement;
  public buttonBox: HTMLDivElement;

  constructor(product: ProductData, isTableView: boolean) {
    this.cardContainer = this.createCardContainer();
    this.image = this.createImage(product);
    this.infoBlock = this.createInfoBlock();
    this.brand = this.createBrand(product);
    this.name = this.createDescription(product);
    this.price = this.createPrice(product);
    this.buttonBox = document.createElement('div');
    this.buttonBox.classList.add('small-card__button-box');

    const isInCart = isProductInLocalStorage(product.vendorCode);

    if (isInCart) {
      this.button = new Button(
        'go to cart',
        'small-card__button_added'
      ).goToCart;
    } else {
      this.button = new Button('add to cart', 'small-card__button').addToCard;

      this.button.addEventListener('click', () => {
        product.countInCart += 1;

        setItemToLocalStorage(product.vendorCode, product);

        document.dispatchEvent(cartUpdateEvent);

        const newButton = new Button('go to cart', 'small-card__button_added')
          .goToCart;

        this.buttonBox.replaceChildren(newButton);
      });
    }

    if (isTableView) {
      this.cardContainer.classList.add('small-card_table');
      this.infoBlock.classList.add('small-card__info-box_table');
      this.image.classList.add('small-card__main-img_table');
      this.brand.classList.add('small-card__description_table');
      this.name.classList.add('small-card__description_table');
      this.price.classList.add('small-card__price_table');
      this.buttonBox.classList.add('small-card__button-box_table');
      this.button.classList.add('small-card__button_table');
    }
    this.buttonBox.append(this.button);

    this.infoBlock.append(this.brand, this.name, this.price);
    this.cardContainer.append(this.image, this.infoBlock, this.buttonBox);

    this.image.addEventListener('click', function () {
      router.loadRoute(false, 'shop', product.vendorCode.toString());
    });
  }

  private createButton(isAdded: boolean) {
    const button = document.createElement('button');
    button.classList.add('small-card__button');

    const icon = document.createElement('span');
    icon.classList.add('icon-cart', 'small-card__icon');

    if (isAdded) {
      button.classList.add('small-card__button_added');
    }

    button.append(icon);
    return button;
  }

  private createCardContainer() {
    const card = document.createElement('div');
    card.classList.add('small-card');
    return card;
  }

  private createImage({ images }: ProductData) {
    const image = document.createElement('img');
    image.alt = 'Product look';
    image.src = images[0];
    image.classList.add('small-card__main-img');
    return image;
  }

  private createInfoBlock() {
    const productInfo = document.createElement('div');
    productInfo.classList.add('small-card__info-box');
    return productInfo;
  }

  private createBrand({ brand }: ProductData) {
    const brandName = document.createElement('p');
    brandName.classList.add('small-card__description');
    brandName.textContent = brand;
    return brandName;
  }

  private createDescription({ name }: ProductData) {
    const productDescription = document.createElement('p');
    productDescription.classList.add('small-card__description');
    productDescription.textContent = name;
    return productDescription;
  }

  private createPrice({ price }: ProductData) {
    const itemPrice = document.createElement('p');
    itemPrice.classList.add('small-card__price');
    itemPrice.textContent = `$ ${price}`;
    return itemPrice;
  }

  public createSmallCard(
    product: ProductData,
    isTableView: boolean
  ): HTMLDivElement {
    const card = document.createElement('div');
    const mainImage = document.createElement('img');
    const productInfo = document.createElement('div');
    const brandName = document.createElement('p');
    const productDescription = document.createElement(
      'p'
    ) as HTMLParagraphElement;
    const priceOfProduct = document.createElement('p');

    card.classList.add('small-card');

    productInfo.classList.add('small-card__info-box');

    mainImage.alt = 'Product look';
    mainImage.src = product.images[0];
    mainImage.classList.add('small-card__main-img');

    brandName.classList.add('small-card__description');
    brandName.textContent = product.brand;

    productDescription.classList.add('small-card__description');
    productDescription.textContent = product.name;

    priceOfProduct.classList.add('small-card__price');
    priceOfProduct.textContent = `$ ${product.price}`;

    productInfo.append(brandName, productDescription, priceOfProduct);

    card.append(mainImage, productInfo);

    if (isTableView) {
      card.classList.add('small-card_table');
      productInfo.classList.add('small-card__info-box_table');
      mainImage.classList.add('small-card__main-img_table');
      brandName.classList.add('small-card__description_table');
      productDescription.classList.add('small-card__description_table');
      priceOfProduct.classList.add('small-card__price_table');
    }

    card.addEventListener('click', function () {
      router.loadRoute(false, 'shop', product.vendorCode.toString());
    });

    return card;
  }
}
