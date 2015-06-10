import {AuthService} from '../../auth/auth';
import {Router} from 'aurelia-router';

import view from './login.html!';

export class Login {
  static inject() { return [AuthService, Router]; }
  constructor(authService, router) {
    this.auth = authService;
    this.roter = router;
  }
  
  login() {
    this.auth.login(this.username, this.password).then(() => {
      this.roter.navigate('/offices');
    });
  }
  
  canActivate() {
    return !this.auth.isAuthenticated(); 
  }
  
  getViewStrategy() {
    return view;
  }
}