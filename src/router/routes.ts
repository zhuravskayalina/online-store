import { PageConstructor } from '../components/pageConstructor/PageConstructor';

const homePage = new PageConstructor().buildPage('home');
const shopPage = new  PageConstructor().buildPage('shop');
const cartPage = new PageConstructor().buildPage('cart');

export const routes = [
  {
    path: '/',
    template: homePage,
  },
  {
    path: '/shop',
    template: shopPage,
  },
  {
    path: '/cart',
    template: cartPage,
  },
];
