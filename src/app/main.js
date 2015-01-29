import 'bootstrap/css/bootstrap.css!';
import 'style/site.css!'

/* The following imports are only to include the frameworks when bundeling */
import 'aurelia-templating-binding';
import 'aurelia-templating-router';
import 'aurelia-templating-resources';
import 'aurelia-event-aggregator';
import 'aurelia-router';
import 'aurelia-history';
import 'aurelia-history-browser';

import 'moment';
import 'showdown';
/* End of bundle only imports */

import {LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';
import {bootstrap} from 'aurelia-bootstrapper';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.levels.debug);

bootstrap(aurelia => {
  aurelia.use
    .defaultBindingLanguage()
    .defaultResources()
    .router()
    .eventAggregator();

  aurelia.start().then(a => a.setRoot('lib/app/routes/app', document.body));
});