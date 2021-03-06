import {Container, inject, customElement, noView, bindable, processContent} from 'aurelia-framework';
import {ViewSlot, ViewEngine} from 'aurelia-templating';

import loginView from './login.html!';
import logoutView from './logout.html!';
import {ViewCompileInstruction} from 'aurelia-templating';

@customElement('login-status')
@inject(Element, Container, ViewSlot, ViewEngine)
@noView
@processContent(false)
export class LoginStatus {
  @bindable user;
  
  constructor(element, container, viewSlot, viewEngine) {
    this.element = element;
    this.viewSlot = viewSlot;
    this.container = container;
    
    let options = new ViewCompileInstruction(false, true, null);
    
    this.wait = Promise.all([
      loginView.loadViewFactory(viewEngine, options).then(val => this.loginViewFactory = val),
      logoutView.loadViewFactory(viewEngine, options).then(val => this.logoutViewFactory = val)
    ]);
  }

  logout(e) {
    e.stopPropagation();
    e.preventDefault();
    
    let evt = new CustomEvent('logout', { bubbles: true, cancelable: true });
    this.element.dispatchEvent(evt);
  }

  userChanged(value) {
    this.user = value;
    this.wait.then(() => {
      this.viewSlot.removeAll();
      
      if (this.view) {
        this.view.unbind(); 
      }

      if (value) {
        this.view = this.logoutViewFactory.create(this.container, this);
        this.view.bind();
      }
      else {
        this.view = this.loginViewFactory.create(this.container, this);
        this.view.bind();
      }
      
      this.viewSlot.add(this.view);
    });
  }
}