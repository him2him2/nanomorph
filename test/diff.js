var tape = require('tape')
var html = require('bel')
var nanomorph = require('../')

module.exports = abstractMorph

function abstractMorph (morph) {
  tape('abstract morph', function (t) {
    t.test('root level', function (t) {
      t.test('should replace a node', function (t) {
        t.plan(1)
        var a = html`<p>hello world</p>`
        var b = html`<div>hello world</div>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })

      t.test('should morph a node', function (t) {
        t.plan(1)
        var a = html`<p>hello world</p>`
        var b = html`<p>hello you</p>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })

      t.test('should morph a node with namespaced attribute', function (t) {
        t.plan(1)
        var a = html`<svg><use xlink:href="#heybooboo"></use></svg>`
        var b = html`<svg><use xlink:href="#boobear"></use></svg>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })

      t.test('should ignore if node is same', function (t) {
        t.plan(1)
        var a = html`<p>hello world</p>`
        var expected = a.outerHTML
        var res = morph(a, a)
        t.equal(res.outerHTML, expected, 'result was expected')
      })
    })

    t.test('nested', function (t) {
      t.test('should replace a node', function (t) {
        t.plan(1)
        var a = html`<main><p>hello world</p></main>`
        var b = html`<main><div>hello world</div></main>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })

      t.test('should replace a node', function (t) {
        t.plan(1)
        var a = html`<main><p>hello world</p></main>`
        var b = html`<main><p>hello you</p></main>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })

      t.test('should replace a node', function (t) {
        t.plan(1)
        var a = html`<main><p>hello world</p></main>`
        var res = morph(a, a)
        var expected = a.outerHTML
        t.equal(res.outerHTML, expected, 'result was expected')
      })

      t.test('should append a node', function (t) {
        t.plan(1)
        var a = html`<main></main>`
        var b = html`<main><p>hello you</p></main>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })

      t.test('should remove a node', function (t) {
        t.plan(1)
        var a = html`<main><p>hello you</p></main>`
        var b = html`<main></main>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })
    })

    function raiseEvent (element, eventName) {
      var event = document.createEvent('Event')
      event.initEvent(eventName, true, true)
      element.dispatchEvent(event)
    }

    t.test('events', function (t) {
      t.test('should have onabort events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onabort=${pass}></input>`

        raiseEvent(res, 'abort')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onabort events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onabort=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'abort')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onabort events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onabort=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'abort')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onblur events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onblur=${pass}></input>`

        raiseEvent(res, 'blur')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onblur events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onblur=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'blur')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onblur events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onblur=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'blur')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onchange events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onchange=${pass}></input>`

        raiseEvent(res, 'change')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onchange events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onchange=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'change')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onchange events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onchange=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'change')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onclick events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onclick=${pass}></input>`

        raiseEvent(res, 'click')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onclick events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onclick=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'click')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onclick events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onclick=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'click')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have oncontextmenu events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input oncontextmenu=${pass}></input>`

        raiseEvent(res, 'contextmenu')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy oncontextmenu events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input oncontextmenu=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'contextmenu')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy oncontextmenu events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input oncontextmenu=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'contextmenu')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have ondblclick events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input ondblclick=${pass}></input>`

        raiseEvent(res, 'dblclick')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy ondblclick events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input ondblclick=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'dblclick')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy ondblclick events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input ondblclick=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'dblclick')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have ondrag events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input ondrag=${pass}></input>`

        raiseEvent(res, 'drag')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy ondrag events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input ondrag=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'drag')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy ondrag events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input ondrag=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'drag')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have ondragend events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input ondragend=${pass}></input>`

        raiseEvent(res, 'dragend')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy ondragend events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input ondragend=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'dragend')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy ondragend events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input ondragend=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'dragend')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have ondragenter events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input ondragenter=${pass}></input>`

        raiseEvent(res, 'dragenter')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy ondragenter events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input ondragenter=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'dragenter')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy ondragenter events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input ondragenter=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'dragenter')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have ondragleave events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input ondragleave=${pass}></input>`

        raiseEvent(res, 'dragleave')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy ondragleave events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input ondragleave=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'dragleave')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy ondragleave events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input ondragleave=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'dragleave')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have ondragover events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input ondragover=${pass}></input>`

        raiseEvent(res, 'dragover')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy ondragover events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input ondragover=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'dragover')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy ondragover events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input ondragover=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'dragover')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have ondragstart events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input ondragstart=${pass}></input>`

        raiseEvent(res, 'dragstart')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy ondragstart events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input ondragstart=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'dragstart')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy ondragstart events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input ondragstart=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'dragstart')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have ondrop events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input ondrop=${pass}></input>`

        raiseEvent(res, 'drop')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy ondrop events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input ondrop=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'drop')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy ondrop events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input ondrop=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'drop')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onerror events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onerror=${pass}></input>`

        raiseEvent(res, 'error')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onerror events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onerror=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'error')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onerror events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onerror=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'error')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onfocus events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onfocus=${pass}></input>`

        raiseEvent(res, 'focus')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onfocus events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onfocus=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'focus')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onfocus events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onfocus=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'focus')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onfocusin events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onfocusin=${pass}></input>`

        raiseEvent(res, 'focusin')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onfocusin events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onfocusin=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'focusin')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onfocusin events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onfocusin=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'focusin')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onfocusout events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onfocusout=${pass}></input>`

        raiseEvent(res, 'focusout')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onfocusout events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onfocusout=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'focusout')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onfocusout events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onfocusout=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'focusout')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have oninput events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input oninput=${pass}></input>`

        raiseEvent(res, 'input')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy oninput events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input oninput=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'input')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy oninput events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input oninput=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'input')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onkeydown events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onkeydown=${pass}></input>`

        raiseEvent(res, 'keydown')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onkeydown events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onkeydown=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'keydown')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onkeydown events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onkeydown=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'keydown')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onkeypress events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onkeypress=${pass}></input>`

        raiseEvent(res, 'keypress')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onkeypress events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onkeypress=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'keypress')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onkeypress events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onkeypress=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'keypress')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onkeyup events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onkeyup=${pass}></input>`

        raiseEvent(res, 'keyup')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onkeyup events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onkeyup=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'keyup')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onkeyup events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onkeyup=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'keyup')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onmousedown events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onmousedown=${pass}></input>`

        raiseEvent(res, 'mousedown')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onmousedown events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onmousedown=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'mousedown')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onmousedown events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onmousedown=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'mousedown')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onmouseenter events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onmouseenter=${pass}></input>`

        raiseEvent(res, 'mouseenter')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onmouseenter events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onmouseenter=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'mouseenter')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onmouseenter events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onmouseenter=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'mouseenter')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onmouseleave events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onmouseleave=${pass}></input>`

        raiseEvent(res, 'mouseleave')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onmouseleave events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onmouseleave=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'mouseleave')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onmouseleave events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onmouseleave=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'mouseleave')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onmousemove events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onmousemove=${pass}></input>`

        raiseEvent(res, 'mousemove')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onmousemove events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onmousemove=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'mousemove')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onmousemove events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onmousemove=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'mousemove')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onmouseout events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onmouseout=${pass}></input>`

        raiseEvent(res, 'mouseout')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onmouseout events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onmouseout=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'mouseout')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onmouseout events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onmouseout=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'mouseout')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onmouseover events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onmouseover=${pass}></input>`

        raiseEvent(res, 'mouseover')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onmouseover events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onmouseover=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'mouseover')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onmouseover events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onmouseover=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'mouseover')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onmouseup events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onmouseup=${pass}></input>`

        raiseEvent(res, 'mouseup')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onmouseup events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onmouseup=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'mouseup')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onmouseup events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onmouseup=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'mouseup')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onreset events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onreset=${pass}></input>`

        raiseEvent(res, 'reset')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onreset events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onreset=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'reset')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onreset events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onreset=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'reset')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onresize events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onresize=${pass}></input>`

        raiseEvent(res, 'resize')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onresize events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onresize=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'resize')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onresize events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onresize=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'resize')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onscroll events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onscroll=${pass}></input>`

        raiseEvent(res, 'scroll')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onscroll events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onscroll=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'scroll')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onscroll events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onscroll=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'scroll')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onselect events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onselect=${pass}></input>`

        raiseEvent(res, 'select')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onselect events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onselect=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'select')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onselect events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onselect=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'select')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onsubmit events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input onsubmit=${pass}></input>`

        raiseEvent(res, 'submit')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onsubmit events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input onsubmit=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'submit')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onsubmit events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input onsubmit=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'submit')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have ontouchcancel events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input ontouchcancel=${pass}></input>`

        raiseEvent(res, 'touchcancel')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy ontouchcancel events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input ontouchcancel=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'touchcancel')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy ontouchcancel events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input ontouchcancel=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'touchcancel')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have ontouchend events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input ontouchend=${pass}></input>`

        raiseEvent(res, 'touchend')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy ontouchend events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input ontouchend=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'touchend')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy ontouchend events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input ontouchend=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'touchend')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have ontouchmove events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input ontouchmove=${pass}></input>`

        raiseEvent(res, 'touchmove')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy ontouchmove events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input ontouchmove=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'touchmove')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy ontouchmove events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input ontouchmove=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'touchmove')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have ontouchstart events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<input ontouchstart=${pass}></input>`

        raiseEvent(res, 'touchstart')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy ontouchstart events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<input ontouchstart=${fail}></input>`
        var b = html`<input></input>`
        var res = morph(a, b)

        raiseEvent(res, 'touchstart')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy ontouchstart events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<input></input>`
        var b = html`<input ontouchstart=${pass}></input>`
        var res = morph(a, b)

        raiseEvent(res, 'touchstart')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should have onunload events(html attribute) ', function (t) {
        t.plan(1)
        var expectationMet = false
        var res = html`<body onunload=${pass}></body>`

        raiseEvent(res, 'unload')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should not copy onunload events', function (t) {
        t.plan(1)
        var expectationMet = true
        var a = html`<body onunload=${fail}></body>`
        var b = html`<body></body>`
        var res = morph(a, b)

        raiseEvent(res, 'unload')

        function fail (e) {
          e.preventDefault()
          expectationMet = false
        }

        t.equal(expectationMet, true, 'result was expected')
      })
      t.test('should copy onunload events(html arrtibute)', function (t) {
        t.plan(1)
        var expectationMet = false
        var a = html`<body></body>`
        var b = html`<body onunload=${pass}></body>`
        var res = morph(a, b)

        raiseEvent(res, 'unload')

        function pass (e) {
          e.preventDefault()
          expectationMet = true
        }

        t.equal(expectationMet, true, 'result was expected')
      })
    })

    t.test('values', function (t) {
      t.test('if new tree has no value and old tree does, remove value', function (t) {
        t.plan(4)
        var a = html`<input type="text" value="howdy" />`
        var b = html`<input type="text" />`
        var res = morph(a, b)
        t.equal(res.getAttribute('value'), null)
        t.equal(res.value, '')

        a = html`<input type="text" value="howdy" />`
        b = html`<input type="text" value=${null} />`
        res = morph(a, b)
        t.equal(res.getAttribute('value'), null)
        t.equal(res.value, '')
      })

      t.test('if new tree has value and old tree does too, set value from new tree', function (t) {
        t.plan(4)
        var a = html`<input type="text" value="howdy" />`
        var b = html`<input type="text" value="hi" />`
        var res = morph(a, b)
        t.equal(res.value, 'hi')

        a = html`<input type="text"/>`
        a.value = 'howdy'
        b = html`<input type="text"/>`
        b.value = 'hi'
        res = morph(a, b)
        t.equal(res.value, 'hi')

        a = html`<input type="text" value="howdy"/>`
        b = html`<input type="text"/>`
        b.value = 'hi'
        res = morph(a, b)
        t.equal(res.value, 'hi')

        a = html`<input type="text"/>`
        a.value = 'howdy'
        b = html`<input type="text" value="hi"/>`
        res = morph(a, b)
        t.equal(res.value, 'hi')
      })
    })

    t.test('isSameNode', function (t) {
      t.test('should return a if true', function (t) {
        t.plan(1)
        var a = html`<div>YOLO</div>`
        var b = html`<div>FOMO</div>`
        b.isSameNode = function (el) {
          return true
        }
        var res = morph(a, b)
        t.equal(res.childNodes[0].data, 'YOLO')
      })

      t.test('should return b if false', function (t) {
        t.plan(1)
        var a = html`<div>YOLO</div>`
        var b = html`<div>FOMO</div>`
        b.isSameNode = function (el) {
          return false
        }
        var res = morph(a, b)
        t.equal(res.childNodes[0].data, 'FOMO')
      })
    })

    t.test('lists', function (t) {
      t.test('should append nodes', function (t) {
        t.plan(1)
        var a = html`<ul></ul>`
        var b = html`<ul><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li></ul>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })

      t.test('should remove nodes', function (t) {
        t.plan(1)
        var a = html`<ul><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li></ul>`
        var b = html`<ul></ul>`
        var res = morph(a, b)
        var expected = b.outerHTML
        t.equal(res.outerHTML, expected, 'result was expected')
      })
    })

    t.test('selectables', function (t) {
      t.test('should append nodes', function (t) {
        t.plan(1)
        var a = html`<select></select>`
        var b = html`<select><option>1</option><option>2</option><option>3</option><option>4</option></select>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })

      t.test('should append nodes (including optgroups)', function (t) {
        t.plan(1)
        var a = html`<select></select>`
        var b = html`<select><optgroup><option>1</option><option>2</option></optgroup><option>3</option><option>4</option></select>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })

      t.test('should remove nodes', function (t) {
        t.plan(1)
        var a = html`<select><option>1</option><option>2</option><option>3</option><option>4</option></select>`
        var b = html`<select></select>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })

      t.test('should remove nodes (including optgroups)', function (t) {
        t.plan(1)
        var a = html`<select><optgroup><option>1</option><option>2</option></optgroup><option>3</option><option>4</option></select>`
        var b = html`<select></select>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })

      t.test('should add selected', function (t) {
        t.plan(1)
        var a = html`<select><option>1</option><option>2</option></select>`
        var b = html`<select><option>1</option><option selected>2</option></select>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })

      t.test('should add selected (xhtml)', function (t) {
        t.plan(1)
        var a = html`<select><option>1</option><option>2</option></select>`
        var b = html`<select><option>1</option><option selected="selected">2</option></select>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })

      t.test('should switch selected', function (t) {
        t.plan(1)
        var a = html`<select><option selected="selected">1</option><option>2</option></select>`
        var b = html`<select><option>1</option><option selected="selected">2</option></select>`
        var expected = b.outerHTML
        var res = morph(a, b)
        t.equal(res.outerHTML, expected, 'result was expected')
      })
    })

    t.test('should replace nodes', function (t) {
      t.plan(1)
      var a = html`<ul><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li></ul>`
      var b = html`<ul><div>1</div><li>2</li><p>3</p><li>4</li><li>5</li></ul>`
      var expected = b.outerHTML
      a = morph(a, b)
      t.equal(a.outerHTML, expected, 'result was expected')
    })

    t.test('should replace nodes after multiple iterations', function (t) {
      t.plan(2)

      var a = html`<ul></ul>`
      var b = html`<ul><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li></ul>`
      var expected = b.outerHTML

      a = morph(a, b)
      t.equal(a.outerHTML, expected, 'result was expected')

      b = html`<ul><div>1</div><li>2</li><p>3</p><li>4</li><li>5</li></ul>`
      expected = b.outerHTML

      a = morph(a, b)
      t.equal(a.outerHTML, expected, 'result was expected')
    })
  })
}

tape('use id as a key hint', function (t) {
  t.test('append an element', function (t) {
    var a = html`<ul>
      <li id="a"></li>
      <li id="b"></li>
      <li id="c"></li>
    </ul>`
    var b = html`<ul>
      <li id="a"></li>
      <li id="new"></li>
      <li id="b"></li>
      <li id="c"></li>
    </ul>`
    var target = b.outerHTML

    var oldFirst = a.children[0]
    var oldSecond = a.children[1]
    var oldThird = a.children[2]

    var c = nanomorph(a, b)
    t.equal(oldFirst, c.children[0], 'first is equal')
    t.equal(oldSecond, c.children[2], 'moved second is equal')
    t.equal(oldThird, c.children[3], 'moved third is equal')
    t.equal(c.outerHTML, target)
    t.end()
  })

  t.test('handle non-id elements', function (t) {
    var a = html`<ul>
      <li></li>
      <li id="a"></li>
      <li id="b"></li>
      <li id="c"></li>
      <li></li>
    </ul>`
    var b = html`<ul>
      <li></li>
      <li id="a"></li>
      <li id="new"></li>
      <li id="b"></li>
      <li id="c"></li>
      <li></li>
    </ul>`
    var target = b.outerHTML

    var oldSecond = a.children[1]
    var oldThird = a.children[2]
    var oldForth = a.children[3]

    var c = nanomorph(a, b)
    t.equal(oldSecond, c.children[1], 'second is equal')
    t.equal(oldThird, c.children[3], 'moved third is equal')
    t.equal(oldForth, c.children[4], 'moved forth is equal')
    t.equal(c.outerHTML, target)
    t.end()
  })

  t.test('copy over children', function (t) {
    var a = html`<section>'hello'<section>`
    var b = html`<section><div></div><section>`
    var expected = b.outerHTML

    var c = nanomorph(a, b)
    t.equal(c.outerHTML, expected, expected)
    t.end()
  })

  t.test('remove an element', function (t) {
    var a = html`<ul><li id="a"></li><li id="b"></li><li id="c"></li></ul>`
    var b = html`<ul><li id="a"></li><li id="c"></li></ul>`

    var oldFirst = a.children[0]
    var oldThird = a.children[2]
    var expected = b.outerHTML

    var c = nanomorph(a, b)

    t.equal(c.children[0], oldFirst, 'first is equal')
    t.equal(c.children[1], oldThird, 'second untouched')
    t.equal(c.outerHTML, expected)
    t.end()
  })

  t.test('swap proxy elements', function (t) {
    var nodeA = html`<li id="a"></li>`
    var placeholderA = html`<div id="a" data-placeholder=true></div>`
    placeholderA.isSameNode = function (el) {
      return el === nodeA
    }

    var nodeB = html`<li id="b"></li>`
    var placeholderB = html`<div id="b" data-placeholder=true></div>`
    placeholderB.isSameNode = function (el) {
      return el === nodeB
    }

    var a = html`<ul>${nodeA}${nodeB}</ul>`
    var b = html`<ul>${placeholderB}${placeholderA}</ul>`
    var c = nanomorph(a, b)

    t.equal(c.children[0], nodeB, 'c.children[0] === nodeB')
    t.equal(c.children[1], nodeA, 'c.children[1] === nodeA')
    t.end()
  })

  t.test('id match still morphs', function (t) {
    var a = html`<li id="12">FOO</li>`
    var b = html`<li id="12">BAR</li>`
    var target = b.outerHTML
    var c = nanomorph(a, b)
    t.equal(c.outerHTML, target)
    t.end()
  })

  t.test('remove orphaned keyed nodes', function (t) {
    var a = html`
      <div>
        <div>1</div>
        <li id="a">a</li>
      </div>
    `
    var b = html`
      <div>
        <div>2</div>
        <li id="b">b</li>
      </div>
    `
    var expected = b.outerHTML
    var c = nanomorph(a, b)
    t.equal(c.outerHTML, expected)
    t.end()
  })

  t.test('whitespace', function (t) {
    var a = html`<ul>
</ul>`
    var b = html`<ul><li></li><li></li>
</ul>`
    var expected = b.outerHTML
    var c = nanomorph(a, b)
    t.equal(c.outerHTML, expected)
    t.end()
  })

  t.test('nested with id', function (t) {
    var child = html`<div id="child"></div>`
    var placeholder = html`<div id="child"></div>`
    placeholder.isSameNode = function (el) { return el === child }

    var a = html`<div><div id="parent">${child}</div></div>`
    var b = html`<div><div id="parent">${placeholder}</div></div>`

    var c = nanomorph(a, b)
    t.equal(c.children[0].children[0], child, 'is the same node')
    t.end()
  })

  t.test('nested without id', function (t) {
    var child = html`<div id="child">child</div>`
    var placeholder = html`<div id="child">placeholder</div>`
    placeholder.isSameNode = function (el) { return el === child }

    var a = html`<div><div>${child}</div></div>`
    var b = html`<div><div>${placeholder}</div></div>`

    var c = nanomorph(a, b)
    t.equal(c.children[0].children[0], child, 'is the same node')
    t.end()
  })
})
