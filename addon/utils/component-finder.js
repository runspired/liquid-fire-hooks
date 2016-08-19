import Ember from 'ember';

const {
  get
  } = Ember;

function hasChild(component) {
  return component && component.childViews && component.childViews.length;
}

function getFirstChild(component) {
  return component && component.childViews && component.childViews.length ? component.childViews[0] : null;
}

function isComponent(component) {
  return component && (
    get(component, 'isComponent') ||
    get(component, 'isExplicitTaglessView') || // legacy for when this addon was custom
    component.element);
}

export default function componentFinder(lfWrapper) {
  const maxDepth = 6;
  let curDepth = 0;
  let component = getFirstChild(lfWrapper);
  
  while (!isComponent(component) && (curDepth++ <= maxDepth) && hasChild(component)) {
    component = getFirstChild(component);
  }
  return isComponent(component) ? component : null;
}
