export class TotalProductsSum {
  sum: string;

  constructor() {
    this.sum = this.createSum(10000.993);
  }

  createSum(sum: number): string {
    return this.formatSum(sum);
  }

  formatSum(sum: number) {
    return new Intl.NumberFormat('ru-RU').format(sum);
  }
}
