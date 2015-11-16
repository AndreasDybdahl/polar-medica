import {inject} from 'aurelia-framework';
import {OfficeService} from '../services/offices';
import {activationStrategy, Router} from 'aurelia-router';
import bootstrap from 'bootstrap';

import view from './list.html!';

@inject(OfficeService, Router)
export class List {
  constructor(officeService, router) {
    this.officeService = officeService;
    this.offices = [];
    // this.pageCount = 0;
    // this.router = router;
    this.selectedTypes = [];
    this.types = [
      {
        value: 'None',
        text: 'Ingen info'
      },
      {
        value: 'Signed',
        text: 'Signert'
      },
      {
        value: 'WillSign',
        text: 'Skal signere'
      },
      {
        value: 'Positive',
        text: 'Positiv'
      },
      {
        value: 'NotInterested',
        text: 'Ikke interessert'
      },
      {
        value: 'VeryNegative',
        text: 'Direkte negativ'
      }
    ];
  }

  activate(params) {
    this.page = params.page ? params.page : 1;
    this.doctorName = params.doctorName ? params.doctorName : '';
    this.officeName = params.officeName ? params.officeName : '';
    this.pageSize = params.pageSize ? params.pageSize : 10;
  }

  getItems({ page = 0, pageSize = 10 }) {
    return this.officeService.getPaginated(page + 1, this.selectedTypes.toString(), this.doctorName, this.officeName, pageSize)
      .then(result => {
        const data = result.results;
        const numPages = result.pageCount;

        if (this.doctorName.length > 1 || this.officeName.length > 1) {
          this.filter = true;
        }

        console.log(result);

        return { data, numPages };
      })
      .catch(reject => {
        return false;
      });
  }

  changeType(type) {
    if(this.selectedTypes.indexOf(type) !== -1) {
      for(let i = this.selectedTypes.length - 1; i >= 0; i--) {
        if (this.selectedTypes[i] === type) {
          this.selectedTypes.splice(i, 1);
        }
      }
    } else {
      this.selectedTypes.push(type);
    }

    this.reset();

    return true;
  }

  editOffice(id) {
    return `#/offices/${id}/`;
  }

  status(status) {
    if (status === 'Signed') {
      return 'fa fa-check';
    }
    else if (status === 'WillSign') {
      return 'fa fa-pencil';
    }
    else if (status === 'Positive') {
      return 'fa fa-plus';
    }
    else if (status === 'NotInterested') {
      return 'fa fa-minus';
    }
    else if (status === 'VeryNegative') {
      return 'fa fa-exclamation';
    }
    else {
      return 'fa fa-times';
    }
  }

  reset() {
    this.paginated.reset();
  }

  removeFilter() {
    this.filter = false;

    this.doctorName = '';
    this.officeName = '';

    this.reset();
  }

  pressedKey(e) {
    if (e.keyIdentifier === 'Enter') {
      this.reset();
    }
  }

  determineActivationStrategy(){
    return activationStrategy.replace;
  }

  getViewStrategy() {
    return view;
  }
}
