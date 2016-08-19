import componentFinder from '../../../utils/component-finder';
import { module, test } from 'qunit';

module('Unit | Utility | component finder');

// Replace this with your real tests.
test('Basic Tests', function(assert) {
  assert.expect(6);

  let result = componentFinder();
  assert.equal(result, null, 'Returns null when nothing is there.');

  const lfWrapper = { childViews: [] };
  result = componentFinder(lfWrapper);
  assert.equal(result, null, 'Returns null when no component or element is found');

  const topLevel = { childViews: [], isVirtual: true, element: false };
  lfWrapper.childViews.push(topLevel);
  result = componentFinder(lfWrapper);
  assert.equal(result, null, 'Returns null when view is virtual and unflagged');

  const midLevel = { childViews: [], element: true };
  topLevel.childViews.push(midLevel);

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
