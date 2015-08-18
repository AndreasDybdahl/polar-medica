import {OfficeService} from '../services/offices';
import {inject} from 'aurelia-framework';

import view from './edit.html!';

@inject(OfficeService)
export class Info {
  constructor(officeService) {
    this.officeService = officeService;
    this.maxCount = 20;
  }
  
  canActivate(params) {
    if(/^\d+$/.test(params.id)) {
      return this.officeService.get(params.id)
        .then(o => {
          if(o === null) {
            return false; 
          }
          this.office = o;
        
          if(!this.office.mainContact) {
            this.office.mainContact = {
              position: 'MainContact',
              officeId: this.office.id
            };
          }
        
          if(!this.office.secretary) {
            this.office.secretary = {
              position: 'Secretary',
              officeId: this.office.id
            };
          }
        
          console.log(this.office);
        });
    }
    
    return false;
  }
  
  deleteFromStaff(index) {
    if(this.office.doctors[index].position !== 'MainContact') {
      this.office.doctors.splice(index, 1);
    }
    else {
      this.office.doctors.splice(index, 1);
      
      this.office.mainContact = null;
    }
  }
  
  save() {
    if(!this.office.mainContact.name || this.office.mainContact.name.length < 1) {
      this.office.mainContact = null; 
    }
    
    if(!this.office.secretary.name || this.office.secretary.name.length < 1 ) {
      this.office.secretary = null; 
    }
    
    this.officeService.put(this.office); 
    
    window.location.hash = '#/';
  }
  
  getViewStrategy() {
    return view;
  }
}