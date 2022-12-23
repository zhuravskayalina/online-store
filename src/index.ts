import './stylesheets/main.scss';
import { Header } from './components/mainPage/header/Header';
import { Main } from './components/mainPage/mainSection/Main';
import { Footer } from './components/mainPage/footer/Footer';

const app = document.querySelector('.app') as HTMLDivElement;

const header = new Header().element;
app.append(header);

const main = new Main().element;
app.append(main);

const footer = new Footer().element;
app.append(footer);
