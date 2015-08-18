export class OfficeValueConverter {
  toView(value) {
    return value.toString();
  }
  
  fromView(value) {
    return parseInt(value, 10);
  }
}