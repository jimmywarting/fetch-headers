/**
 * @fileoverview Tests for some misc stuff not covered by the WPT test suite.
 * needed for full test coverage.
 */

import { Headers, bag } from '../headers.js'

for (const method of Object.keys(Headers.prototype)) {
  test(() => {
    assert_throws_js(TypeError, function () {
      const fn = new Headers()[method]
      fn()
    })
  }, 'illigal invokation of Headers.prototype.' + method)
}

test(() => {
  const name = new Headers({
    'Content-Type': '\u000A\u000Atext/plain\u000A\u000A'
  })

  assert_equals(name.get('Content-Type'), 'text/plain')
}, 'it trims leading and trailing whitespace')

test(() => {
  const name = new Headers({
    'Content-Type': '\u000Atext/plain\u000A'
  }).toString()

  assert_equals(name, '[object Headers]')
}, 'new Headers().toString() has to be "[object Headers]"')

test(() => {
  const headers = new Headers()
  bag.get(headers).guard = 'immutable'
  assert_throws_js(TypeError, () => headers.append('foo', 'bar'))
}, 'it throws when guard is immutable')

test(() => {
  const headers = new Headers([
    ['a', 'baz'],
    ['a', 'baz'],
    ['a', 'bar']
  ])
  bag.get(headers).guard = 'immutable'
  assert_throws_js(TypeError, () => headers.append('foo', 'bar'))
}, 'it throws when guard is immutable')

test(() => {
  const headers = new Headers([
    ['a', 'baz'],
    ['a', 'baz'],
    ['a', 'bar']
  ])
  bag.get(headers).guard = 'immutable'
  assert_throws_js(TypeError, () => headers.append('foo', 'bar'))
}, 'it throws when guard is immutable')

const headers = new Headers()
headers[Symbol.for('nodejs.util.inspect.custom')]()
