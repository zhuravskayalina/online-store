import { Routes, TemplateParams } from './types';

export class Router {
  routes: Routes;
  visitedRoutes: string[];

  constructor(routes: Routes) {
    this.routes = routes;
    this.visitedRoutes = [];
    this.loadInitialRoute();
    this.listenToURLChanges();
  }

  public loadRoute = (isFromPopState?: boolean, ...urlParts: string[]) => {
    const matchedRoute = this.findMatchRoute(urlParts);
    const url = `/${urlParts.join('/')}`;

    if (!isFromPopState) {
      this.visitedRoutes.push(url);
    }

    history.pushState({}, '', url);

    const routerOutletElement = document.querySelector(
      '.app'
    ) as HTMLDivElement;

    if (matchedRoute) {
      routerOutletElement.replaceChildren(
        matchedRoute.getTemplate(matchedRoute.params)
      );
    } else {
      this.loadRoute(false, 'error');
    }
    document.body.scrollIntoView({ behavior: 'smooth' });
  };

  private findMatchRoute(urlParts: string[]) {
    const routeParams: TemplateParams = {};

    const matchedRoute = this.routes.find((route) => {
      const routePathSegments = route.path.split('/').slice(1);

      if (routePathSegments.length !== urlParts.length) {
        return false;
      }

      const match = routePathSegments.every((routePathSegment, i) => {
        return routePathSegment === urlParts[i] || routePathSegment[0] === ':';
      });

      routePathSegments.forEach((segment, i) => {
        if (segment[0] === ':') {
          const propName = 'productId';
          routeParams[propName] = decodeURIComponent(urlParts[i]);
        }
      });
      return match;
    });

    if (matchedRoute) {
      return { ...matchedRoute, params: routeParams };
    }
  }

  private loadInitialRoute(): void {
    const pathname = window.location.pathname.split('/');
    const path = pathname.length > 1 ? pathname.slice(1) : '';

    this.loadRoute(false, ...path);
  }

  private listenToURLChanges(): void {
    window.addEventListener('popstate', () => {
      this.visitedRoutes.pop();
      const previousRoute =
        this.visitedRoutes[this.visitedRoutes.length - 1] ?? '';

      const previousRouteArr = previousRoute.slice(1).split('/');

      this.loadRoute(true, ...previousRouteArr);
    });
  }
}
