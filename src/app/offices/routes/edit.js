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
          console.log(this.office);
        });
    }
    
    return false;
  }
  
  save() {
    this.officeService.put(this.office); 
    
    window.location.hash = '#/';
  }
  
  getViewStrategy() {
    return view;
  }
}