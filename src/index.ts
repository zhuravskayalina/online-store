import './stylesheets/main.scss';

import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { CartPage } from './components/cartPage/cartPage';
import { MainSection } from './components/mainPage/mainSection/Main';
import { Card } from './components/productPage/productCard/Card';
import { dataBase } from './dataBase/dataBase';
import { ErrorPage } from './components/errorPage/ErrorPage';
import { Detail } from './components/productPage/productDescription/bigCardProductDescription';
import { createProductPage } from './components/productPage/bigCardPageAssembly/bigCardPageAssembly';
import { Checkbox } from './components/productPage/checkbox/Checkbox';

const app = document.querySelector('.app') as HTMLDivElement;

const header = new Header().element;
app.append(header);

// const mainPage = new MainSection().element;
// app.append(mainPage);
//todo change for createProductPage
/*let test = new Card(dataBase[5]).card;
app.appendChild(test);

const description = new Detail(dataBase[5]).detail;
app.append(description);*/

// const cartPage = new CartPage().element;
// app.append(cartPage);

// const errorPage = new ErrorPage().element;
// app.append(errorPage);

// createProductPage(dataBase[5]);

const checkbox = new Checkbox('Nitro').checkbox;
app.append(checkbox);

const footer = new Footer().element;
app.append(footer);
