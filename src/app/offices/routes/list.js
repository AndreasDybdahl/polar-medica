import {inject} from 'aurelia-framework';
import {OfficeService} from '../services/offices';
import {activationStrategy, Router} from 'aurelia-router';

import view from './list.html!';

@inject(OfficeService, Router)
export class List {
  constructor(officeService, router) {
    this.officeService = officeService;
    this.offices = [];
    this.page = 1;
    this.pageCount = 0;
    this.pageSize = 10;
    this.router = router;
  }
  
  activate(params) {
    this.page = params.page ? params.page : 1;
    this.filter = params.filter ? params.filter : false;
    
    if(!this.filter) {
      return this.getPaginated(this.page)
        .catch(reject => {
          return false;
        });
    }
    else {
      return this.getFilteredPaginated(this.page, this.filter, this.pageSize)
        .catch(reject => {
          return false;
        });
    }
  }
  
  removeFilter() {
    this.filter = false; 
    
    this.router.navigate('#/offices/page/1');
  }
  
  getPaginated(page) {
    return this.officeService.getPaginated(page, this.pageSize)
      .then(result => {
        this.offices = result.results;
        this.page = result.page;
        this.pageCount = result.pageCount;
      })
      .catch(reject => {
        return false;
      });
  }
  
  pressedKey(e) {
    console.log(e.keyIdentifier); 
    if (e.keyIdentifier === 'Enter' && this.doctorName) {
      this.getFilteredPaginated(1, this.doctorName);
    }
  }
  
  getFilteredPaginated(page, name) {    
    return this.officeService.getPaginatedFiltered(page, name, this.pageSize)
      .then(result => {
        this.filter = name;
        this.offices = result.results;
        this.page = result.page;
        this.pageCount = result.pageCount;
      })
      .catch(reject => {
        return false;
      });
  }
  
  determineActivationStrategy(){
    return activationStrategy.replace;
  }
  
  getViewStrategy() {
    return view;
  }
}