var z = Object.create
var b = Object.defineProperty
var J = Object.getOwnPropertyDescriptor
var V = Object.getOwnPropertyNames
var H = Object.getPrototypeOf,
  X = Object.prototype.hasOwnProperty
var Y = (t, r) => {
    for (var e in r) b(t, e, { get: r[e], enumerable: !0 })
  },
  U = (t, r, e, n) => {
    if ((r && typeof r == 'object') || typeof r == 'function')
      for (let o of V(r))
        !X.call(t, o) && o !== e && b(t, o, { get: () => r[o], enumerable: !(n = J(r, o)) || n.enumerable })
    return t
  }
var f = (t, r, e) => (
    (e = t != null ? z(H(t)) : {}), U(r || !t || !t.__esModule ? b(e, 'default', { value: t, enumerable: !0 }) : e, t)
  ),
  Z = (t) => U(b({}, '__esModule', { value: !0 }), t)
var ar = {}
Y(ar, { Fraction: () => s })
module.exports = Z(ar)
var j = f(require('big.js')),
  q = f(require('decimal.js-light'))
var rr = require('@solana/web3.js')
var R = require('@solana/web3.js')
var _ = require('@solana/web3.js')
var A = '1.1.0-beta.0'
var pr = require('@colors/colors'),
  x = !1,
  P = !1,
  y = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 },
  W = {},
  D
