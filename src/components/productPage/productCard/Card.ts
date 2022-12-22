import { dataBase} from '../../../dataBase/dataBase';

/* interface ProductData {
  category: Category;
  brand: SnowboardBrand | AccessoriesBrand | BootsBrand;
  name: string;
  price: number;
  rating: number;
  images: string[];
  quantity: number;
  description: string;
  sizes?: BootsSize[];
}
 */

class Card {
  constructor({ category, brand, name, price, rating, images, quantity, description, sizes}) {
    this.card = this.createCard( category, brand, name, price, rating, images, quantity, description, sizes);
  }

  createCard(category, brand, name, price, rating, images, quantity, description, sizes): DocumentFragment {
    const fragment = document.createDocumentFragment() as DocumentFragment;
    const card = document.createElement('div') as HTMLDivElement;
    const gallery = document.createElement('div') as HTMLDivElement;
    const galleryImg1 = document.createElement('img') as HTMLImageElement;
    const galleryImg2 = document.createElement('img') as HTMLImageElement;
    const mainImageBlock = document.createElement('div') as HTMLDivElement;
    const mainImage = document.createElement('img') as HTMLImageElement;
    const info = document.createElement('div') as HTMLDivElement;
    const productDescription = document.createElement('p') as HTMLElement;
    const vendor = document.createElement('p') as HTMLElement;
    const productModel = document.createElement('p') as HTMLElement;
    const inStock = document.createElement('p') as HTMLElement;
    const rating = document.createElement('p') as HTMLElement;
    const price = document.createElement('p') as HTMLElement;
    const button = document.createElement('button') as HTMLButtonElement;

    card.classList.add('card');

    gallery.classList.add('card-gallery')

    galleryImg1.setAttribute('alt', 'src');
    galleryImg1.alt = 'Product look';
    galleryImg1.src = images[0];
    galleryImg1.classList.add('card-gallery-img');

    galleryImg2.setAttribute('alt', 'src');
    galleryImg2.alt = 'Product look';
    galleryImg2.src = images[0];
    galleryImg2.classList.add('card-gallery-img');

    mainImage.setAttribute('alt', 'src');
    mainImage.alt = 'Product look';
    mainImage.src = images[1];

    productDescription.textContent = description;
    productDescription.classList.add('card-description');

    vendor.textContent = `Vendor code ${vendorCode}`;
    vendor.classList.add('card-vendor');

    productModel.textContent = model;
    productModel.classList.add('card-model');

    inStock.textContent = `Available ${availability}`;
    inStock.classList.add('card-stock');

    rating.textContent = `Customer reviews ${ratingOfProduct}`;
    rating.classList.add('card-rating');

    price.textContent = `Price ${priceOfProduct}$`;
    price.classList.add('card-price');

    button.textContent = 'Add to shopping';
    button.classList.add('card-button');
    button.type = 'button';

    card.appendChild(gallery);
    gallery.appendChild(galleryImg1);
    gallery.appendChild(galleryImg2);
    card.appendChild(productDescription);
    card.appendChild(productModel);
    card.appendChild(mainImageBlock);
    mainImageBlock.appendChild(mainImage);
    card.appendChild(info);
    info.appendChild(productDescription);
    info.appendChild(vendor);
    info.appendChild(productModel);
    info.appendChild(inStock);
    info.appendChild(rating);
    info.appendChild(price);
    info.appendChild(button);
    fragment.appendChild(card);
    return fragment;
  }
}

class CardContainer {
  constructor() {
    this.cardsContainer = document.createElement('article') as HTMLElement;
    this.cardsContainer.classList.add('container');
    this.cardsContainer.appendChild(this.createCards());
    document.body.appendChild(this.cardsContainer);
  }

  createCards(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    data.forEach(({  category, brand, name, price, rating, images, quantity, description, sizes }) => {
      const card = new Card({
        category, brand, name, price, rating, images, quantity, description, sizes
      });
      fragment.appendChild(card.card);
    });
    return fragment;
  }
}
