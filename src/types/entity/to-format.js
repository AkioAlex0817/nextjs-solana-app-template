var m = Object.create
var o = Object.defineProperty
var c = Object.getOwnPropertyDescriptor
var d = Object.getOwnPropertyNames
var u = Object.getPrototypeOf,
  g = Object.prototype.hasOwnProperty
var s = (e, r) => {
    for (var i in r) o(e, i, { get: r[i], enumerable: !0 })
  },
  p = (e, r, i, t) => {
    if ((r && typeof r == 'object') || typeof r == 'function')
      for (let a of d(r))
        !g.call(e, a) && a !== i && o(e, a, { get: () => r[a], enumerable: !(t = c(r, a)) || t.enumerable })
    return e
  }
var l = (e, r, i) => (
    (i = e != null ? m(u(e)) : {}), p(r || !e || !e.__esModule ? o(i, 'default', { value: e, enumerable: !0 }) : i, e)
  ),
  W = (e) => p(o({}, '__esModule', { value: !0 }), e)
var f = {}
s(f, { default: () => B })
module.exports = W(f)
var n = l(require('toformat')),
  D = n.default,
  B = D
0 && (module.exports = {})
//# sourceMappingURL=to-format.js.map
