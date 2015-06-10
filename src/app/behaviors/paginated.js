import {customElement, bindable} from 'aurelia-framework';
//import {activationStrategy} from 'aurelia-router';

@customElement('paginated')
export class Paginated {
  @bindable pageCount;
  @bindable offices;
  @bindable basePath;
  @bindable page;
  @bindable filter;

  goTo(page) {
    if (this.filter) {
      return `${this.basePath}/${page}/${this.filter}`;
    }
    
    return `${this.basePath}/${page}`;
  }
  
  editOffice(id) {
    return `#/offices/${id}/`;
  }
   
  relative(shift) {
    let tmp = this.page + shift;
    
    if(tmp > this.pageCount) {
      return this.page; 
    }
    else if (tmp < 1) {
      return this.page;
    }
    
    return tmp;
  }
  
  isActive(pageNo) {
    if(pageNo === this.page) {
      return 'active';
    }
    else {
      return '';
    }
  }

  getPages(count) {
    return Array.from(count);
  }
   
  pageCountChanged(newVal) {
    this.pageCount = newVal;
  }
   
//  determineActivationStrategy(){
//    return activationStrategy.replace;
//  }
}