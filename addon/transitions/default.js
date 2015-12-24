import { Promise } from "liquid-fire";
import getComponent from '../utils/component-finder';

// This is what we run when no animation is asked for. It just sets
// the newly-added element to visible (because we always start them
// out invisible so that services can control their initial
// appearance).
export default function defaultTransition() {

  if (this.newElement) {
    this.newElement.css({visibility: ''});
  }

  if (this.newView) {
    const component = getComponent(this.newView);

    if (component) {
      if (component.didAnimateTransition) {
        component.didAnimateTransition();
      }
      if (component.trigger) {
        component.trigger('didAnimateTransition');
      }
    }
  }
  return Promise.resolve();

}