function Q() {
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
var I = Q(),
  M = ((p) => (
    (p.DEBUG = 'DEBUG'), (p.INFO = 'INFO'), (p.WARNING = 'WARNING'), (p.ERROR = 'ERROR'), (p.OFF = 'OFF'), p
  ))(M || {}),
  C = ((a) => (
    (a.UNKNOWN_ERROR = 'UNKNOWN_ERROR'),
    (a.NOT_IMPLEMENTED = 'NOT_IMPLEMENTED'),
    (a.UNSUPPORTED_OPERATION = 'UNSUPPORTED_OPERATION'),
    (a.NETWORK_ERROR = 'NETWORK_ERROR'),
    (a.RPC_ERROR = 'RPC_ERROR'),
    (a.TIMEOUT = 'TIMEOUT'),
    (a.BUFFER_OVERRUN = 'BUFFER_OVERRUN'),
    (a.NUMERIC_FAULT = 'NUMERIC_FAULT'),
    (a.MISSING_NEW = 'MISSING_NEW'),
    (a.INVALID_ARGUMENT = 'INVALID_ARGUMENT'),
    (a.MISSING_ARGUMENT = 'MISSING_ARGUMENT'),
    (a.UNEXPECTED_ARGUMENT = 'UNEXPECTED_ARGUMENT'),
    (a.INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS'),
    a
  ))(C || {}),
  F = '0123456789abcdef'
function L(t, r = !1) {
  let e = t
  try {
    if (t instanceof Uint8Array) {
      let n = ''
      for (let o = 0; o < t.length; o++) (n += F[t[o] >> 4]), (n += F[t[o] & 15])
      e = `Uint8Array(0x${n})`
    } else if (t instanceof _.PublicKey) e = `PublicKey(${t.toBase58()})`
    else if (t instanceof Object && !r) {
      let n = {}
      Object.entries(t).forEach(([o, p]) => {
        n[o] = L(p, !0)
      }),
        (e = JSON.stringify(n))
    } else r || (e = JSON.stringify(t))
  } catch {
    e = JSON.stringify(t.toString())
  }
  return e
}
var i = class {
    constructor(r) {
      this.version = A
      this.moduleName = r
    }
    _log(r, e) {
      let n = r.toLowerCase()
      y[n] == null && this.throwArgumentError('invalid log level name', 'logLevel', r),
        !((W[this.moduleName] || y.default) > y[n]) && console.log(...e)
    }
    debug(...r) {
      this._log(i.levels.DEBUG, ['[DEBUG]'.blue, ...r])
    }
    info(...r) {
      this._log(i.levels.INFO, ['[INFO]'.green, ...r])
    }
    warn(...r) {
      this._log(i.levels.WARNING, ['[WARN]'.yellow, ...r])
    }
    makeError(r, e, n) {
      if (P) return this.makeError('censored error', e, {})
      e || (e = i.errors.UNKNOWN_ERROR), n || (n = {})
      let o = []
      Object.entries(n).forEach(([w, O]) => {
        o.push(`${w}=${L(O)})`)
      }),
        o.push(`code=${e}`),
        o.push(`module=${this.moduleName}`),
        o.push(`version=${this.version}`)
      let p = r
      o.length && (r += ' (' + o.join(', ') + ')')
      let N = new Error(r)
      return (
        (N.reason = p),
        (N.code = e),
        Object.entries(n).forEach(([w, O]) => {
          N[w] = O
        }),
        N
      )
    }
    throwError(r, e, n) {
      throw this.makeError(r, e, n)
    }
    throwArgumentError(r, e, n) {
      return this.throwError(r, i.errors.INVALID_ARGUMENT, { argument: e, value: n })
    }
    assert(r, e, n, o) {
      r || this.throwError(e, n, o)
    }
    assertArgument(r, e, n, o) {
      r || this.throwArgumentError(e, n, o)
    }
    checkNormalize(r) {
      r == null && (r = 'platform missing String.prototype.normalize'),
        I &&
          this.throwError('platform missing String.prototype.normalize', i.errors.UNSUPPORTED_OPERATION, {
            operation: 'String.prototype.normalize',
            form: I
          })
    }
    checkSafeUint53(r, e) {
      typeof r == 'number' &&
        (e == null && (e = 'value not safe'),
        (r < 0 || r >= 9007199254740991) &&
          this.throwError(e, i.errors.NUMERIC_FAULT, {
            operation: 'checkSafeInteger',
            fault: 'out-of-safe-range',
            value: r
          }),
        r % 1 &&
          this.throwError(e, i.errors.NUMERIC_FAULT, { operation: 'checkSafeInteger', fault: 'non-integer', value: r }))
    }
    checkArgumentCount(r, e, n) {
      n ? (n = ': ' + n) : (n = ''),
        r < e && this.throwError('missing argument' + n, i.errors.MISSING_ARGUMENT, { count: r, expectedCount: e }),
        r > e && this.throwError('too many arguments' + n, i.errors.UNEXPECTED_ARGUMENT, { count: r, expectedCount: e })
    }
    checkNew(r, e) {
      ;(r === Object || r == null) && this.throwError('missing new', i.errors.MISSING_NEW, { name: e.name })
    }
    checkAbstract(r, e) {
      r === e
        ? this.throwError(
            'cannot instantiate abstract class ' + JSON.stringify(e.name) + ' directly; use a sub-class',
            i.errors.UNSUPPORTED_OPERATION,
            { name: r.name, operation: 'new' }
          )
        : (r === Object || r == null) && this.throwError('missing new', i.errors.MISSING_NEW, { name: e.name })
    }
    static globalLogger() {
      return D || (D = new i(A)), D
    }
    static setCensorship(r, e) {
      if (
        (!r &&
          e &&
          this.globalLogger().throwError('cannot permanently disable censorship', i.errors.UNSUPPORTED_OPERATION, {
            operation: 'setCensorship'
          }),
        x)
      ) {
        if (!r) return
        this.globalLogger().throwError('error censorship permanent', i.errors.UNSUPPORTED_OPERATION, {
          operation: 'setCensorship'
        })
      }
      ;(P = !!r), (x = !!e)
    }
    static setLogLevel(r, e) {
      let n = y[e.toLowerCase()]
      if (n == null) {
        i.globalLogger().warn('invalid log level - ' + e)
        return
      }
      W[r] = n
    }
    static from(r) {
      return new i(r)
    }
  },
  u = i
;(u.errors = C), (u.levels = M)
var v = require('@solana/spl-token'),
  K = require('@solana/web3.js'),
  gr = u.from('common/pubkey'),
  dr = R.SystemProgram.programId,
  hr = new R.PublicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo')
var er = require('@solana/web3.js'),
  tr = f(require('bn.js'))
var S = require('@solana/web3.js')
var Fr = u.from('common/web3')
var d = f(require('bn.js'))
var c = f(require('bn.js'))
var qr = new c.default(0),
  G = new c.default(1),
  zr = new c.default(2),
  Jr = new c.default(3),
  Vr = new c.default(5),
  nr = new c.default(10),
  Hr = new c.default(100),
  Xr = new c.default(1e3),
  Yr = new c.default(1e4)
var E = u.from('entity/bignumber'),
  k = 9007199254740991
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
      : t >= k || t <= -k
      ? E.throwArgumentError('BigNumberish number overflow', 'value', t)
      : new d.default(String(t))
    : typeof t == 'bigint'
    ? new d.default(t.toString())
    : E.throwArgumentError('invalid BigNumberish value', 'value', t)
}
var $ = f(require('toformat')),
  or = $.default,
  B = or
var T = u.from('entity/fraction'),
  g = B(j.default),
  h = B(q.default),
  ir = { [0]: h.ROUND_DOWN, [1]: h.ROUND_HALF_UP, [2]: h.ROUND_UP },
  sr = { [0]: g.roundDown, [1]: g.roundHalfUp, [2]: g.roundUp },
  s = class {
    constructor(r, e = G) {
      ;(this.numerator = l(r)), (this.denominator = l(e))
    }
    get quotient() {
      return this.numerator.div(this.denominator)
    }
    invert() {
      return new s(this.denominator, this.numerator)
    }
    add(r) {
      let e = r instanceof s ? r : new s(l(r))
      return this.denominator.eq(e.denominator)
        ? new s(this.numerator.add(e.numerator), this.denominator)
        : new s(
            this.numerator.mul(e.denominator).add(e.numerator.mul(this.denominator)),
            this.denominator.mul(e.denominator)
          )
    }
    sub(r) {
      let e = r instanceof s ? r : new s(l(r))
      return this.denominator.eq(e.denominator)
        ? new s(this.numerator.sub(e.numerator), this.denominator)
        : new s(
            this.numerator.mul(e.denominator).sub(e.numerator.mul(this.denominator)),
            this.denominator.mul(e.denominator)
          )
    }
    mul(r) {
      let e = r instanceof s ? r : new s(l(r))
      return new s(this.numerator.mul(e.numerator), this.denominator.mul(e.denominator))
    }
    div(r) {
      let e = r instanceof s ? r : new s(l(r))
      return new s(this.numerator.mul(e.denominator), this.denominator.mul(e.numerator))
    }
    toSignificant(r, e = { groupSeparator: '' }, n = 1) {
      T.assert(Number.isInteger(r), `${r} is not an integer.`),
        T.assert(r > 0, `${r} is not positive.`),
        h.set({ precision: r + 1, rounding: ir[n] })
      let o = new h(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(r)
      return o.toFormat(o.decimalPlaces(), e)
    }
    toFixed(r, e = { groupSeparator: '' }, n = 1) {
      return (
        T.assert(Number.isInteger(r), `${r} is not an integer.`),
        T.assert(r >= 0, `${r} is negative.`),
        (g.DP = r),
        (g.RM = sr[n]),
        new g(this.numerator.toString()).div(this.denominator.toString()).toFormat(r, e)
      )
    }
  }
0 && (module.exports = { Fraction })
//# sourceMappingURL=fraction.js.map
