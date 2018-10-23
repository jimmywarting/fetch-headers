var assert = require('assert')
var Headers = require('../headers')

describe('Headers', () => {
  it('constructor copies headers', () => {
    var original = new Headers()
    original.append('Accept', 'application/json')
    original.append('Accept', 'text/plain')
    original.append('Content-Type', 'text/html')

    var headers = new Headers(original)
    assert.equal('application/json, text/plain', headers.get('Accept'))
    assert.equal('text/html', headers.get('Content-Type'))
  })

  it('headers are case insensitive', () => {
    var headers = new Headers({'Accept': 'application/json'})
    assert.equal(headers.get('ACCEPT'), 'application/json')
    assert.equal(headers.get('Accept'), 'application/json')
    assert.equal(headers.get('accept'), 'application/json')
  })

  it('construct headers with 2D array', () => {
    var arr = [
      ['Accept', 'application/json'],
      ['Accept', 'text/plain']
    ]
    var headers = new Headers(arr)
    assert.ok(headers.has('Accept'))
    assert.equal('application/json, text/plain', headers.get('Accept'))
  })

  it('appends values to existing header name', () => {
    var headers = new Headers({'Accept': 'application/json'})
    headers.append('Accept', 'text/plain')
    assert.equal(headers.get('Accept'), 'application/json, text/plain')
  })

  it('sets header name and value', () => {
    var headers = new Headers()
    headers.set('Content-Type', 'application/json')
    assert.equal(headers.get('Content-Type'), 'application/json')
  })

  it('returns null on no header found', () => {
    var headers = new Headers()
    assert.strictEqual(headers.get('Content-Type'), null)
  })

  it('has headers that are set', () => {
    var headers = new Headers()
    headers.set('Content-Type', 'application/json')
    assert.ok(headers.has('Content-Type'))
  })

  it('deletes headers', () => {
    var headers = new Headers()
    headers.set('Content-Type', 'application/json')
    assert.ok(headers.has('Content-Type'))
    headers.delete('Content-Type')
    assert.ok(!headers.has('Content-Type'))
    assert.strictEqual(headers.get('Content-Type'), null)
  })

  it('returns value for get when header found', () => {
    var headers = new Headers({'Content-Type': 'application/json'})
    assert.equal(headers.get('Content-Type'), 'application/json')
  })

  it('returns empty list on get when no header found', () => {
    var headers = new Headers()
    assert.equal(headers.get('Content-Type'), null)
  })

  it('converts field name to string on set and get', () => {
    var headers = new Headers()
    headers.set(1, 'application/json')
    assert.equal(headers.get(1), 'application/json')
  })

  it('converts field value to string on set and get', () => {
    var headers = new Headers()
    headers.set('Content-Type', 1)
    headers.set('X-CSRF-Token', undefined)
    assert.equal(headers.get('Content-Type'), '1')
    assert.equal(headers.get('X-CSRF-Token'), 'undefined')
  })

  it('throws TypeError on invalid character in field name', () => {
    assert.throws(function() { new Headers({'<Accept>': ['application/json']}) }, TypeError)
    assert.throws(function() { new Headers({'Accept:': ['application/json']}) }, TypeError)
    assert.throws(function() {
      var headers = new Headers()
      headers.set({field: 'value'}, 'application/json')
    }, TypeError)
  })

  it('is iterable with forEach', () => {
    var headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Accept', 'text/plain')
    headers.append('Content-Type', 'text/html')

    var results = []
    headers.forEach(function(value, key, object) {
      results.push({value: value, key: key, object: object})
    })

    assert.equal(results.length, 2)
    assert.deepEqual({key: 'accept', value: 'application/json, text/plain', object: headers}, results[0])
    assert.deepEqual({key: 'content-type', value: 'text/html', object: headers}, results[1])
  })

  it('forEach accepts second thisArg argument', () => {
    var headers = new Headers({'Accept': 'application/json'})
    var thisArg = 42
    headers.forEach(function() {
      assert.equal(this, thisArg)
    }, thisArg)
  })

  it('is iterable with keys', () => {
    var headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Accept', 'text/plain')
    headers.append('Content-Type', 'text/html')

    var iterator = headers.keys()
    assert.deepEqual({done: false, value: 'accept'}, iterator.next())
    assert.deepEqual({done: false, value: 'content-type'}, iterator.next())
    assert.deepEqual({done: true, value: undefined}, iterator.next())
  })

  it('is iterable with values', () => {
    var headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Accept', 'text/plain')
    headers.append('Content-Type', 'text/html')

    var iterator = headers.values()
    assert.deepEqual({done: false, value: 'application/json, text/plain'}, iterator.next())
    assert.deepEqual({done: false, value: 'text/html'}, iterator.next())
    assert.deepEqual({done: true, value: undefined}, iterator.next())
  })

  it('is iterable with entries', () => {
    var headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Accept', 'text/plain')
    headers.append('Content-Type', 'text/html')

    var iterator = headers.entries()
    assert.deepEqual({done: false, value: ['accept', 'application/json, text/plain']}, iterator.next())
    assert.deepEqual({done: false, value: ['content-type', 'text/html']}, iterator.next())
    assert.deepEqual({done: true, value: undefined}, iterator.next())
  })

  it('has a header description', () => {
    var headers = new Headers()
    var type = Object.prototype.toString.call(headers)
    assert.equal(type, '[object Headers]')
  })
})
