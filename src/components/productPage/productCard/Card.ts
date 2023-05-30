import { ProductData } from '../../../dataBase/types';
import { SmallImage } from './galleryImages/SmallImage';
import { Button } from '../../button/Button';
import { router } from '../../../index';
import {
  isProductInLocalStorage,
  setItemToLocalStorage,
} from '../../../types/utils';
import { cartUpdateEvent } from '../../../types/custom-events';

export class Card {
  public bigCard: HTMLDivElement;
  public cartButton: HTMLButtonElement;
  public gallery: HTMLDivElement;
  public mainImage: HTMLElement;
  public mainImageBlock: HTMLDivElement;
  public infoBlock: HTMLDivElement;
  public ratingText: HTMLParagraphElement;
  public brandName: HTMLParagraphElement;
  public productDescription: HTMLParagraphElement;
  public productId: HTMLParagraphElement;
  public productPrice: HTMLParagraphElement;
  public stockQuantity: HTMLParagraphElement;
  public buyNowButton: HTMLButtonElement;
  public cartButtonBox: HTMLDivElement;

  constructor(product: ProductData) {
    this.bigCard = this.createBigCard();

    this.gallery = this.createGallery(product);
    this.mainImage = this.createMainImage(product);
    this.mainImageBlock = this.createMainImageBlock();
    this.infoBlock = this.createInfoBlock();
    this.ratingText = this.createRatingText(product);
    this.brandName = this.createBrandName(product);
    this.productDescription = this.createProductDescription(product);
    this.productId = this.createProductId(product);
    this.productPrice = this.createProductPrice(product);
    this.stockQuantity = this.createStockQuantity(product);
    this.buyNowButton = this.createBuyNowButton(product);

    this.cartButtonBox = document.createElement('div');

    const isProductAlreadyInCard = isProductInLocalStorage(product.vendorCode);

    if (isProductAlreadyInCard) {
      this.cartButton = new Button('Go to cart', 'card__button_added').goToCart;
    } else {
      this.cartButton = new Button('Add to cart', 'card__button').addToCard;

      this.cartButton.addEventListener('click', () => {
        product.countInCart += 1;

        setItemToLocalStorage(product.vendorCode, product);

        document.dispatchEvent(cartUpdateEvent);

        this.cartButtonBox.replaceChildren(
          new Button('go to card', 'card__button_added').goToCart
        );
      });
    }
    this.cartButtonBox.append(this.cartButton);

    this.mainImageBlock.append(this.mainImage);

    this.infoBlock.append(
      this.ratingText,
      this.brandName,
      this.productDescription,
      this.productId,
      this.productPrice,
      this.stockQuantity,
      this.cartButtonBox,
      this.buyNowButton
    );

    this.bigCard.append(this.gallery, this.mainImageBlock, this.infoBlock);

    this.buyNowButton.addEventListener('click', function () {
      const productId = Number(this.dataset.productId);
      const isInLocalStorage = isProductInLocalStorage(productId);

      if (!isInLocalStorage) {
        product.countInCart += 1;
        setItemToLocalStorage(productId, product);
      }
      document.dispatchEvent(cartUpdateEvent);

      router.loadRoute(false, 'cart');
      const modal = document.querySelector('.app-modal') as HTMLDivElement;
      modal.classList.add('app-modal_shown');
      document.body.classList.add('open-modal');
      document.body.scrollIntoView({ behavior: 'smooth' });
    });
  }

  private createBigCard(): HTMLDivElement {
    const card = document.createElement('div');
    card.classList.add('card');

    return card;
  }

  private createMainImageBlock(): HTMLDivElement {
    const mainImgBlock = document.createElement('div');
    mainImgBlock.classList.add('card__main-img-box');
    return mainImgBlock;
  }

  private createMainImage({ images }: ProductData): HTMLImageElement {
    const mainImage = document.createElement('img');
    mainImage.alt = 'Product look';
    mainImage.src = images[0];
    mainImage.classList.add('card__main-img');

    mainImage.addEventListener('click', function (event) {
      const target = event.target as HTMLImageElement;

      if (target.classList.contains('card__main-img_zoom')) {
        target.classList.remove('card__main-img_zoom');
      } else {
        target.classList.add('card__main-img_zoom');
      }
    });
    return mainImage;
  }

  private createGallery({ images }: ProductData): HTMLDivElement {
    const gallery = document.createElement('div');

    gallery.classList.add('card__gallery');

    images.forEach((image) => {
      const img = new SmallImage(image).image;
      gallery.append(img);
    });

    return gallery;
  }

  private createInfoBlock(): HTMLDivElement {
    const info = document.createElement('div');
    info.classList.add('card__info-block');
    return info;
  }

  private createRatingText({ rating }: ProductData): HTMLParagraphElement {
    const ratingText = document.createElement('p');
    ratingText.classList.add('card__info', 'card__rating');
    ratingText.textContent = `Rating: ${rating}`;
    return ratingText;
  }

  private createBrandName({ brand }: ProductData): HTMLParagraphElement {
    const brandName = document.createElement('p');
    brandName.classList.add('card__brand');
    brandName.textContent = brand;
    return brandName;
  }

  private createProductDescription({
    name,
  }: ProductData): HTMLParagraphElement {
    const productDescription = document.createElement('p');
    productDescription.classList.add('card__description');
    productDescription.textContent = name;
    return productDescription;
  }

  private createProductId({ vendorCode }: ProductData): HTMLParagraphElement {
    const vendor = document.createElement('p');
    vendor.classList.add('card__vendor');
    vendor.textContent = `Article number: ${vendorCode}`;
    return vendor;
  }

  private createProductPrice({ price }: ProductData): HTMLParagraphElement {
    const priceOfProduct = document.createElement('p');
    priceOfProduct.classList.add('card__price');
    priceOfProduct.textContent = `$ ${price}`;
    return priceOfProduct;
  }

  private createStockQuantity({ quantity }: ProductData): HTMLParagraphElement {
    const inStock = document.createElement('p');
    inStock.classList.add('card__stock');
    inStock.textContent = `${quantity} in stock`;
    return inStock;
  }

  private createBuyNowButton({ vendorCode }: ProductData): HTMLButtonElement {
    const button = document.createElement('button');
    button.classList.add('card__button', 'card__button_now');
    button.dataset.productId = vendorCode.toString();
    button.innerHTML = 'Buy now';
    return button;
  }
}
