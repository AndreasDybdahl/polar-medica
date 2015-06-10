import view from './register-other.html!';
import {Register} from './register';

import {RegistrationDataService} from '../services/registration-data';

export class RegisterOther {
  static inject() { return [RegistrationDataService, Register]; }
  constructor(regDataSvc, index) {
    this.parent = index;
    this.regDataSvc = regDataSvc;
    this.other = {};
  }
  
  back() {
    this.parent.goTo('doctors'); 
  }
  
  save() {
    this.parent.save();
  }
  
  getViewStrategy() {
    return view;
  }
}