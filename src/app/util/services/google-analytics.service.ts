import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

declare var ga: Function;

@Injectable()
export class GoogleAnalyticsService {

  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      try {
        if (typeof ga === 'function') {
          if (event instanceof NavigationEnd) {
            ga('set', 'page', event.urlAfterRedirects);
            ga('send', 'pageview');
            console.log('%%% Google Analytics page view event %%%');
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
}
