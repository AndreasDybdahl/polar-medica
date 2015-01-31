import {Behavior} from 'aurelia-framework';

import Showdown from 'showdown';

export class MarkdownBehaviour {
  static metadata() {
    return Behavior
      .attachedBehavior('markdown')
      .withProperty('value', 'valueChanged', 'markdown');
  }

  static inject() { return [Element]; }
  constructor(element) {
    this.element = element;
    this.converter = new Showdown.converter();
  }

  valueChanged(value) {
    this.element.innerHTML = this.converter.makeHtml(
      value.split(/\r\n|\n/g).map(l => l.trim()).join('\n')
    );
  }
}