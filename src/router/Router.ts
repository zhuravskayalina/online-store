import { Routes } from './types';

export class Router {
  routes: Routes;

  constructor(routes: Routes) {
    this.routes = routes;
    this.loadInitialRoute();
    this.listenToURLChanges();
  }

  public loadRoute(...urlParts: string[]) {
    const matchedRoute = this.findMatchRoute(urlParts);
    const url = `/${urlParts.join('/')}`;
    history.pushState({}, '', url);

    const routerOutletElement = document.querySelector(
      '.app'
    ) as HTMLDivElement;

    if (matchedRoute.path) {
      routerOutletElement.replaceChildren(
        matchedRoute.getTemplate(matchedRoute.params)
      );
    } else {
      this.loadRoute('error');
    }
  }

  private findMatchRoute(urlParts: string[]) {
    const routeParams: any = {};

    const matchedRoute = this.routes.find((route) => {
      const routePathSegments = route.path.split('/').slice(1);

      if (routePathSegments.length !== urlParts.length) {
        return false;
      }

      const match = routePathSegments.every((routePathSegment, i) => {
        return routePathSegment === urlParts[i] || routePathSegment[0] === ':';
      });

      if (match) {
        routePathSegments.forEach((segment, i) => {
          if (segment[0] === ':') {
            const propName = segment.slice(1);
            routeParams[propName] = decodeURIComponent(urlParts[i]);
          }
        });
      }
      return match;
    });
    return { ...matchedRoute, params: routeParams };
  }

  private loadInitialRoute(): void {
    const pathname = window.location.pathname.split('/');
    const path = pathname.length > 1 ? pathname.slice(1) : '';

    this.loadRoute(...path);
  }

  private listenToURLChanges(): void {
    window.addEventListener('popstate', () => {
      this.loadInitialRoute();
    });
  }
}
