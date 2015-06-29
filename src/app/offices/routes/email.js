import view from './email.html!';

import {inject} from 'aurelia-framework';
import {OfficeService} from '../services/offices';

@inject(OfficeService)
export class Email {
  constructor(officeService) {
    this.officeService = officeService;
  }
  
  activate() {
    return this.officeService.getAll()
      .then(result => {
        this.offices = result;
        console.log(this.offices);
      })
      .catch(reject => {
        return false;
      });
  }
  
  getViewStrategy() {
    return view;
  }
}