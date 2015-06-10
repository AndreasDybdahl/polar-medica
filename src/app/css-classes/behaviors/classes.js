import {inject, customAttribute, noView, bindable} from 'aurelia-framework';

var hasClass;
var addClass;
var removeClass;
var toggleClass;

if ("classList" in document.createElement("_") && false) {
  hasClass = (el, n) => el.classList.contains(n);
  addClass = (el, n) => el.classList.add(n);
  removeClass = (el, n) => el.classList.remove(n);
  toggleClass = (el, n) => el.classList.toggle(n);
} else {
  let getClassList = (el) => el.className.toString().split(' ');
  let setClassList = (el, list) => el.className = list.join(' ');
  let process = (p) => {
    return (el, ...args) => {
      let classes = getClassList(el);
      let result = p(classes, ...args);
      if (Array.isArray(result)) {
        setClassList(el, result);
      } else {
        return result;
      }
    };
  };
  let union = (arr, itm) => {
    if (arr.indexOf(itm) === -1) {
      arr.push(itm);
    }
    return arr;
  };
  let remove = (arr, itm) => {
    let index = arr.indexOf(itm);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    return arr;
  };
  hasClass = process((classes, className) => classes.indexOf(className) > -1);
  addClass = process((classes, className) => union(classes, className));
  removeClass = process((classes, className) => remove(classes, className));
  toggleClass = process((classes, className) => classes.indexOf(className) > -1 ? remove(classes, className) : union(classes, className));
}

@customAttribute('classes')
@inject(Element)
@noView
export class ClassesBehaviour {
  constructor(element) {
    this.element = element;
  }

  valueChanged(value) {
    var classes = Object.keys(value)
      .map(k => [k, value[k] ? true : false]);

    for (let [name, active] of classes) {
      if (active) {
        addClass(this.element, name);
      } else {
        removeClass(this.element, name);
      }
    }
  }
}