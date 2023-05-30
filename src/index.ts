import './stylesheets/main.scss';

import { PayModal } from './components/payModal/PayModal';
import { routes } from './router/routes';
import { Router } from './router/Router';

export const router = new Router(routes);
new PayModal();
