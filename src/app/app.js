import {AuthorizeStep, AuthService} from './auth/auth';

import view from './app.html!';

export class App {  
  static inject = [AuthService];
  constructor(auth) {
    this.auth = auth;
  }

  configureRouter(config, router){
    config.title = 'Polar-Medica';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
        { route: 'offices',          moduleId: './offices/routes/index', nav: true, title: 'Kontoroversikt' },
        { route: 'register',         moduleId: './offices/routes/register', nav: true, title: 'Registrer kontor' },
        { route: 'login',            moduleId: './login/routes/login', auth: false, title: 'Logg inn' },
        { route: '',                 redirect: '/offices' }
      ]);

    this.router = router;
  }

  getViewStrategy() {
    return view;
  }
  
  showLink() {
    if(this.auth.user) {
      return true; 
    }
    else {
      return false; 
    }
  }
}