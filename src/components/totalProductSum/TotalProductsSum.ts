import { ProductData } from '../../dataBase/types';
import { getProductsInLocalStorage } from '../../types/utils';

export class TotalProductsSum {
  public sum: number;
  public totalSum: string;
  public productsInLocalStorage: ProductData[];

  constructor() {
    this.productsInLocalStorage = getProductsInLocalStorage();
    this.sum = 0;

    this.productsInLocalStorage.forEach(({ price, countInCart }) => {
      this.sum += price * countInCart;
    });

    this.totalSum = `$${this.createSum(this.sum) || '0'}`;
  }

  public handleCartTotalSumChange(callback: () => void) {
    document.addEventListener('cartUpdate', function () {
      callback();
    });
    document.addEventListener('removeFromCart', function () {
      callback();
    });
  }

  private createSum(sum: number): string {
    return this.formatSum(sum);
  }

  private formatSum(sum: number): string {
    return new Intl.NumberFormat('ru-RU').format(sum);
  }
}
