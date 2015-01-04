var scopable = require('../index');
var assert = require('assert');

describe('factory and prototype', function() {
  it('', function() {
    var sample = {};

    var scope = scopable(sample);

    assert('apply' in scope && 'push' in scope);
    assert.strictEqual(scope.source, sample);
  });
});

describe('#apply with no argument', function() {
  it('', function() {
    var sample = {a: 1};
    assert.deepEqual(scopable(sample).apply(), sample);
  });
});

describe('#push with #assign fn', function() {
  it('', function() {
    var sample = {};
    var scope = scopable(sample);

    scope.push('one', scopable.assign);
    scope.push('two', scopable.assign);

    assert.equal(scope.apply({one: 1}).one, 1);
    assert.equal(scope.apply({one: 1}).two, undefined);

    assert.deepEqual(scope.apply({one: 1, two: 2}), {one: 1, two: 2});
  });
});

describe('#push with #invoke fn', function() {
  it('', function() {
    var sample = [1, 2, 3];

    sample.multiply = function(n) {
      return this.map(function(value) {
        return value * n;
      });
    };

    var scope = scopable(sample);

    scope.push('multiply', scopable.invoke);

    assert.deepEqual(scope.apply({multiply: 1}), [1, 2, 3]);
    assert.deepEqual(scope.apply({multiply: 2}), [2, 4, 6]);
  });
});

describe('#push with default value', function() {
  it('', function() {
    var sample = {};

    var scope = scopable(sample);

    scope.push('one', 1, scopable.assign);

    assert.equal(scope.apply().one, 1);
    assert.equal(scope.apply({one: 2}).one, 2);
  });
});

describe('#push with custom fn', function() {
  it('', function() {
    var sample = 'Sample';

    var scope = scopable(sample);

    scope.push('call', function(name) {
      return this[name]();
    });

    assert.equal(scope.apply({call: 'toUpperCase'}), 'SAMPLE');
    assert.equal(scope.apply({call: 'toLowerCase'}), 'sample');
  });
});
