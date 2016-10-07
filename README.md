Fetch headers polyfill
======================

https://developer.mozilla.org/en-US/docs/Web/API/Headers

Packed with latest and newest method from the spec:
iterator, entries, keys, values, and support of for...of

```javascript
const Headers = require('fetch-headers')

header = new Headers([
  ['accept', 'application/json']
  ['accept', 'text/plain']
])
```

Notes
-----
This use
 - [WeakMap][1] for private properties
 - [Symbol.iterator][2] for iteration
 - vanilla ecmascript 6
 - no transpiler
 - no damm coffeescript or typescript


 - Up to date node version can just use this as is
 - Browsers should run this through closer-compiler, babel, Babili, browserify, webpack or equivalent
 - Browsers need to include a polyfill for WeakMap if necessary

  [1]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
  [2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator