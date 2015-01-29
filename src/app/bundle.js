// Aurelia framework
import 'aurelia-bootstrapper';
import 'aurelia-templating-binding';
import 'aurelia-templating-router';
import 'aurelia-templating-resources';
import 'aurelia-event-aggregator';
import 'aurelia-router';
import 'aurelia-history';
import 'aurelia-history-browser';

// Extra libraries
import 'moment';
import 'showdown';

// Services
import 'services/blog';

// Behaviors
import 'behaviors/markdown';

// Routes
import 'routes/app';
import 'routes/redirect';

import 'routes/blog/index';
import 'routes/blog/list';
import 'routes/blog/post';