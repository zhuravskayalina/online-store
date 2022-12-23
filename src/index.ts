import './stylesheets/main.scss';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';

import { CartPage } from './components/cartPage/cartPage';

const app = document.querySelector('.app') as HTMLDivElement;

const header = new Header(10000.99, 3).element;
app.append(header);

// const main = new Main().element;
// app.append(main);

const cartPage = new CartPage().element;
app.append(cartPage);

const footer = new Footer().element;
app.append(footer);
