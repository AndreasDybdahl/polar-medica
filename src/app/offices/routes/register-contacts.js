import view from './register-contacts.html!';

import {RegistrationDataService} from '../services/registration-data';
import {Register} from './register';

export class RegisterContacts {
  static inject() { return [RegistrationDataService, Register]; }
  constructor(regDataSvc, index) {
    this.parent = index;
    this.regDataSvc = regDataSvc;
  }
  
  activate() {
    console.log(this.parent.secretary.phoneNumbers); 
  }
  
  back() {
    this.parent.goTo('office'); 
  }
  
  next() {
    this.parent.goTo('doctors');
  }
  
  getViewStrategy() {
    return view;
  }
}