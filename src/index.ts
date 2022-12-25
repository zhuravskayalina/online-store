import './stylesheets/main.scss';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
// import { CartPage } from './components/cartPage/cartPage';
import { MainSection } from './components/mainPage/mainSection/Main';

const app = document.querySelector('.app') as HTMLDivElement;

const header = new Header().element;
app.append(header);

// const cartPage = new CartPage().element;
// app.append(cartPage);

const mainPage = new MainSection().element;
app.append(mainPage);

const footer = new Footer().element;
app.append(footer);
