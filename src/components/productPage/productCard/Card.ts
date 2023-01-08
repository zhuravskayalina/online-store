import { ProductData } from '../../../dataBase/types';
import { SmallImage } from './galleryImages/SmallImage';
import { Button } from '../../button/Button';
import { router } from '../../../index';
import { isProductInLocalStorage } from '../../../types/utils';

export class Card {
  public bigCard: HTMLDivElement;
  public smallCard: HTMLDivElement;
  public smallCardTable: HTMLDivElement;
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
    this.cartButtonBox = document.createElement('div');

    const isProductAlreadyInCard = isProductInLocalStorage(product.vendorCode);

    if (isProductAlreadyInCard) {
      this.cartButton = new Button('Go to cart', 'card__button_added').goToCart;
    } else {
      this.cartButton = new Button('Add to cart', 'card__button').addToCard;

      this.cartButton.addEventListener('click', () => {
        // product.countInCart = 1;
        localStorage.setItem(
          `product-${product.vendorCode}`,
          JSON.stringify(product)
        );

        document.dispatchEvent(cartUpdate);

        this.cartButtonBox.replaceChildren(
          new Button('go to card', 'card__button_added').goToCart
        );
      });
    }
    this.cartButtonBox.append(this.cartButton);

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

    this.smallCard = this.createSmallCard(product, false);
    this.smallCardTable = this.createSmallCard(product, true);

    this.buyNowButton.addEventListener('click', function (event) {
      const productId = Number(this.dataset.productId);
      const isInLocalStorage = isProductInLocalStorage(productId);

      if (!isInLocalStorage) {
        localStorage.setItem(`product-${productId}`, JSON.stringify(product));
      }
      document.dispatchEvent(cartUpdate);

      router.loadRoute(false, 'cart');
      const modal = document.querySelector('.app-modal') as HTMLDivElement;
      modal.classList.add('app-modal_shown');
      document.body.classList.add('open-modal');
      document.body.scrollIntoView({ behavior: 'smooth' });
    });

    const cartUpdate = new CustomEvent('cartUpdate', {
      detail: product.vendorCode,
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

  public createSmallCard(
    { brand, name, price, images, vendorCode }: ProductData,
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
    mainImage.src = images[0];
    mainImage.classList.add('small-card__main-img');

    brandName.classList.add('small-card__description');
    brandName.textContent = brand;

    productDescription.classList.add('small-card__description');
    productDescription.textContent = name;

    priceOfProduct.classList.add('small-card__price');
    priceOfProduct.textContent = `$ ${price}`;

    if (isTableView) {
      card.classList.add('small-card_table');
      productInfo.classList.add('small-card__info-box_table');
      mainImage.classList.add('small-card__main-img_table');
      brandName.classList.add('small-card__description_table');
      productDescription.classList.add('small-card__description_table');
      priceOfProduct.classList.add('small-card__price_table');
    }

    card.appendChild(mainImage);
    productInfo.appendChild(brandName);
    productInfo.appendChild(productDescription);
    productInfo.appendChild(priceOfProduct);
    card.appendChild(productInfo);

    card.addEventListener('click', function () {
      router.loadRoute(false, 'shop', vendorCode.toString());
    });

    return card;
  }
}
