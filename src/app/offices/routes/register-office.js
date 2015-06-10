import view from './register-office.html!';

import {RegistrationDataService} from '../services/registration-data';
import {Register} from './register';

export class RegisterOffice {
  static inject() { return [RegistrationDataService, Register]; }
  constructor(regDataSvc, index) {
    this.parent = index;
    this.regDataSvc = regDataSvc;
  }
  
  activate() {
    
  }
  
  next() {
    this.parent.goTo('contacts');
  }
  
  getViewStrategy() {
    return view;
  }
}