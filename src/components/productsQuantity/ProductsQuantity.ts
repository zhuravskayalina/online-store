import { ProductData } from '../../dataBase/types';
import { getProductsInLocalStorage } from '../../types/utils';

export class ProductsQuantity {
  public quantityNum: number;
  public productsInLocalStorage: ProductData[];
  public quantityNumToStr: string;

  constructor() {
    this.productsInLocalStorage = getProductsInLocalStorage();

    this.quantityNum = this.productsInLocalStorage.length || 0;
    this.quantityNumToStr = this.quantityNum.toString();
  }

  handleCartQuantityChange(callback: () => void) {
    document.addEventListener('cartUpdate', function () {
      callback();
    });
  }
}
