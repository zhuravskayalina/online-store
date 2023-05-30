import { getProductsInLocalStorageCount } from '../../types/utils';

export class ProductsQuantity {
  public quantityNum: number;
  public quantityNumToStr: string;

  constructor() {
    this.quantityNum = getProductsInLocalStorageCount();
    this.quantityNumToStr = this.quantityNum.toString();
  }

  public handleCartQuantityChange(callback: () => void): void {
    document.addEventListener('cartUpdate', function () {
      callback();
    });
    document.addEventListener('removeFromCart', function () {
      callback();
    });
  }
}
