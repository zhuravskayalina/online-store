export class TotalProductsSum {
  public sum: string;

  constructor() {
    this.sum = this.createSum(10000.993);
  }

  createSum(sum: number): string {
    return this.formatSum(sum);
  }

  formatSum(sum: number): string {
    return new Intl.NumberFormat('ru-RU').format(sum);
  }
}
