var n = Object.create
var c = Object.defineProperty
var N = Object.getOwnPropertyDescriptor
var O = Object.getOwnPropertyNames
var _ = Object.getPrototypeOf,
  E = Object.prototype.hasOwnProperty
var U = (e, t) => {
    for (var p in t) c(e, p, { get: t[p], enumerable: !0 })
  },
  s = (e, t, p, r) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let x of O(t))
        !E.call(e, x) && x !== p && c(e, x, { get: () => t[x], enumerable: !(r = N(t, x)) || r.enumerable })
    return e
  }
var D = (e, t, p) => (
    (p = e != null ? n(_(e)) : {}), s(t || !e || !e.__esModule ? c(p, 'default', { value: e, enumerable: !0 }) : p, e)
  ),
  m = (e) => s(c({}, '__esModule', { value: !0 }), e)
var L = {}
U(L, {
  FIVE: () => W,
  ONE: () => F,
  Rounding: () => w,
  TEN: () => f,
  THREE: () => P,
  TWO: () => H,
  ZERO: () => T,
  _100: () => A,
  _1000: () => B,
  _10000: () => I
})
module.exports = m(L)
var o = D(require('bn.js')),
  w = ((r) => (
    (r[(r.ROUND_DOWN = 0)] = 'ROUND_DOWN'),
    (r[(r.ROUND_HALF_UP = 1)] = 'ROUND_HALF_UP'),
    (r[(r.ROUND_UP = 2)] = 'ROUND_UP'),
    r
  ))(w || {}),
  T = new o.default(0),
  F = new o.default(1),
  H = new o.default(2),
  P = new o.default(3),
  W = new o.default(5),
  f = new o.default(10),
  A = new o.default(100),
  B = new o.default(1e3),
  I = new o.default(1e4)
0 && (module.exports = { FIVE, ONE, Rounding, TEN, THREE, TWO, ZERO, _100, _1000, _10000 })
//# sourceMappingURL=constant.js.map
