import {Redirect} from 'aurelia-router';

export class RedirectRoute {
  canActivate(params, _, route) {
    return new Redirect(route.redirect);
  }
}