import view from './index.html!';

export class Index {  
  configureRouter(config, router){
    config.map([
      { route: '',                       moduleId: './list', title: 'Kontoroversikt' },
      { route: '/page/:page',            moduleId: './list', title: 'Kontoroversikt' },
      { route: '/page/:page/:filter',    moduleId: './list', title: 'Kontoroversikt' },
      { route: '/:id',                   moduleId: './edit', title: 'Rediger Kontor' },
      { route: '/editor',                moduleId: './editor', title: 'Markdown Preview' }
    ]);

    this.router = router;
  }

  getViewStrategy() {
    return view;
  }
}