import {customElement, bindable} from 'aurelia-framework';

@customElement('message')
export class Message {
  @bindable type;
  @bindable text;
}