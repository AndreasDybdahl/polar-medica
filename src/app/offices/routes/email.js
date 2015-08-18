import view from './email.html!';

import {inject} from 'aurelia-framework';
import {OfficeService} from '../services/offices';

@inject(OfficeService)
export class Email {
  constructor(officeService) {
    this.officeService = officeService;
    this.filteredOffices = [];
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
  
  filter(filter) {
    if(filter !== 'all') {
      this.filteredOffices = [];
      
      this.offices.forEach((office) => {
        if(office.membershipStatus === filter) {
          this.filteredOffices.push(office); 
        }
      }); 
    }
    else {
      this.filteredOffices = [];
      this.filteredOffices = this.offices; 
    }
  }
  
  getViewStrategy() {
    return view;
  }
}