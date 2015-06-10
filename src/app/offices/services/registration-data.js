export class RegistrationDataService {
  constructor() {
    this.regData = {}; 
  }
  
  getRegData() {
    return this.regData; 
  }
  
  addRegData(data) {
    Object.assign(this.regData, data);
    console.log(this.regData);
  }
}