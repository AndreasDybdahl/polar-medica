import view from './stats.html!';

import {inject} from 'aurelia-framework';
import {OfficeService} from '../services/offices';
import nitter from 'nitter/index';

@inject(OfficeService)
export class Stats {
  constructor(officeService) {
    this.officeService = officeService;
  }
  
  activate() {
    return this.officeService.getAll()
      .then(result => {
        this.offices = result;
        console.log(this.offices);
      
        this.organizedOffices = this._organizeOffices();
      })
      .catch(reject => {
        return false;
      });
  }
  
  _organizeOffices() {
    const categories = { 
      'None': { count: 0, doctorCount: 0, name: 'Ingen info' },
      'Signed': { count: 0, doctorCount: 0, name: 'Signert'  },
      'WillSign': { count: 0, doctorCount: 0, name: 'Skal signere'  },
      'Positive': { count: 0, doctorCount: 0, name: 'Positiv'  },
      'NotInterested': { count: 0, doctorCount: 0, name: 'Ikke interessert'  },
      'VeryNegative': { count: 0, doctorCount: 0, name: 'Direkte negativ'  }
    }
    
    nitter(this.offices).groupBy(office => office.membershipStatus)
      .map(([status, offices]) => {
        const count = offices.count();
        const doctorCount = offices.map(o => o.doctorCount).sum();
      
        return {status, count, doctorCount};
      })
      .forEach(({status, count, doctorCount}) => {
        const c = categories[status];
        c.count = count;
        c.doctorCount = doctorCount;
      });
    
    return Object.keys(categories).map(k => categories[k]);
  }
  
  getViewStrategy() {
    return view;
  }
}