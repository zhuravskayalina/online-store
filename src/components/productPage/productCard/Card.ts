import { ProductData } from '../../../dataBase/types';
import { Main } from '../../mainPage/Main';
import { SmallImage } from './galleryImages/SmallImage';
import { Button } from '../../button/Button';

export class Card {
  public card: DocumentFragment;

  constructor(product: ProductData) {
    this.card = this.createBigCard(product);
  }

  private createBigCard({
    brand,
    name,
    price,
    rating,
    images,
    quantity,
    vendorCode,
  }: ProductData): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const card = document.createElement('div');
    const gallery = document.createElement('div');
    const mainImage = document.createElement('img');
    const mainImgBlock = document.createElement('div');
    const info = document.createElement('div');
    const ratingText = document.createElement('p');
    const brandName = document.createElement('p');
    const productDescription = document.createElement('p');
    const vendor = document.createElement('p');
    const priceOfProduct = document.createElement('p');
    const inStock = document.createElement('p');
    const button = new Button('Add to cart', 'card__button').addToCardButton;

    card.classList.add('card');

    gallery.classList.add('card__gallery');

    images.forEach((image) => {
      const img = new SmallImage(image).image;
      gallery.append(img);
    });

    mainImgBlock.classList.add('card__main-img-box');

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

    mainImgBlock.append(mainImage);

    ratingText.classList.add('card__info', 'card__rating');
    ratingText.textContent = `Rating: ${rating}`;

    brandName.classList.add('card__brand');
    brandName.textContent = brand;

    productDescription.classList.add('card__description');
    productDescription.textContent = name;

    vendor.classList.add('card__vendor');
    vendor.textContent = `Article number: ${vendorCode}`;

    priceOfProduct.classList.add('card__price');
    priceOfProduct.textContent = `$ ${price}`;

    inStock.classList.add('card__stock');
    inStock.textContent = `${quantity} in stock`;

    card.appendChild(gallery);
    card.appendChild(mainImgBlock);
    card.appendChild(info);
    info.appendChild(ratingText);
    info.appendChild(brandName);
    info.appendChild(productDescription);
    info.appendChild(vendor);
    info.appendChild(priceOfProduct);
    info.appendChild(inStock);
    info.appendChild(button);
    fragment.appendChild(card);

    return fragment;
  }

  private createSmallCard({
    brand,
    name,
    price,
    images,
  }: ProductData): DocumentFragment {
    const fragment = document.createDocumentFragment() as DocumentFragment;
    const card = document.createElement('div') as HTMLDivElement;
    const mainImage = document.createElement('img') as HTMLImageElement;
    const brandName = document.createElement('p') as HTMLParagraphElement;
    const productDescription = document.createElement(
      'p'
    ) as HTMLParagraphElement;
    const priceOfProduct = document.createElement('p') as HTMLParagraphElement;
    // const main = new Main().element;
    // main.classList.add('main-page');
    // const container = document.createElement('div');
    // container.classList.add('main__container');

    card.classList.add('small-card');

    mainImage.alt = 'Product look';
    mainImage.src = images[0];
    mainImage.classList.add('small-card__main-img');

    brandName.classList.add('small-card__description');
    brandName.textContent = brand;

    productDescription.classList.add('small-card__description');
    productDescription.textContent = name;

    priceOfProduct.classList.add('small-card__price');
    priceOfProduct.textContent = `$ ${price}`;

    card.appendChild(mainImage);
    card.appendChild(brandName);
    card.appendChild(productDescription);
    card.appendChild(priceOfProduct);
    fragment.appendChild(card);
    return fragment;
  }
}

// ToDo: it's for draw card our choiced product
//
// Логика: ищем в массиве базы данных элемент, у которого артикул совпадает
// с искомым, по индексу найденного элемента запускаем отрисовку
// необходимой карточки
//
// class CardContainer {
//   constructor(vendor) {
//     this.cardsContainer = document.createElement('article') as HTMLElement;
//     this.cardsContainer.classList.add('container');
//     this.cardsContainer.appendChild(this.createCards());
//     document.body.appendChild(this.cardsContainer);
//     this.vendorCode = vendor;
//   }
//
//   createCards(): DocumentFragment {
//     const fragment = document.createDocumentFragment();
//     let index:number = -1;
//     [...dataBase].forEach(function (productInstance): number {
//       if (productInstance[vendorCode]  == this.vendorCode {
//         return index +=1;
//       }
//       else {
//         index +=1;
//       }
//     }
//   )
//
//       const card = new Card(dataBase[index]});
//       fragment.appendChild(card.card);
//     });
//     return fragment;
//   }
// }
