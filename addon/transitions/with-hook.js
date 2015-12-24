import getComponent from '../utils/component-finder';

export default function withHookTransition(delegateTo, ...args) {
  return this.lookup(delegateTo).apply(this, args)
    .then((infos) => {
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

      return infos;
    });
}
