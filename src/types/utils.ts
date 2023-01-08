import { ProductData } from '../dataBase/types';

export function getProductsInLocalStorage(): ProductData[] {
  const productsInLocalStorage = [];

  let localStorageKeys = Object.keys(localStorage);

  for (let key of localStorageKeys) {
    const item = localStorage.getItem(key) as string;

    if (key.startsWith('product-')) {
      const parsedItem = JSON.parse(item) as ProductData;
      productsInLocalStorage.push(parsedItem);
    }
  }

  return productsInLocalStorage;
}

export function isProductInLocalStorage(productId: number): boolean {
  let localStorageKeys = Object.keys(localStorage);

  for (let key of localStorageKeys) {
    const item = localStorage.getItem(key) as string;

    if (key === `product-${productId}`) {
      return true;
    }
  }
  return false;
}
