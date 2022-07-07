var H = Object.create
var N = Object.defineProperty
var X = Object.getOwnPropertyDescriptor
var Y = Object.getOwnPropertyNames
var Z = Object.getPrototypeOf,
  Q = Object.prototype.hasOwnProperty
var rr = (t, r) => {
    for (var e in r) N(t, e, { get: r[e], enumerable: !0 })
  },
  P = (t, r, e, n) => {
    if ((r && typeof r == 'object') || typeof r == 'function')
      for (let o of Y(r))
        !Q.call(t, o) && o !== e && N(t, o, { get: () => r[o], enumerable: !(n = X(r, o)) || n.enumerable })
    return t
  }
var f = (t, r, e) => (
    (e = t != null ? H(Z(t)) : {}), P(r || !t || !t.__esModule ? N(e, 'default', { value: t, enumerable: !0 }) : e, t)
  ),
  er = (t) => P(N({}, '__esModule', { value: !0 }), t)
var cr = {}
rr(cr, { Percent: () => U, _100_PERCENT: () => B })
module.exports = er(cr)
var c = f(require('bn.js'))
var lr = new c.default(0),
  W = new c.default(1),
  fr = new c.default(2),
  gr = new c.default(3),
  dr = new c.default(5),
  tr = new c.default(10),
  I = new c.default(100),
  hr = new c.default(1e3),
  br = new c.default(1e4)
var J = f(require('big.js')),
  V = f(require('decimal.js-light'))
var or = require('@solana/web3.js')
var R = require('@solana/web3.js')
var v = require('@solana/web3.js')
var A = '1.1.0-beta.0'
var Er = require('@colors/colors'),
  F = !1,
  _ = !1,
  y = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 },
  M = {},
  D
