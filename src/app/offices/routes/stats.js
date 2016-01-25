import view from './stats.html!';

import {inject} from 'aurelia-framework';
import {OfficeService} from '../services/offices';
import nitter from 'nitter/index';
import bootstrap from 'bootstrap';

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

        const { categories, doctorCount } = this._organizeOffices();
        this.organizedOffices = categories;
        this.groupByDoctorCount = doctorCount;
      })
      .catch(reject => {
        return false;
      });
  }

  getItems({ page = 0, pageSize = 10 }, index) {
    const offices = this.groupByDoctorCount[index].offices;
    const data = nitter(offices).skip(pageSize * page).take(pageSize).toArray();
    const numPages = Math.ceil(offices.length / pageSize);

    return { data, numPages }
  }

  _organizeOffices() {
    const categories = {
      'None': { count: 0, doctorCount: 0, name: 'Ingen info' },
      'Signed': { count: 0, doctorCount: 0, name: 'Signert'  },
      'WillSign': { count: 0, doctorCount: 0, name: 'Skal signere'  },
      'Positive': { count: 0, doctorCount: 0, name: 'Positiv'  },
      'NotInterested': { count: 0, doctorCount: 0, name: 'Ikke interessert'  },
      'VeryNegative': { count: 0, doctorCount: 0, name: 'Direkte negativ'  }
    };

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

    const byDoctorCount = nitter(this.offices)
      .groupBy(office => office.doctorCount)
      .orderBy(([doctorCount, _]) => doctorCount)
      .reduce((state, [doctorCount, offices]) => {
        const count = offices.count();

        offices = offices.toArray();

        return state.concat({ doctorCount, count, offices });
        // return {...state, [doctorCount]: count};
      }, []);

    console.log(byDoctorCount);

    return {
      categories: Object.keys(categories).map(k => categories[k]),
      doctorCount: byDoctorCount
    };
  }

  getViewStrategy() {
    return view;
  }
}
