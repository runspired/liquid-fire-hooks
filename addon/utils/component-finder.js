import Ember from 'ember';

const {
  get
  } = Ember;

function hasChild(component) {
  return component && component._childViews && component._childViews.length;
}

function getFirstChild(component) {
  return component._childViews && component._childViews.length ? component._childViews[0] : null;
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
  return component;
}
