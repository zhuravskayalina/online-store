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

export function getProductsInLocalStorageCount(): number {
  const products = getProductsInLocalStorage();
  const sum = products.reduce((accum: number, a: ProductData) => {
    return accum + a.countInCart;
  }, 0);
  return sum;
}

export function isProductInLocalStorage(productId: number): boolean {
  let localStorageKeys = Object.keys(localStorage);

  for (let key of localStorageKeys) {
    if (key === `product-${productId}`) {
      return true;
    }
  }
  return false;
}

export function isHaveProductsInCart(): boolean {
  const products = getProductsInLocalStorage();
  return !!products.length;
}

export function setItemToLocalStorage(
  productId: number,
  value: ProductData
): void {
  localStorage.setItem(`product-${productId}`, JSON.stringify(value));
}
