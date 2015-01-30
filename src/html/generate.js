import * as LogManager from 'aurelia-logging';
import {ViewStrategy, ViewResources, CustomElement,
        AttachedBehavior, TemplateController} from 'aurelia-templating';
import {Metadata, ResourceType, Origin} from 'aurelia-metadata';
import {relativeToFile} from 'aurelia-path';

var hasTemplateElement = ('content' in document.createElement('template'));
var logger = LogManager.getLogger('systemjs-html-import');

export default function generate(path, html, deps) {
  var doc = document.createDocumentFragment();
  var div = document.createElement('div');
  div.innerHTML = html;
  while(div.firstChild) {
    doc.appendChild(div.firstChild);
  }

  if(!hasTemplateElement) {
    HTMLTemplateElement.bootstrap(doc);
  }

  var template = doc.querySelector('template');

  if(!template) {
    throw new Error('There was no template element found');
  }

  return new InlineViewStrategy(path, template, deps);
};

class InlineViewStrategy extends ViewStrategy {
  constructor(path, template, deps) {
    this.path = path;
    this.template = template;
    this.deps = deps;
  }

  loadViewFactory(viewEngine, options) {
    var existing = viewEngine.importedViews[this.path];
    if (existing) {
      return Promise.resolve(existing);
    }

    return this.loadResources(viewEngine).then(resources => {
      var existing = viewEngine.importedViews[this.path];
      if (existing) {
        return Promise.resolve(existing);
      }

      var factory = viewEngine.viewCompiler.compile(this.template, resources, options);
      viewEngine.importedViews[this.path] = factory;
      return factory;
    });
  }

  loadResources({appResources, resourceCoordinator}) {
    var i, l;
    var registry = new ViewResources(appResources, this.path),
        dxImportElements = this.template.content.querySelectorAll('import');

    if (dxImportElements.length === 0) {
      return Promise.resolve(registry);
    }

    var importIds = new Array(dxImportElements.length);
    var names = new Array(dxImportElements.length);

    for (i = 0, l = dxImportElements.length; i < l; ++i) {
      var current = dxImportElements[i];
      var src = current.getAttribute('from');

      if (!src) {
        throw new Error(`Import element in ${this.path} has no "from" attribute.`);
      }

      importIds[i] = src;
      names[i] = current.getAttribute('as');

      if (current.parentNode) {
        current.parentNode.removeChild(current);
      }
    }

    importIds = importIds.map(x => relativeToFile(x, this.path));
    logger.debug(`importing resources for ${this.path}`, importIds);

    return resourceCoordinator.importResourcesFromModuleIds(importIds).then(toRegister => {
      for (i = 0, l = toRegister.length; i < l; ++i) {
        toRegister[i].register(registry, names[i]);
      }

      return registry;
    });
  }
}