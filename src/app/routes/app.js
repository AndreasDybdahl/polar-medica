import {Router} from 'aurelia-router';

export class App {
  static inject() { return [Router]; }
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'Application Title';
      config.map([
        { route: 'blog',      moduleId: './blog/index', nav: true, title: 'Blog' }
      ]);
    });
  }
}