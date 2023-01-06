export interface Route {
  path: string;
  getTemplate: any;
}

export interface TemplateParams {
  productId: number;
}

export type Routes = Route[];

export type Page = 'home' | 'shop' | 'cart' | 'products' | 'error' | 'success';
