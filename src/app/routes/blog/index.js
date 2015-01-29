import {Router} from 'aurelia-router';
import {BlogService} from '../../services/blog';

export class Index {
  static inject() { return [Router, BlogService]; }
  constructor(router, blogService) {
    this.router = router;
    this.blogService = blogService;

    router.configure(config => {
      config.map([
        { route: ['', 'page/:page'],          moduleId: './list', nav: true, title: 'Latest Posts' },
        { route: ':year/:month/:date/:slug',  moduleId: './post' }
      ]);
    });
  }
}