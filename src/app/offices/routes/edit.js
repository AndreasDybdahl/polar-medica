import {OfficeService} from '../services/offices';
import {inject} from 'aurelia-framework';

//import bootstrap from 'bootstrap';

import view from './edit.html!';

@inject(OfficeService)
export class Info {
  constructor(officeService) {
    this.officeService = officeService;
    this.maxCount = 20;
  }

  initTmpDoctor() {
    return {
      officeId: this.office.id,
      position: 'doctor'
    };
  }

  displayOrgNumber (number) {
    
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

  addToStaff() {
    this.office.doctors.push(this.initTmpDoctor());
    this.office.doctorCount++;
  }

  deleteFromStaff(index) {
    if(this.office.doctors[index].position !== 'MainContact') {
      this.office.doctors.splice(index, 1);

      this.office.doctorCount -= 1;
    }
    else {
      this.office.doctors.splice(index, 1);

      this.office.mainContact = null;

      this.office.doctorCount--;
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
