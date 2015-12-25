import componentFinder from '../../../utils/component-finder';
import { module, test } from 'qunit';

module('Unit | Utility | component finder');

// Replace this with your real tests.
test('Basic Tests', function(assert) {
  assert.expect(6);

  let result = componentFinder();
  assert.equal(result, null, 'Returns null when nothing is there.');

  const lfWrapper = { _childViews: [] };
  result = componentFinder(lfWrapper);
  assert.equal(result, null, 'Returns null when no component or element is found');

  const topLevel = { _childViews: [], isVirtual: true, element: false };
  lfWrapper._childViews.push(topLevel);
  result = componentFinder(lfWrapper);
  assert.equal(result, null, 'Returns null when view is virtual and unflagged');

  const midLevel = { _childViews: [], element: true };
  topLevel._childViews.push(midLevel);

  result = componentFinder(lfWrapper);
  assert.equal(result, midLevel);

  midLevel.isComponent = true;
  midLevel.element = false;
  result = componentFinder(lfWrapper);
  assert.equal(result, midLevel);

  topLevel.isComponent = true;
  result = componentFinder(lfWrapper);
  assert.equal(result, topLevel);

});
