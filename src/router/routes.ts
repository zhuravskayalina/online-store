import { PageConstructor } from '../components/pageConstructor/PageConstructor';
import { TemplateParams } from './types';

const homePage = new PageConstructor().buildPage('home');
const shopPage = new PageConstructor().buildPage('shop');
const cartPage = new PageConstructor().buildPage('cart');
const errorPage = new PageConstructor().buildPage('error');
const successPage = new PageConstructor().buildPage('success');

export const routes = [
  {
    path: '/',
    getTemplate: () => homePage,
  },
  {
    path: '/shop',
    getTemplate: () => shopPage,
  },
  {
    path: '/cart',
    getTemplate: () => cartPage,
  },
  {
    path: '/error',
    getTemplate: () => errorPage,
  },
  {
    path: '/success',
    getTemplate: () => successPage,
  },
  {
    path: '/shop/:productId',
    getTemplate: (params: TemplateParams) =>
      new PageConstructor().buildProductItemPage('products', params.productId),
  },
];
