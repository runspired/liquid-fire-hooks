Liquid Fire Hooks [![npm version](https://badge.fury.io/js/liquid-fire-hooks.svg)](http://badge.fury.io/js/liquid-fire-hooks)
=================

[![Build Status](https://travis-ci.org/runspired/liquid-fire-hooks.svg?branch=master)](https://travis-ci.org/runspired/liquid-fire-hooks)
[![Ember Observer Score](http://emberobserver.com/badges/liquid-fire-hooks.svg)](http://emberobserver.com/addons/liquid-fire-hooks)
[![Discord](https://img.shields.io/discord/480462759797063690.svg?logo=discord)](https://discord.gg/zT3asNS)

Liquid-fire-hooks provides a `didAnimateTransition` component hook that is triggered on the closest
component within the inserted DOM when a liquid-fire transition completes.

## Support, Questions, Collaboration

Join the Ember Community on [discord](https://discord.gg/zT3asNS)

### Status

[Changelog](./CHANGELOG.md)

[![dependencies](https://david-dm.org/runspired/liquid-fire-hooks.svg)](https://david-dm.org/runspired/liquid-fire-hooks)
[![devDependency Status](https://david-dm.org/runspired/liquid-fire-hooks/dev-status.svg)](https://david-dm.org/runspired/liquid-fire-hooks#info=devDependencies)

## Usage

`ember install liquid-fire-hooks`

This will run the default blueprint which additionally installs `liquid-fire`.

### didAnimateTransition

By default, only transitions utilizing the `default` transition will have `didAnimateTransition` triggered,
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

The component will call the component's `didAnimateTransition` method first, if present. It will then trigger
the `didAnimateTransition` event on the component.

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


