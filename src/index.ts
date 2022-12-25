import './stylesheets/main.scss';

import { CartPage } from './components/cartPage/cartPage';
import { Header } from './components/header/Header';
import { Main } from './components/mainPage/mainSection/Main';
import { Footer } from './components/footer/Footer';

// import { CartPage } from './components/cartPage/cartPage';
import { MainSection } from './components/mainPage/mainSection/Main';

import { Card } from './components/productPage/productCard/Card';
import { dataBase } from './dataBase/dataBase';
// import {Main} from './components/mainPage/mainSection/Main';
import { CartPage } from './components/cartPage/cartPage';


const app = document.querySelector('.app') as HTMLDivElement;

const header = new Header().element;
app.append(header);

// const cartPage = new CartPage().element;
// app.append(cartPage);


const mainPage = new MainSection().element;
app.append(mainPage);


// const cartPage = new CartPage().element;
// app.append(cartPage);

let test = new Card(dataBase[5]).card;
app.appendChild(test);

const cartPage = new CartPage().element;
app.append(cartPage);

const footer = new Footer().element;
app.append(footer);
