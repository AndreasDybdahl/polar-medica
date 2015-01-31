import {Router} from 'aurelia-router';

import view from './app.html!';

export class App {
  static inject() { return [Router]; }
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'Application Title';
      config.map([
        { route: 'blog',      moduleId: './blog/routes/index', nav: true, title: 'Blog' },
        { route: '',          moduleId: './redirect', redirect: '/blog' }
      ]);
    });
  }

  getViewStrategy() {
    return view;
  }
}