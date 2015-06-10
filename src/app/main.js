import './bootstrap-sandstone.min.css!';
import 'font-awesome/css/font-awesome.css!';
import 'style/site.css!'

import {bootstrap} from 'aurelia-bootstrapper';
import {AuthService, HttpClient} from './auth/auth';

bootstrap(aurelia => {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();
  
  let container = aurelia.container;
  let auth = new AuthService();
    
  container.registerInstance(AuthService, auth);
  auth.http = container.get(HttpClient);
  
  auth.attemptRelogin().then(() => {
    return aurelia.start().then(a => a.setRoot('app/app', document.body));
  });
});

(function () {
  function CustomEvent (event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
   };
  CustomEvent.prototype = window.CustomEvent.prototype;
  window.CustomEvent = CustomEvent;
})();