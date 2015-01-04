/* jshint node: true */

// Scopable v1.0.0 2015-01-03T16:06:23-0300
// by @haggen <arthur@corenzan.com>
// more on github.com/haggen/scopable-js

function Scopable(source) {
  this.source = source;
  this.scopes = {};
}

Scopable.prototype.push = function(key, value, fn) {
  if(typeof value === 'function') {
    fn = value;
    value = undefined;
  }

  this.scopes[key] = { value: value, fn: fn };
};

Scopable.prototype.apply = function(args) {
  var key, scope, value;

  scope = this.source;

  args = args || {};

  for(key in this.scopes) {
    if(this.scopes.hasOwnProperty(key)) {
      value = args[key] || this.scopes[key].value;
      scope = value !== undefined ? this.scopes[key].fn.call(scope, value, key) : scope;
    }
  }

  return scope;
};

var factory = function(source) {
  return new Scopable(source);
};

factory.assign = function(value, key) {
  this[key] = value;
  return this;
};

factory.invoke = function(value, key) {
  return this[key].call(this, value);
};

module.exports = factory;
