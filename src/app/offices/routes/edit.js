import {OfficeService} from '../services/offices';

import view from './edit.html!';

export class Info {
  static inject() { return [OfficeService]; }
  constructor(officeService) {
    this.officeService = officeService;
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