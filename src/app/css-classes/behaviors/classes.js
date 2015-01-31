import {Behavior} from 'aurelia-framework';

export class ClassesBehaviour {
  static metadata() {
    return Behavior
      .attachedBehavior('classes')
      .withProperty('value', 'valueChanged', 'classes');
  }

  static inject() { return [Element]; }
  constructor(element) {
    this.element = element;
  }

  valueChanged(value) {
    var classString = Object.keys(value)
      .map(k => value[k] ? k : null)
      .filter(k => k !== null)
      .join(' ');

    this.element.className = classString;
  }
}