function nr() {
  try {
    let t = []
    if (
      (['NFD', 'NFC', 'NFKD', 'NFKC'].forEach((r) => {
        try {
          if ('test'.normalize(r) !== 'test') throw new Error('bad normalize')
        } catch {
          t.push(r)
        }
      }),
      t.length)
    )
      throw new Error('missing ' + t.join(', '))
    if (String.fromCharCode(233).normalize('NFD') !== String.fromCharCode(101, 769))
      throw new Error('broken implementation')
  } catch (t) {
    if (t instanceof Error) return t.message
  }
  return ''
}
var C = nr(),
  K = ((p) => (
    (p.DEBUG = 'DEBUG'), (p.INFO = 'INFO'), (p.WARNING = 'WARNING'), (p.ERROR = 'ERROR'), (p.OFF = 'OFF'), p
  ))(K || {}),
  G = ((m) => (
    (m.UNKNOWN_ERROR = 'UNKNOWN_ERROR'),
    (m.NOT_IMPLEMENTED = 'NOT_IMPLEMENTED'),
    (m.UNSUPPORTED_OPERATION = 'UNSUPPORTED_OPERATION'),
    (m.NETWORK_ERROR = 'NETWORK_ERROR'),
    (m.RPC_ERROR = 'RPC_ERROR'),
    (m.TIMEOUT = 'TIMEOUT'),
    (m.BUFFER_OVERRUN = 'BUFFER_OVERRUN'),
    (m.NUMERIC_FAULT = 'NUMERIC_FAULT'),
    (m.MISSING_NEW = 'MISSING_NEW'),
    (m.INVALID_ARGUMENT = 'INVALID_ARGUMENT'),
    (m.MISSING_ARGUMENT = 'MISSING_ARGUMENT'),
    (m.UNEXPECTED_ARGUMENT = 'UNEXPECTED_ARGUMENT'),
    (m.INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS'),
    m
  ))(G || {}),
  L = '0123456789abcdef'
function k(t, r = !1) {
  let e = t
  try {
    if (t instanceof Uint8Array) {
      let n = ''
      for (let o = 0; o < t.length; o++) (n += L[t[o] >> 4]), (n += L[t[o] & 15])
      e = `Uint8Array(0x${n})`
    } else if (t instanceof v.PublicKey) e = `PublicKey(${t.toBase58()})`
    else if (t instanceof Object && !r) {
      let n = {}
      Object.entries(t).forEach(([o, p]) => {
        n[o] = k(p, !0)
      }),
        (e = JSON.stringify(n))
    } else r || (e = JSON.stringify(t))
  } catch {
    e = JSON.stringify(t.toString())
  }
  return e
}
var s = class {
    constructor(r) {
      this.version = A
      this.moduleName = r
    }
    _log(r, e) {
      let n = r.toLowerCase()
      y[n] == null && this.throwArgumentError('invalid log level name', 'logLevel', r),
        !((M[this.moduleName] || y.default) > y[n]) && console.log(...e)
    }
    debug(...r) {
      this._log(s.levels.DEBUG, ['[DEBUG]'.blue, ...r])
    }
    info(...r) {
      this._log(s.levels.INFO, ['[INFO]'.green, ...r])
    }
    warn(...r) {
      this._log(s.levels.WARNING, ['[WARN]'.yellow, ...r])
    }
    makeError(r, e, n) {
      if (_) return this.makeError('censored error', e, {})
      e || (e = s.errors.UNKNOWN_ERROR), n || (n = {})
      let o = []
      Object.entries(n).forEach(([w, O]) => {
        o.push(`${w}=${k(O)})`)
      }),
        o.push(`code=${e}`),
        o.push(`module=${this.moduleName}`),
        o.push(`version=${this.version}`)
      let p = r
      o.length && (r += ' (' + o.join(', ') + ')')
      let b = new Error(r)
      return (
        (b.reason = p),
        (b.code = e),
        Object.entries(n).forEach(([w, O]) => {
          b[w] = O
        }),
        b
      )
    }
    throwError(r, e, n) {
      throw this.makeError(r, e, n)
    }
    throwArgumentError(r, e, n) {
      return this.throwError(r, s.errors.INVALID_ARGUMENT, { argument: e, value: n })
    }
    assert(r, e, n, o) {
      r || this.throwError(e, n, o)
    }
    assertArgument(r, e, n, o) {
      r || this.throwArgumentError(e, n, o)
    }
    checkNormalize(r) {
      r == null && (r = 'platform missing String.prototype.normalize'),
        C &&
          this.throwError('platform missing String.prototype.normalize', s.errors.UNSUPPORTED_OPERATION, {
            operation: 'String.prototype.normalize',
            form: C
          })
    }
    checkSafeUint53(r, e) {
      typeof r == 'number' &&
        (e == null && (e = 'value not safe'),
        (r < 0 || r >= 9007199254740991) &&
          this.throwError(e, s.errors.NUMERIC_FAULT, {
            operation: 'checkSafeInteger',
            fault: 'out-of-safe-range',
            value: r
          }),
        r % 1 &&
          this.throwError(e, s.errors.NUMERIC_FAULT, { operation: 'checkSafeInteger', fault: 'non-integer', value: r }))
    }
    checkArgumentCount(r, e, n) {
      n ? (n = ': ' + n) : (n = ''),
        r < e && this.throwError('missing argument' + n, s.errors.MISSING_ARGUMENT, { count: r, expectedCount: e }),
        r > e && this.throwError('too many arguments' + n, s.errors.UNEXPECTED_ARGUMENT, { count: r, expectedCount: e })
    }
    checkNew(r, e) {
      ;(r === Object || r == null) && this.throwError('missing new', s.errors.MISSING_NEW, { name: e.name })
    }
    checkAbstract(r, e) {
      r === e
        ? this.throwError(
            'cannot instantiate abstract class ' + JSON.stringify(e.name) + ' directly; use a sub-class',
            s.errors.UNSUPPORTED_OPERATION,
            { name: r.name, operation: 'new' }
          )
        : (r === Object || r == null) && this.throwError('missing new', s.errors.MISSING_NEW, { name: e.name })
    }
    static globalLogger() {
      return D || (D = new s(A)), D
    }
    static setCensorship(r, e) {
      if (
        (!r &&
          e &&
          this.globalLogger().throwError('cannot permanently disable censorship', s.errors.UNSUPPORTED_OPERATION, {
            operation: 'setCensorship'
          }),
        F)
      ) {
        if (!r) return
        this.globalLogger().throwError('error censorship permanent', s.errors.UNSUPPORTED_OPERATION, {
          operation: 'setCensorship'
        })
      }
      ;(_ = !!r), (F = !!e)
    }
    static setLogLevel(r, e) {
      let n = y[e.toLowerCase()]
      if (n == null) {
        s.globalLogger().warn('invalid log level - ' + e)
        return
      }
      M[r] = n
    }
    static from(r) {
      return new s(r)
    }
  },
  u = s
;(u.errors = G), (u.levels = K)
var j = require('@solana/spl-token'),
  $ = require('@solana/web3.js'),
  Or = u.from('common/pubkey'),
  Ar = R.SystemProgram.programId,
  Dr = new R.PublicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo')
var ir = require('@solana/web3.js'),
  sr = f(require('bn.js'))
var S = require('@solana/web3.js')
var $r = u.from('common/web3')
var d = f(require('bn.js'))
var E = u.from('entity/bignumber'),
  q = 9007199254740991
function l(t) {
  return t instanceof d.default
    ? t
    : typeof t == 'string'
    ? t.match(/^-?[0-9]+$/)
      ? new d.default(t)
      : E.throwArgumentError('invalid BigNumberish string', 'value', t)
    : typeof t == 'number'
    ? t % 1
      ? E.throwArgumentError('BigNumberish number underflow', 'value', t)
      : t >= q || t <= -q
      ? E.throwArgumentError('BigNumberish number overflow', 'value', t)
      : new d.default(String(t))
    : typeof t == 'bigint'
    ? new d.default(t.toString())
    : E.throwArgumentError('invalid BigNumberish value', 'value', t)
}
var z = f(require('toformat')),
  ar = z.default,
  x = ar
var T = u.from('entity/fraction'),
  g = x(J.default),
  h = x(V.default),
  mr = { [0]: h.ROUND_DOWN, [1]: h.ROUND_HALF_UP, [2]: h.ROUND_UP },
  ur = { [0]: g.roundDown, [1]: g.roundHalfUp, [2]: g.roundUp },
  i = class {
    constructor(r, e = W) {
      ;(this.numerator = l(r)), (this.denominator = l(e))
    }
    get quotient() {
      return this.numerator.div(this.denominator)
    }
    invert() {
      return new i(this.denominator, this.numerator)
    }
    add(r) {
      let e = r instanceof i ? r : new i(l(r))
      return this.denominator.eq(e.denominator)
        ? new i(this.numerator.add(e.numerator), this.denominator)
        : new i(
            this.numerator.mul(e.denominator).add(e.numerator.mul(this.denominator)),
            this.denominator.mul(e.denominator)
          )
    }
    sub(r) {
      let e = r instanceof i ? r : new i(l(r))
      return this.denominator.eq(e.denominator)
        ? new i(this.numerator.sub(e.numerator), this.denominator)
        : new i(
            this.numerator.mul(e.denominator).sub(e.numerator.mul(this.denominator)),
            this.denominator.mul(e.denominator)
          )
    }
    mul(r) {
      let e = r instanceof i ? r : new i(l(r))
      return new i(this.numerator.mul(e.numerator), this.denominator.mul(e.denominator))
    }
    div(r) {
      let e = r instanceof i ? r : new i(l(r))
      return new i(this.numerator.mul(e.denominator), this.denominator.mul(e.numerator))
    }
    toSignificant(r, e = { groupSeparator: '' }, n = 1) {
      T.assert(Number.isInteger(r), `${r} is not an integer.`),
        T.assert(r > 0, `${r} is not positive.`),
        h.set({ precision: r + 1, rounding: mr[n] })
      let o = new h(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(r)
      return o.toFormat(o.decimalPlaces(), e)
    }
    toFixed(r, e = { groupSeparator: '' }, n = 1) {
      return (
        T.assert(Number.isInteger(r), `${r} is not an integer.`),
        T.assert(r >= 0, `${r} is negative.`),
        (g.DP = r),
        (g.RM = ur[n]),
        new g(this.numerator.toString()).div(this.denominator.toString()).toFormat(r, e)
      )
    }
  }
var B = new i(I),
  U = class extends i {
    toSignificant(r = 5, e, n) {
      return this.mul(B).toSignificant(r, e, n)
    }
    toFixed(r = 2, e, n) {
      return this.mul(B).toFixed(r, e, n)
    }
  }
0 && (module.exports = { Percent, _100_PERCENT })
//# sourceMappingURL=percent.js.map
