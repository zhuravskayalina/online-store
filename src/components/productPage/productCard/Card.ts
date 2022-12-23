import { dataBase } from '../../../dataBase/dataBase';
import { ProductData } from '../../../dataBase/types';

export class Card {
  card: DocumentFragment;

  constructor(product: ProductData) {
    this.card = this.createCard(product);
  }

  createCard( {category, brand, name, price, rating, images, quantity,
    description, sizes, vendorCode}: ProductData): DocumentFragment {
    const fragment = document.createDocumentFragment() as DocumentFragment;
    const card = document.createElement('div') as HTMLDivElement;
    const gallery = document.createElement('div') as HTMLDivElement;
    const galleryImg1 = document.createElement('img') as HTMLImageElement;
    const galleryImg2 = document.createElement('img') as HTMLImageElement;
    const mainImageBlock = document.createElement('div') as HTMLDivElement;
    const mainImage = document.createElement('img') as HTMLImageElement;
    const info = document.createElement('div') as HTMLDivElement;
    const ratingBlock = document.createElement('div') as HTMLDivElement;
    const ratingText = document.createElement('p') as HTMLParagraphElement;
    const brandName = document.createElement('p') as HTMLParagraphElement;
    const productDescription = document.createElement('p') as HTMLParagraphElement;
    const vendor = document.createElement('p') as HTMLParagraphElement;
    const priceOfProduct = document.createElement('p') as HTMLParagraphElement;
    const inStock = document.createElement('p') as HTMLParagraphElement;
    const button = document.createElement('button') as HTMLButtonElement;

    card.classList.add('card');

    gallery.classList.add('card_gallery')

    galleryImg1.alt = 'Product look';
    galleryImg1.src = images[0];
    galleryImg1.classList.add('card_gallery-img');

    galleryImg2.alt = 'Product look';
    galleryImg2.src = images[0];
    galleryImg2.classList.add('card_gallery-img');

    mainImage.alt = 'Product look';
    mainImage.src = images[0];

    ratingBlock.classList.add('card_rating')
    ratingText.textContent = `Rating: ${rating}`;
    ratingBlock.appendChild(ratingText);

    brandName.classList.add('card_brand');
    brandName.textContent = brand;

    productDescription.classList.add('card_description');
    productDescription.textContent = name;

    vendor.classList.add('card_vendor');
    vendor.textContent = `Article number: ${vendorCode}`;

    priceOfProduct.classList.add('card_price')
    priceOfProduct.textContent = `${price}$`;

    inStock.classList.add('card_stock');
    inStock.textContent = `${quantity} in stock`;

    button.classList.add('card_button');
    button.type = 'button';
    button.textContent = 'Add to shopping';

    card.appendChild(gallery);
    gallery.appendChild(galleryImg1);
    gallery.appendChild(galleryImg2);
    if (images.length === 3) {
      const galleryImg3 = document.createElement('img') as HTMLImageElement;
      galleryImg3.setAttribute('alt', 'src');
      galleryImg3.alt = 'Product look';
      galleryImg3.src = images[2];
      galleryImg3.classList.add('card_gallery-img');
      gallery.appendChild(galleryImg3);
    }
    card.appendChild(mainImageBlock);
    mainImageBlock.appendChild(mainImage);
    card.appendChild(info);
    info.appendChild(ratingBlock);
    info.appendChild(brandName);
    info.appendChild(productDescription);
    info.appendChild(vendor);
    info.appendChild(priceOfProduct);
    info.appendChild(inStock);
    info.appendChild(button);
    fragment.appendChild(card);
    return fragment;
  }
}

// ToDo: it's for draw card our choiced product
/*
Логика: ищем в массиве базы данных элемент, у которого артикул совпадает
с искомым, по индексу найденного элемента запускаем отрисовку
необходимой карточки

class CardContainer {
  constructor(vendor) {
    this.cardsContainer = document.createElement('article') as HTMLElement;
    this.cardsContainer.classList.add('container');
    this.cardsContainer.appendChild(this.createCards());
    document.body.appendChild(this.cardsContainer);
    this.vendorCode = vendor;
  }

  createCards(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    let index:number = -1;
    [...dataBase].forEach(function (productInstance): number {
      if (productInstance[vendorCode]  == this.vendorCode {
        return index +=1;
      }
      else {
        index +=1;
      }
    }
  )

      const card = new Card(dataBase[index]});
      fragment.appendChild(card.card);
    });
    return fragment;
  }
}

*/
