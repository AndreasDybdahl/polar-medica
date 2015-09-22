import {customElement, bindable} from 'aurelia-framework';
//import {activationStrategy} from 'aurelia-router';

@customElement('paginated')
export class Paginated {
  @bindable pageCount;
  @bindable offices;
  @bindable basePath;
  @bindable page;
  @bindable doctorName;
  @bindable officeName;
  @bindable pageSize;


  goTo(page) {
    return `${this.basePath}?page=${page}&doctorName=${this.doctorName}&officeName=${this.officeName}&pageSize=${this.pageSize}`;
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

  signedStatus(status) {
    if(status === 'Signed') {
      return 'fa fa-check';
    }
    else if(status === 'WillSign') {
      return 'fa fa-pencil';
    }
    else if(status === 'Positive') {
      return 'fa fa-plus';
    }
    else if(status === 'NotInterested') {
      return 'fa fa-minus';
    }
    else if(status === 'VeryNegative') {
      return 'fa fa-exclamation';
    }
    else {
      return 'fa fa-times';
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
