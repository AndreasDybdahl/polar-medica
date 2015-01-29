import {Router} from 'aurelia-router';

export class App {
  static inject() { return [Router]; }
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'Application Title';
      config.map([
        { route: '',      moduleId: './blog/index', nav: true, title: 'Home' }
      ]);
    });
  }
}