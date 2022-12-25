import './stylesheets/main.scss';

import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { CartPage } from './components/cartPage/cartPage';
import { MainSection } from './components/mainPage/mainSection/Main';
import { Card } from './components/productPage/productCard/Card';
import { dataBase } from './dataBase/dataBase';
import { ErrorPage } from './components/errorPage/ErrorPage';

const app = document.querySelector('.app') as HTMLDivElement;

const header = new Header().element;
app.append(header);

// const mainPage = new MainSection().element;
// app.append(mainPage);

// let test = new Card(dataBase[5]).card;
// app.appendChild(test);

// const cartPage = new CartPage().element;
// app.append(cartPage);

const errorPage = new ErrorPage().element;
app.append(errorPage);

const footer = new Footer().element;
app.append(footer);



