Fetch headers polyfill
======================

https://developer.mozilla.org/en-US/docs/Web/API/Headers

Packed with latest and newest method from the spec:
iterator, entries, keys, values, and support of for...of

```javascript
const Headers = require('fetch-headers')

header = new Headers([
  ['accept', 'application/json'],
  ['accept', 'text/plain']
])
```

Notes
-----
This implementation uses
 - [WeakMap][1] for private properties
 - [Symbol.iterator][2] and Generators* for iteration
 - vanilla ecmascript 6
 - no transpiler
 - no coffeescript or typescript

This polyfill does not include an implementation for the `Headers.prototype.forEach` method that several browsers implement as it is not defined in [the spec](https://fetch.spec.whatwg.org/). Because the forEach method is not specifically defined it is recommended to use an iterator instead (e.g. [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loop). If this code is outside of your control, you may wish to look at the [whatwg-fetch](https://github.com/github/fetch) or [node-fetch](https://github.com/bitinn/node-fetch)
polyfill instead.

Up to date node version can just use this as is. (tested in v6.5.0)<br>
Browsers should run this through closer-compiler, babel, Babili, browserify, webpack or equivalent.<br>
Browsers need to include a polyfill for WeakMap and Object.keys if necessary.<br>

Optional for those who want es5 version and don't have the time or effort to compile can use the prebuilt version
```javascript
var Headers = require('fetch-headers/headers-es5.min.js')
```
(It has been transpiled with closure compiler)

  [1]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
  [2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
