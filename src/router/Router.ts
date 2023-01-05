import { Routes } from './types';
import { makeLogger } from 'ts-loader/dist/logger';

export class Router {
  routes: Routes;

  constructor(routes: Routes) {
    this.routes = routes;
    this._loadInitialRoute();
    this._listenURLChanges();
  }

  loadRoute(...urlSegments: string[]) {
    const matchedRoute = this._matchUrlToRoute(urlSegments);

    const url = `/${urlSegments.join('/')}`;
    history.pushState({}, '', url);

    const routerOutletElement = document.querySelector('.app') as HTMLDivElement;
    if (matchedRoute) {
      routerOutletElement.replaceChildren(matchedRoute.template);
    } else {
      console.log('no matching route');
    }
  }

  _matchUrlToRoute(urlSegments: string[]) {
    const matchedRoute = this.routes.find((route) => {
      const routePathSegments = route.path.split('/').slice(1);

      if (routePathSegments.length !== urlSegments.length) {
        return false;
      }

      return routePathSegments.every(
        (routePathSegment, i) => routePathSegment === urlSegments[i]
      );
    });
    return matchedRoute;
  }

  _loadInitialRoute() {
    const pathnameSplit = window.location.pathname.split('/');
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
    this.loadRoute('');
    this.loadRoute(...pathSegments);
  }

  _listenURLChanges() {
    window.addEventListener('popstate', (event: PopStateEvent) => {

    });
  }

}

interface PopStateEventCustom extends PopStateEvent {
  path: string[];
}
