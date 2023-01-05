export interface Route {
  path: string;
  template: any;
}

export type Routes = Route[];

export type Page = 'home' | 'shop' | 'cart';
