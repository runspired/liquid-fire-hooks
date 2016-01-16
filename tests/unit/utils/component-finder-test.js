import componentFinder from '../../../utils/component-finder';
import { module, test } from 'qunit';

module('Unit | Utility | component finder | Pre-2.0', {
  setup() {
    this.lfWrapper = { _childViews: [] };
    this.topLevel = { _childViews: [], isVirtual: true, element: false };
    this.midLevel = { _childViews: [], element: true };

    this.addChildView = (parent, child) => {
      parent._childViews.push(child);
    };
  }
});

function sharedComponentExamples(assert) {
  assert.expect(6);

  let result = componentFinder();
  assert.equal(result, null, 'Returns null when nothing is there.');

  result = componentFinder(this.lfWrapper);
  assert.equal(result, null, 'Returns null when no component or element is found');

  this.addChildView(this.lfWrapper, this.topLevel);
  result = componentFinder(this.lfWrapper);
  assert.equal(result, null, 'Returns null when view is virtual and unflagged');

  this.addChildView(this.topLevel, this.midLevel);

  result = componentFinder(this.lfWrapper);
  assert.equal(result, this.midLevel);

  this.midLevel.isComponent = true;
  this.midLevel.element = false;
  result = componentFinder(this.lfWrapper);
  assert.equal(result, this.midLevel);

  this.topLevel.isComponent = true;
  result = componentFinder(this.lfWrapper);
  assert.equal(result, this.topLevel);
}

test('Pre-2.0', sharedComponentExamples);

module('Unit | Utility | component finder | 2.0+', {
  setup() {
    this.lfWrapper = { childViews: [] };
    this.topLevel = { childViews: [], isVirtual: true, element: false };
    this.midLevel = { childViews: [], element: true };

    this.addChildView = (parent, child) => {
      parent.childViews.push(child);
    };
  }
});

test('2.0+', sharedComponentExamples);
