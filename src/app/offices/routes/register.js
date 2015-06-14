import {OfficeService} from '../services/offices';

import view from './register.html!';

export class Register {
  static inject() { return [OfficeService]; }
  constructor(officeService) {
    this.officeService = officeService;
    
    this.initData();
  }
  
  configureRouter(config, router){
    config.map([
      { route: ['', 'office'],       moduleId: './register-office', title: 'Registrer - Kontorinfo' },
      { route: 'contacts',     moduleId: './register-contacts', title: 'Registrer - Kontaktinfo' },
      { route: 'doctors',      moduleId: './register-doctors', title: 'Registrer - Ansatte leger' },
      { route: 'other',        moduleId: './register-other', title: 'Registrer - Annet' }
    ]);

    this.router = router;
  }
  
  initData() {
    this.doctors = [];
    this.mainContact = {
      name: '',
      email: '',
      phoneNumbers: {
        number: '',
        type: 'mobile'
      },
      position: 'doctor'
    };
    this.secretary = {
      name: '',
      email: '',
      phoneNumbers: {
        number: '',
        type: 'mobile'
      },
      position: 'secretary'
    };
    this.name = '';
    this.address = '';
    this.email = '';
    this.phoneNumber = {
      number: '',
      type: 'landline'
    };
    this.areaCode = '';
    this.postalArea = '';
    this.presumedPurchaseAmount = '';
    this.membershipStatus = null;
    this.customerSatisfaction = null;
    this.orderHistory = null;
    this.followUp = null;
    this.specialRequirements = ''; 
  }
  
  initTestData() {
    this.doctors = [];
    this.mainContact = {
      name: 'Kari Dunk',
      email: 'kari@dunk.no',
      phoneNumber: {
        number: '90028548',
        type: 'mobile'
      },
      position: 'doctor'
    };
    this.secretary = {
      name: 'Ola Dunk',
      email: 'ola@dunk.no',
      phoneNumber: {
        number: '93059897',
        type: 'mobile'
      },
      position: 'secretary'
    };
    this.name = 'Ullern Legekontor';
    this.address = 'Bjørnslettveien 5C';
    this.email = 'ullern@legekontor.no';
    this.phoneNumber = {
      number: '22505910',
      type: 'landline'
    };
    this.areaCode = '0382';
    this.postalArea = 'Oslo';
    this.presumedPurchaseAmount = '10000';
    this.membershipStatus = null;
    this.customerSatisfaction = null;
    this.orderHistory = null;
    this.followUp = null;
    this.specialRequirements = 'This is a text'; 
  }
  
  goTo(route) {
    this.router.navigate(route);
  }
  
  save() {
    let data = {
      name: this.name, 
      address: this.address, 
      email: this.email, 
      phoneNumber: this.phoneNumber, 
      areaCode: this.areaCode, 
      postalArea: this.postalArea, 
      mainContact: this.mainContact, 
      secretary: this.secretary, 
      doctors: this.doctors, 
      presumedPurchaseAmount: this.presumedPurchaseAmount, 
      membershipStatus: this.membershipStatus, 
      customerSatisfaction: this.customerSatisfaction, 
      orderHistory: this.orderHistory, 
      followUp: this.followUp, 
      specialRequirements: this.specialRequirements
    };
    
    this.officeService.post(data);
    
    console.log(data);
    
    // temporary re-direct fix
    window.location.hash = '#/';
  }

  getViewStrategy() {
    return view;
  }
}