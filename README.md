Liquid Fire Hooks
=================

[![npm version](https://badge.fury.io/js/liquid-fire-hooks.svg)](http://badge.fury.io/js/liquid-fire-hooks)
[![Build Status](https://travis-ci.org/runspired/liquid-fire-hooks.svg?branch=master)](https://travis-ci.org/runspired/liquid-fire-hooks)
[![Ember Observer Score](http://emberobserver.com/badges/liquid-fire-hooks.svg)](http://emberobserver.com/addons/liquid-fire-hooks)

Liquid-fire-hooks provides component hooks for transitions that are triggered on the closest
component within both the removed and inserted content during a liquid-fire transition.

## Support, Questions, Collaboration

Join the [liquid-fire](https://embercommunity.slack.com/messages/liquid-fire/) channel on Slack.

[![Slack Status](https://ember-community-slackin.herokuapp.com/badge.svg)](https://ember-community-slackin.herokuapp.com/)

### Status

[Changelog](./CHANGELOG.md)

[![dependencies](https://david-dm.org/runspired/liquid-fire-hooks.svg)](https://david-dm.org/runspired/liquid-fire-hooks)
[![devDependency Status](https://david-dm.org/runspired/liquid-fire-hooks/dev-status.svg)](https://david-dm.org/runspired/liquid-fire-hooks#info=devDependencies)

## Usage

`ember install liquid-fire-hooks`

This will run the default blueprint which additionally installs `liquid-fire`.

## Hooks

#### Available Hooks

These are the available hooks, in roughly the order they would fire.

- willAnimate *(liquid-fire-tweenlite only)*
- willAnimateIn *(liquid-fire-tweenlite only)*
- willAnimateOut *(liquid-fire-tweenlite only)*
- didAnimateOut
- didAnimateIn
- didAnimate

> On default `liquid-fire` transitions, `didAnimate`/`didAnimateIn`/`didAnimateOut` will all fire once
> the entire transition has completed.  On `liquid-fire-tweenlite`, these will fire at more appropriate times
> e.g. when the old/new content has completed animating for In/Out and only after the entire transition
> is done for `didAnimate`.

By default, only transitions utilizing the `default` transition will have hooks triggered,
to have a specific transition trigger the hook, you will need to use the `with-hook` transition.

How to use the `with-hook`
```js
export default function() {
  this.transition(
    this.use('with-hook', 'to-right', { duration: 200 }),
    this.reverse('with-hook', 'to-left', { duration: 200 })
  );
}
```

> NB: If you are using `liquid-fire-tweenlite`,
> you will need to configure the `default` transition to add the hooks yourself.

For each hook, if your component implements a method matching the hook name, it will be invoked first,
 then the hook will be triggered as an `event` on your component.

e.g. for `didAnimateIn`

```js
Component.extend({

  // use the hook directly
  didAnimateIn() {
   ...
  },
  
  // use it 'event-style'
  onDidAnimate: on('didAnimateIn', function() {
   ...
  })

});
```



## Contributing

Contributions are very welcome.

When making a PR try to use the following conventions:

** Commit Messages: **

`type(shortname): action based description`

Examples:

- chore(deps): bump deps in package.json and bower.json
- docs(component): document the `fast-action` component

** Branch Naming: **

`type/short-description`

Examples:

- chore/bump-deps
- docs/fast-action-component


