import view from './register-doctors.html!';

import {RegistrationDataService} from '../services/registration-data';
import {Register} from './register';

export class RegisterDoctors {
  static inject() { return [RegistrationDataService, Register]; }
  constructor(regDataSvc, index) {
    this.parent = index;
    this.regDataSvc = regDataSvc;
    this.doctor = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: {
        number: '',
        type: 'mobile'
      },
      position: 'doctor'
    };
  }

  addToTable() {
    this.parent.doctors.push(this.doctor);
    this.doctor = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: {
        number: '',
        type: 'mobile'
      },
      position: 'doctor'
    };
  }

  deleteFromTable(index) {
    this.parent.doctors.splice(index, 1);
  }

  back() {
    this.parent.goTo('contacts');
  }

  next() {
    this.parent.goTo('other');
  }

  getViewStrategy() {
    return view;
  }
}
