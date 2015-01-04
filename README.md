# Scopable

> ...

## About

Please refer to the examples below.

## Usage:

### Example 1:

```javascript
var scopable = require('scopable');

var scope = scopable([1, 2, 3, 4]);

scope.push('slice', scopable.invoke);

scope.apply({ slice: 2 }); //=> [3, 4]
```

### Example 2:

```javascript
var scopable = require('scopable');

var scope = scopable({});

scope.push('query', scopable.assign);
scope.push('limit', scopable.assign);

scope.apply({ query: 'test', anything: 'invalid' }); //=> { query: 'test' }
scope.apply({ query: 'test', limit: 10 }); //=> { query: 'test', limit: 10 }
```
