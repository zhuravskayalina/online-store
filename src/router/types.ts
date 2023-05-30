export interface Route {
  path: string;
  getTemplate: (params: TemplateParams) => HTMLElement;
}

export interface TemplateParams {
  productId?: string;
}

export type Routes = Route[];

export type Page = 'home' | 'shop' | 'cart' | 'products' | 'error' | 'success';
