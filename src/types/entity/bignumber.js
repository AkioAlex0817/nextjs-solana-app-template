var G = Object.create
var p = Object.defineProperty
var L = Object.getOwnPropertyDescriptor
var k = Object.getOwnPropertyNames
var v = Object.getPrototypeOf,
  W = Object.prototype.hasOwnProperty
var j = (e, r) => {
    for (var t in r) p(e, t, { get: r[t], enumerable: !0 })
  },
  A = (e, r, t, n) => {
    if ((r && typeof r == 'object') || typeof r == 'function')
      for (let o of k(r))
        !W.call(e, o) && o !== t && p(e, o, { get: () => r[o], enumerable: !(n = L(r, o)) || n.enumerable })
    return e
  }
var R = (e, r, t) => (
    (t = e != null ? G(v(e)) : {}), A(r || !e || !e.__esModule ? p(t, 'default', { value: e, enumerable: !0 }) : t, e)
  ),
  $ = (e) => A(p({}, '__esModule', { value: !0 }), e)
var H = {}
j(H, { divCeil: () => Y, parseBigNumberish: () => C, tenExponentiate: () => q })
module.exports = $(H)
var l = R(require('bn.js'))
var V = require('@solana/web3.js')
var h = require('@solana/web3.js')
var U = require('@solana/web3.js')
var b = '1.1.0-beta.0'
var tr = require('@colors/colors'),
  w = !1,
  O = !1,
  g = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 },
  x = {},
  d
