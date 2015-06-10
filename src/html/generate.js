import * as LogManager from 'aurelia-logging';
import {ViewResources, CustomElement,
        AttachedBehavior, TemplateController} from 'aurelia-templating';
import {TemplateRegistryViewStrategy} from 'aurelia-templating/view-strategy';
import {Metadata, ResourceType, Origin} from 'aurelia-metadata';
import {relativeToFile} from 'aurelia-path';
import {TemplateRegistryEntry} from 'aurelia-loader';

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

class InlineViewStrategy extends TemplateRegistryViewStrategy {
  constructor(path, template) {
    let entry = new TemplateRegistryEntry(path);
    entry.setTemplate(template);
    super(path, entry);
  }
}