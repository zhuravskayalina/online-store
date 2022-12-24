import './stylesheets/main.scss';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';

import { CartPage } from './components/cartPage/cartPage';
import { Header } from './components/mainPage/header/Header';
import { Main } from './components/mainPage/mainSection/Main';
import { Footer } from './components/mainPage/footer/Footer';
import {Card} from './components/productPage/productCard/Card';
import { dataBase } from './dataBase/dataBase';

const app = document.querySelector('.app') as HTMLDivElement;

const header = new Header().element;
app.append(header);

// const main = new Main().element;
// app.append(main);

const cartPage = new CartPage().element;
app.append(cartPage);

const footer = new Footer().element;
app.append(footer);

let test = new Card(dataBase[5])
app.appendChild(test)
