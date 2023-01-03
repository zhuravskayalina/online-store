import './stylesheets/main.scss';
//ToDo наверное стоит перенести импорт переменных на самый верх
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { CartPage } from './components/cartPage/cartPage';
import { MainSection } from './components/mainPage/mainSection/Main';
import { Card } from './components/productPage/productCard/Card';
import { dataBase } from './dataBase/dataBase';
import { snowboardBrandList, bootsBrandList, accessoriesBrandList, categoriesList, brandsList } from './dataBase/filtersList';
import { ErrorPage } from './components/errorPage/ErrorPage';
import { Detail } from './components/productPage/productDescription/bigCardProductDescription';
import { createProductPage } from './components/productPage/bigCardPageAssembly/bigCardPageAssembly';
import { Checkbox } from './components/productPage/checkbox/Checkbox';
import { CheckboxBlock } from './components/productPage/checkboxFilters/checkboxFiltersBlock';
import { AllFiltersBlock } from './components/productPage/filters/filters';
import { SelectSort } from './components/productPage/selectSort/selectSort';
import {PayModal} from './components/payModal/PayModal';
import { Catalog } from './components/productPage/catalog/catalog';
import { DualSlider } from './components/productPage/dualSlider/DualSlider';

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

/* test for checkbox*/
// const checkbox = new Checkbox('Nitro').checkbox;
// app.append(checkbox);
// const checkboxBlock = new CheckboxBlock(categoriesList).checkboxBlock;
// app.append(checkboxBlock);
// const  filtersBlock = new AllFiltersBlock(categoriesList, brandsList).allFiltersBlock;
// app.append(filtersBlock);
// const catalog = new Catalog(dataBase[5]).catalog;
// app.append(catalog);


const select = new SelectSort().selectForme;
app.append(select);

// const payModal = new PayModal().element;
// app.append(payModal);

// const quantitySlider = new DualSlider();
// const element = quantitySlider.quantitySlider;
// app.append(element);
// quantitySlider.initSliderStyle('quantity');
//
// const priceSlider = new DualSlider();
// const elem = priceSlider.priceSlider;
// app.append(elem);
// priceSlider.initSliderStyle('price');

const footer = new Footer().element;
app.append(footer);