function J() {
  try {
    let e = []
    if (
      (['NFD', 'NFC', 'NFKD', 'NFKC'].forEach((r) => {
        try {
          if ('test'.normalize(r) !== 'test') throw new Error('bad normalize')
        } catch {
          e.push(r)
        }
      }),
      e.length)
    )
      throw new Error('missing ' + e.join(', '))
    if (String.fromCharCode(233).normalize('NFD') !== String.fromCharCode(101, 769))
      throw new Error('broken implementation')
  } catch (e) {
    if (e instanceof Error) return e.message
  }
  return ''
}
var I = J(),
  S = ((u) => (
    (u.DEBUG = 'DEBUG'), (u.INFO = 'INFO'), (u.WARNING = 'WARNING'), (u.ERROR = 'ERROR'), (u.OFF = 'OFF'), u
  ))(S || {}),
  _ = ((s) => (
    (s.UNKNOWN_ERROR = 'UNKNOWN_ERROR'),
    (s.NOT_IMPLEMENTED = 'NOT_IMPLEMENTED'),
    (s.UNSUPPORTED_OPERATION = 'UNSUPPORTED_OPERATION'),
    (s.NETWORK_ERROR = 'NETWORK_ERROR'),
    (s.RPC_ERROR = 'RPC_ERROR'),
    (s.TIMEOUT = 'TIMEOUT'),
    (s.BUFFER_OVERRUN = 'BUFFER_OVERRUN'),
    (s.NUMERIC_FAULT = 'NUMERIC_FAULT'),
    (s.MISSING_NEW = 'MISSING_NEW'),
    (s.INVALID_ARGUMENT = 'INVALID_ARGUMENT'),
    (s.MISSING_ARGUMENT = 'MISSING_ARGUMENT'),
    (s.UNEXPECTED_ARGUMENT = 'UNEXPECTED_ARGUMENT'),
    (s.INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS'),
    s
  ))(_ || {}),
  P = '0123456789abcdef'
function M(e, r = !1) {
  let t = e
  try {
    if (e instanceof Uint8Array) {
      let n = ''
      for (let o = 0; o < e.length; o++) (n += P[e[o] >> 4]), (n += P[e[o] & 15])
      t = `Uint8Array(0x${n})`
    } else if (e instanceof U.PublicKey) t = `PublicKey(${e.toBase58()})`
    else if (e instanceof Object && !r) {
      let n = {}
      Object.entries(e).forEach(([o, u]) => {
        n[o] = M(u, !0)
      }),
        (t = JSON.stringify(n))
    } else r || (t = JSON.stringify(e))
  } catch {
    t = JSON.stringify(e.toString())
  }
  return t
}
var i = class {
    constructor(r) {
      this.version = b
      this.moduleName = r
    }
    _log(r, t) {
      let n = r.toLowerCase()
      g[n] == null && this.throwArgumentError('invalid log level name', 'logLevel', r),
        !((x[this.moduleName] || g.default) > g[n]) && console.log(...t)
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
    makeError(r, t, n) {
      if (O) return this.makeError('censored error', t, {})
      t || (t = i.errors.UNKNOWN_ERROR), n || (n = {})
      let o = []
      Object.entries(n).forEach(([E, N]) => {
        o.push(`${E}=${M(N)})`)
      }),
        o.push(`code=${t}`),
        o.push(`module=${this.moduleName}`),
        o.push(`version=${this.version}`)
      let u = r
      o.length && (r += ' (' + o.join(', ') + ')')
      let m = new Error(r)
      return (
        (m.reason = u),
        (m.code = t),
        Object.entries(n).forEach(([E, N]) => {
          m[E] = N
        }),
        m
      )
    }
    throwError(r, t, n) {
      throw this.makeError(r, t, n)
    }
    throwArgumentError(r, t, n) {
      return this.throwError(r, i.errors.INVALID_ARGUMENT, { argument: t, value: n })
    }
    assert(r, t, n, o) {
      r || this.throwError(t, n, o)
    }
    assertArgument(r, t, n, o) {
      r || this.throwArgumentError(t, n, o)
    }
    checkNormalize(r) {
      r == null && (r = 'platform missing String.prototype.normalize'),
        I &&
          this.throwError('platform missing String.prototype.normalize', i.errors.UNSUPPORTED_OPERATION, {
            operation: 'String.prototype.normalize',
            form: I
          })
    }
    checkSafeUint53(r, t) {
      typeof r == 'number' &&
        (t == null && (t = 'value not safe'),
        (r < 0 || r >= 9007199254740991) &&
          this.throwError(t, i.errors.NUMERIC_FAULT, {
            operation: 'checkSafeInteger',
            fault: 'out-of-safe-range',
            value: r
          }),
        r % 1 &&
          this.throwError(t, i.errors.NUMERIC_FAULT, { operation: 'checkSafeInteger', fault: 'non-integer', value: r }))
    }
    checkArgumentCount(r, t, n) {
      n ? (n = ': ' + n) : (n = ''),
        r < t && this.throwError('missing argument' + n, i.errors.MISSING_ARGUMENT, { count: r, expectedCount: t }),
        r > t && this.throwError('too many arguments' + n, i.errors.UNEXPECTED_ARGUMENT, { count: r, expectedCount: t })
    }
    checkNew(r, t) {
      ;(r === Object || r == null) && this.throwError('missing new', i.errors.MISSING_NEW, { name: t.name })
    }
    checkAbstract(r, t) {
      r === t
        ? this.throwError(
            'cannot instantiate abstract class ' + JSON.stringify(t.name) + ' directly; use a sub-class',
            i.errors.UNSUPPORTED_OPERATION,
            { name: r.name, operation: 'new' }
          )
        : (r === Object || r == null) && this.throwError('missing new', i.errors.MISSING_NEW, { name: t.name })
    }
    static globalLogger() {
      return d || (d = new i(b)), d
    }
    static setCensorship(r, t) {
      if (
        (!r &&
          t &&
          this.globalLogger().throwError('cannot permanently disable censorship', i.errors.UNSUPPORTED_OPERATION, {
            operation: 'setCensorship'
          }),
        w)
      ) {
        if (!r) return
        this.globalLogger().throwError('error censorship permanent', i.errors.UNSUPPORTED_OPERATION, {
          operation: 'setCensorship'
        })
      }
      ;(O = !!r), (w = !!t)
    }
    static setLogLevel(r, t) {
      let n = g[t.toLowerCase()]
      if (n == null) {
        i.globalLogger().warn('invalid log level - ' + t)
        return
      }
      x[r] = n
    }
    static from(r) {
      return new i(r)
    }
  },
  a = i
;(a.errors = _), (a.levels = S)
var B = require('@solana/spl-token'),
  D = require('@solana/web3.js'),
  or = a.from('common/pubkey'),
  ir = h.SystemProgram.programId,
  sr = new h.PublicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo')
var z = require('@solana/web3.js'),
  X = R(require('bn.js'))
var T = require('@solana/web3.js')
var wr = a.from('common/web3')
var f = R(require('bn.js'))
var Fr = new f.default(0),
  Kr = new f.default(1),
  Cr = new f.default(2),
  Gr = new f.default(3),
  Lr = new f.default(5),
  F = new f.default(10),
  kr = new f.default(100),
  vr = new f.default(1e3),
  Wr = new f.default(1e4)
var y = a.from('entity/bignumber'),
  K = 9007199254740991
function C(e) {
  return e instanceof l.default
    ? e
    : typeof e == 'string'
    ? e.match(/^-?[0-9]+$/)
      ? new l.default(e)
      : y.throwArgumentError('invalid BigNumberish string', 'value', e)
    : typeof e == 'number'
    ? e % 1
      ? y.throwArgumentError('BigNumberish number underflow', 'value', e)
      : e >= K || e <= -K
      ? y.throwArgumentError('BigNumberish number overflow', 'value', e)
      : new l.default(String(e))
    : typeof e == 'bigint'
    ? new l.default(e.toString())
    : y.throwArgumentError('invalid BigNumberish value', 'value', e)
}
function q(e) {
  return F.pow(C(e))
}
function Y(e, r) {
  let t = e.divmod(r)
  return t.mod.isZero() ? t.div : t.div.negative !== 0 ? t.div.isubn(1) : t.div.iaddn(1)
}
0 && (module.exports = { divCeil, parseBigNumberish, tenExponentiate })
//# sourceMappingURL=bignumber.js.map
