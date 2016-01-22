import getComponent from '../utils/component-finder';
import Ember from 'ember';

const {
  deprecate,
  deprecateFunc
  } = Ember;

export default function withHookTransition(delegateTo, ...args) {
  const transition = this.lookup(delegateTo).apply(this, args);

  const didAnimateTransitionIn = fireHook.bind(this, 'newView', 'didAnimateIn');
  const didAnimateTransitionOut = fireHook.bind(this, 'oldView', 'didAnimateOut');

  // are we dealing with a TransitionPromise?
  if (transition.animateIn) {
    transition.firstStep().then(willAnimateTransition.bind(this));
    transition.animateOut().then(didAnimateTransitionOut);
    transition.animateIn().then(didAnimateTransitionIn);
    return transition.then(animationDidComplete.bind(this));

  } else {
    return transition
      .then(didAnimateTransitionOut)
      .then(didAnimateTransitionIn)
      .then(animationDidComplete.bind(this));
  }

}

function willAnimateTransition(infos) {
  fireHook.call(this, 'oldView', 'willAnimate');
  fireHook.call(this, 'newView', 'willAnimate');
  fireHook.call(this, 'oldView', 'willAnimateOut');
  fireHook.call(this, 'newView', 'willAnimateIn');

  return infos;
}

function animationDidComplete(infos) {
  fireHook.call(this, 'oldView', 'didAnimate');
  fireHook.call(this, 'newView', 'didAnimate');

  return infos;
}

function fireComponentHook(component, hook) {
  if (component) {
    if (component[hook]) {
      component[hook]();
    } else if (hook === 'didAnimateIn' && component.didAnimateTransition) {
      const fn = deprecateFunc(`[liquid-fire-hooks] component.didAnimateTransition is deprecated, please use \`Component.didAnimateIn\` instead.`, component.didAnimateTransition);
      fn();
    }
    if (component.trigger) {
      component.trigger(hook);
      if (hook === 'didAnimateIn' && component.has('didAnimateIn')) {
        deprecate(`[liquid-fire-hooks] event:didAnimateTransition is deprecated, please use \`didAnimateIn\` instead.`, true);
        component.trigger('didAnimateTransition');
      }
    }
  }
}

function fireHook(prop, hook, passThru) {
  if (this[prop]) {
    const component = getComponent(this[prop]);
    fireComponentHook(component, hook);
  }
  return passThru;
}
