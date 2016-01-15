import Ember from 'ember';

const {
  get
  } = Ember;

function getChildViews(component) {
  const childViewsKey = component._childViews ? '_childViews' : 'childViews';
  return component[childViewsKey];
}

function hasChild(component) {
  if (!component) {
    return false;
  }

  return getChildViews(component) && getChildViews(component).length;
}

function getFirstChild(component) {
  return hasChild(component) ? getChildViews(component)[0] : null;
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
