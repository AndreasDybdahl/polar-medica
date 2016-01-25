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
              officeId: this.office.id,
              phoneNumber: {
                type: '',
                number: ''
              }
            };
          }

          if(!this.office.secretary) {
            this.office.secretary = {
              position: 'Secretary',
              officeId: this.office.id,
              phoneNumber: {
                type: '',
                number: ''
              }
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
    if(!this.office.mainContact.firstName || this.office.mainContact.firstName.length < 1) {
      this.office.mainContact = null;
    }

    if(!this.office.secretary.firstName || this.office.secretary.firstName.length < 1 ) {
      this.office.secretary = null;
    }

    // this.office.presumedPurchaseAmount = parseInt(this.office.presumedPurchaseAmount.replace(/\D+/g, ''));

    this.officeService.put(this.office);

    window.location.hash = '#/';
  }

  getViewStrategy() {
    return view;
  }
}
