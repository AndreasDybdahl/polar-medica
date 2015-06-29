import {AuthorizeStep, AuthService} from './auth/auth';

import view from './app.html!';

export class App {  
  static inject = [AuthService];
  constructor(auth) {
    this.auth = auth;
  }

  configureRouter(config, router) {
    this.router = router;
    
    config.title = 'Polar-Medica';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
        { route: 'offices',          moduleId: './offices/routes/index',    nav: true, settings: { isVisible: true }, title: 'Kontoroversikt' },
        { route: 'register',         moduleId: './offices/routes/register', nav: true, settings: { isVisible: true }, title: 'Registrer kontor' },
        { route: 'email',            moduleId: './offices/routes/email',    nav: true, settings: { isVisible: true }, title: 'Send mail' },
        { route: 'login',            moduleId: './login/routes/login',      auth: false,                              title: 'Logg inn' },
        { route: '',                 redirect: '/offices' }
      ]);

    
    this.auth.setRouter(router);
  }

  getViewStrategy() {
    return view;
  }
}