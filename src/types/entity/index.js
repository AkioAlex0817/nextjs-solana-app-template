var Re = Object.create
var O = Object.defineProperty
var Te = Object.getOwnPropertyDescriptor
var fe = Object.getOwnPropertyNames,
  Q = Object.getOwnPropertySymbols,
  Ae = Object.getPrototypeOf,
  $ = Object.prototype.hasOwnProperty,
  Pe = Object.prototype.propertyIsEnumerable
var Z = (i, o, n) => (o in i ? O(i, o, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (i[o] = n)),
  R = (i, o) => {
    for (var n in o || (o = {})) $.call(o, n) && Z(i, n, o[n])
    if (Q) for (var n of Q(o)) Pe.call(o, n) && Z(i, n, o[n])
    return i
  }
var Ee = (i, o) => {
    for (var n in o) O(i, n, { get: o[n], enumerable: !0 })
  },
  ee = (i, o, n, s) => {
    if ((o && typeof o == 'object') || typeof o == 'function')
      for (let t of fe(o))
        !$.call(i, t) && t !== n && O(i, t, { get: () => o[t], enumerable: !(s = Te(o, t)) || s.enumerable })
    return i
  }
var U = (i, o, n) => (
    (n = i != null ? Re(Ae(i)) : {}),
    ee(o || !i || !i.__esModule ? O(n, 'default', { value: i, enumerable: !0 }) : n, i)
  ),
  Ne = (i) => ee(O({}, '__esModule', { value: !0 }), i)
var Ge = {}
Ee(Ge, {
  Currency: () => C,
  CurrencyAmount: () => T,
  FIVE: () => Me,
  Fraction: () => r,
  ONE: () => H,
  Percent: () => J,
  Price: () => V,
  Rounding: () => Y,
  TEN: () => I,
  THREE: () => we,
  TWO: () => ke,
  Token: () => u,
  TokenAmount: () => N,
  ZERO: () => xe,
  _100: () => G,
  _1000: () => Ye,
  _10000: () => ve,
  _100_PERCENT: () => z,
  currencyEquals: () => p,
  divCeil: () => Be,
  inspectCurrency: () => We,
  inspectToken: () => qe,
  parseBigNumberish: () => d,
  splitNumber: () => Ce,
  tenExponentiate: () => B
})
module.exports = Ne(Ge)
var Ue = U(require('big.js')),
  w = U(require('bn.js'))
var Oe = require('@solana/web3.js')
var A = require('@solana/web3.js')
var re = require('@solana/web3.js')
var q = '1.1.0-beta.0'
var Je = require('@colors/colors'),
  ne = !1,
  oe = !1,
  M = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 },
  ie = {},
  F
function Ve() {
  try {
    let i = []
    if (
      (['NFD', 'NFC', 'NFKD', 'NFKC'].forEach((o) => {
        try {
          if ('test'.normalize(o) !== 'test') throw new Error('bad normalize')
        } catch {
          i.push(o)
        }
      }),
      i.length)
    )
      throw new Error('missing ' + i.join(', '))
    if (String.fromCharCode(233).normalize('NFD') !== String.fromCharCode(101, 769))
      throw new Error('broken implementation')
  } catch (i) {
    if (i instanceof Error) return i.message
  }
  return ''
}
var se = Ve(),
  me = ((l) => (
    (l.DEBUG = 'DEBUG'), (l.INFO = 'INFO'), (l.WARNING = 'WARNING'), (l.ERROR = 'ERROR'), (l.OFF = 'OFF'), l
  ))(me || {}),
  ae = ((S) => (
    (S.UNKNOWN_ERROR = 'UNKNOWN_ERROR'),
    (S.NOT_IMPLEMENTED = 'NOT_IMPLEMENTED'),
    (S.UNSUPPORTED_OPERATION = 'UNSUPPORTED_OPERATION'),
    (S.NETWORK_ERROR = 'NETWORK_ERROR'),
    (S.RPC_ERROR = 'RPC_ERROR'),
    (S.TIMEOUT = 'TIMEOUT'),
    (S.BUFFER_OVERRUN = 'BUFFER_OVERRUN'),
    (S.NUMERIC_FAULT = 'NUMERIC_FAULT'),
    (S.MISSING_NEW = 'MISSING_NEW'),
    (S.INVALID_ARGUMENT = 'INVALID_ARGUMENT'),
    (S.MISSING_ARGUMENT = 'MISSING_ARGUMENT'),
    (S.UNEXPECTED_ARGUMENT = 'UNEXPECTED_ARGUMENT'),
    (S.INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS'),
    S
  ))(ae || {}),
  te = '0123456789abcdef'
function ce(i, o = !1) {
  let n = i
  try {
    if (i instanceof Uint8Array) {
      let s = ''
      for (let t = 0; t < i.length; t++) (s += te[i[t] >> 4]), (s += te[i[t] & 15])
      n = `Uint8Array(0x${s})`
    } else if (i instanceof re.PublicKey) n = `PublicKey(${i.toBase58()})`
    else if (i instanceof Object && !o) {
      let s = {}
      Object.entries(i).forEach(([t, l]) => {
        s[t] = ce(l, !0)
      }),
        (n = JSON.stringify(s))
    } else o || (n = JSON.stringify(i))
  } catch {
    n = JSON.stringify(i.toString())
  }
  return n
}
var a = class {
    constructor(o) {
      this.version = q
      this.moduleName = o
    }
    _log(o, n) {
      let s = o.toLowerCase()
      M[s] == null && this.throwArgumentError('invalid log level name', 'logLevel', o),
        !((ie[this.moduleName] || M.default) > M[s]) && console.log(...n)
    }
    debug(...o) {
      this._log(a.levels.DEBUG, ['[DEBUG]'.blue, ...o])
    }
    info(...o) {
      this._log(a.levels.INFO, ['[INFO]'.green, ...o])
    }
    warn(...o) {
      this._log(a.levels.WARNING, ['[WARN]'.yellow, ...o])
    }
    makeError(o, n, s) {
      if (oe) return this.makeError('censored error', n, {})
      n || (n = a.errors.UNKNOWN_ERROR), s || (s = {})
      let t = []
      Object.entries(s).forEach(([y, f]) => {
        t.push(`${y}=${ce(f)})`)
      }),
        t.push(`code=${n}`),
        t.push(`module=${this.moduleName}`),
        t.push(`version=${this.version}`)
      let l = o
      t.length && (o += ' (' + t.join(', ') + ')')
      let g = new Error(o)
      return (
        (g.reason = l),
        (g.code = n),
        Object.entries(s).forEach(([y, f]) => {
          g[y] = f
        }),
        g
      )
    }
    throwError(o, n, s) {
      throw this.makeError(o, n, s)
    }
    throwArgumentError(o, n, s) {
      return this.throwError(o, a.errors.INVALID_ARGUMENT, { argument: n, value: s })
    }
    assert(o, n, s, t) {
      o || this.throwError(n, s, t)
    }
    assertArgument(o, n, s, t) {
      o || this.throwArgumentError(n, s, t)
    }
    checkNormalize(o) {
      o == null && (o = 'platform missing String.prototype.normalize'),
        se &&
          this.throwError('platform missing String.prototype.normalize', a.errors.UNSUPPORTED_OPERATION, {
            operation: 'String.prototype.normalize',
            form: se
          })
    }
    checkSafeUint53(o, n) {
      typeof o == 'number' &&
        (n == null && (n = 'value not safe'),
        (o < 0 || o >= 9007199254740991) &&
          this.throwError(n, a.errors.NUMERIC_FAULT, {
            operation: 'checkSafeInteger',
            fault: 'out-of-safe-range',
            value: o
          }),
        o % 1 &&
          this.throwError(n, a.errors.NUMERIC_FAULT, { operation: 'checkSafeInteger', fault: 'non-integer', value: o }))
    }
    checkArgumentCount(o, n, s) {
      s ? (s = ': ' + s) : (s = ''),
        o < n && this.throwError('missing argument' + s, a.errors.MISSING_ARGUMENT, { count: o, expectedCount: n }),
        o > n && this.throwError('too many arguments' + s, a.errors.UNEXPECTED_ARGUMENT, { count: o, expectedCount: n })
    }
    checkNew(o, n) {
      ;(o === Object || o == null) && this.throwError('missing new', a.errors.MISSING_NEW, { name: n.name })
    }
    checkAbstract(o, n) {
      o === n
        ? this.throwError(
            'cannot instantiate abstract class ' + JSON.stringify(n.name) + ' directly; use a sub-class',
            a.errors.UNSUPPORTED_OPERATION,
            { name: o.name, operation: 'new' }
          )
        : (o === Object || o == null) && this.throwError('missing new', a.errors.MISSING_NEW, { name: n.name })
    }
    static globalLogger() {
      return F || (F = new a(q)), F
    }
    static setCensorship(o, n) {
      if (
        (!o &&
          n &&
          this.globalLogger().throwError('cannot permanently disable censorship', a.errors.UNSUPPORTED_OPERATION, {
            operation: 'setCensorship'
          }),
        ne)
      ) {
        if (!o) return
        this.globalLogger().throwError('error censorship permanent', a.errors.UNSUPPORTED_OPERATION, {
          operation: 'setCensorship'
        })
      }
      ;(oe = !!o), (ne = !!n)
    }
    static setLogLevel(o, n) {
      let s = M[n.toLowerCase()]
      if (s == null) {
        a.globalLogger().warn('invalid log level - ' + n)
        return
      }
      ie[o] = s
    }
    static from(o) {
      return new a(o)
    }
  },
  c = a
;(c.errors = ae), (c.levels = me)
var Se = require('@solana/spl-token'),
  de = require('@solana/web3.js'),
  le = c.from('common/pubkey'),
  $e = A.SystemProgram.programId,
  en = new A.PublicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo')
function _(i) {
  if (i instanceof A.PublicKey) return i
  if (typeof i == 'string')
    try {
      return new A.PublicKey(i)
    } catch {
      return le.throwArgumentError('invalid public key', 'publicKey', i)
    }
  return le.throwArgumentError('invalid public key', 'publicKey', i)
}
var Ie = require('@solana/web3.js'),
  he = U(require('bn.js'))
var K = require('@solana/web3.js')
var yn = c.from('common/web3')
var h = U(require('bn.js'))
var b = U(require('bn.js')),
  Y = ((s) => (
    (s[(s.ROUND_DOWN = 0)] = 'ROUND_DOWN'),
    (s[(s.ROUND_HALF_UP = 1)] = 'ROUND_HALF_UP'),
    (s[(s.ROUND_UP = 2)] = 'ROUND_UP'),
    s
  ))(Y || {}),
  xe = new b.default(0),
  H = new b.default(1),
  ke = new b.default(2),
  we = new b.default(3),
  Me = new b.default(5),
  I = new b.default(10),
  G = new b.default(100),
  Ye = new b.default(1e3),
  ve = new b.default(1e4)
var v = c.from('entity/bignumber'),
  ue = 9007199254740991
function d(i) {
  return i instanceof h.default
    ? i
    : typeof i == 'string'
    ? i.match(/^-?[0-9]+$/)
      ? new h.default(i)
      : v.throwArgumentError('invalid BigNumberish string', 'value', i)
    : typeof i == 'number'
    ? i % 1
      ? v.throwArgumentError('BigNumberish number underflow', 'value', i)
      : i >= ue || i <= -ue
      ? v.throwArgumentError('BigNumberish number overflow', 'value', i)
      : new h.default(String(i))
    : typeof i == 'bigint'
    ? new h.default(i.toString())
    : v.throwArgumentError('invalid BigNumberish value', 'value', i)
}
function B(i) {
  return I.pow(d(i))
}
function Be(i, o) {
  let n = i.divmod(o)
  return n.mod.isZero() ? n.div : n.div.negative !== 0 ? n.div.isubn(1) : n.div.iaddn(1)
}
var P = { symbol: 'SOL', name: 'Solana', decimals: 9 },
  D = {
    symbol: 'WSOL',
    name: 'Wrapped SOL',
    mint: 'So11111111111111111111111111111111111111112',
    decimals: 9,
    extensions: { coingeckoId: 'solana' }
  }
var e = {
    *[Symbol.iterator]() {
      yield* Object.values(this)
    },
    WSOL: R({}, D),
    BTC: {
      symbol: 'BTC',
      name: 'Bitcoin',
      mint: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
      decimals: 6,
      extensions: { coingeckoId: 'bitcoin' }
    },
    ETH: {
      symbol: 'ETH',
      name: 'Ethereum',
      mint: '2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk',
      decimals: 6,
      extensions: { coingeckoId: 'ethereum' }
    },
    USDT: {
      symbol: 'USDT',
      name: 'Tether',
      mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
      decimals: 6,
      extensions: { coingeckoId: 'tether' }
    },
    WUSDT: {
      symbol: 'WUSDT',
      name: 'Wrapped USDT',
      mint: 'BQcdHdAQW1hczDbBi9hiegXAR7A98Q9jx3X3iBBBDiq4',
      decimals: 6,
      extensions: { coingeckoId: 'tether' }
    },
    USDC: {
      symbol: 'USDC',
      name: 'USD Coin',
      mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      decimals: 6,
      extensions: { coingeckoId: 'usd-coin' }
    },
    WUSDC: {
      symbol: 'WUSDC',
      name: 'Wrapped USDC',
      mint: 'BXXkv6z8ykpG1yuvUDPgh732wzVHB69RnB9YgSYh3itW',
      decimals: 6,
      extensions: { coingeckoId: 'usd-coin' }
    },
    YFI: {
      symbol: 'YFI',
      name: 'YFI',
      mint: '3JSf5tPeuscJGtaCp5giEiDhv51gQ4v3zWg8DGgyLfAB',
      decimals: 6,
      extensions: { coingeckoId: 'yearn-finance' }
    },
    LINK: {
      symbol: 'LINK',
      name: 'Chainlink',
      mint: 'CWE8jPTUYhdCTZYWPTe1o5DFqfdjzWKc9WKz6rSjQUdG',
      decimals: 6,
      extensions: { coingeckoId: 'chainlink' }
    },
    XRP: {
      symbol: 'XRP',
      name: 'XRP',
      mint: 'Ga2AXHpfAF6mv2ekZwcsJFqu7wB4NV331qNH7fW9Nst8',
      decimals: 6,
      extensions: { coingeckoId: 'ripple' }
    },
    SUSHI: {
      symbol: 'SUSHI',
      name: 'SUSHI',
      mint: 'AR1Mtgh7zAtxuxGd2XPovXPVjcSdY3i4rQYisNadjfKy',
      decimals: 6,
      extensions: { coingeckoId: 'sushi' }
    },
    ALEPH: {
      symbol: 'ALEPH',
      name: 'ALEPH',
      mint: 'CsZ5LZkDS7h9TDKjrbL7VAwQZ9nsRu8vJLhRYfmGaN8K',
      decimals: 6,
      extensions: { coingeckoId: 'aleph' }
    },
    SXP: {
      symbol: 'SXP',
      name: 'SXP',
      mint: 'SF3oTvfWzEP3DTwGSvUXRrGTvr75pdZNnBLAH9bzMuX',
      decimals: 6,
      extensions: { coingeckoId: 'swipe' }
    },
    HGET: {
      symbol: 'HGET',
      name: 'HGET',
      mint: 'BtZQfWqDGbk9Wf2rXEiWyQBdBY1etnUUn6zEphvVS7yN',
      decimals: 6,
      extensions: { coingeckoId: 'hedget' }
    },
    CREAM: {
      symbol: 'CREAM',
      name: 'CREAM',
      mint: '5Fu5UUgbjpUvdBveb3a1JTNirL8rXtiYeSMWvKjtUNQv',
      decimals: 6,
      extensions: { coingeckoId: 'cream-2' }
    },
    UNI: {
      symbol: 'UNI',
      name: 'UNI',
      mint: 'DEhAasscXF4kEGxFgJ3bq4PpVGp5wyUxMRvn6TzGVHaw',
      decimals: 6,
      extensions: { coingeckoId: 'uniswap' }
    },
    SRM: {
      symbol: 'SRM',
      name: 'Serum',
      mint: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt',
      decimals: 6,
      extensions: { coingeckoId: 'serum' }
    },
    FTT: {
      symbol: 'FTT',
      name: 'FTX Token',
      mint: 'AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3',
      decimals: 6,
      extensions: { coingeckoId: 'ftx-token' }
    },
    MSRM: {
      symbol: 'MSRM',
      name: 'MegaSerum',
      mint: 'MSRMcoVyrFxnSgo5uXwone5SKcGhT1KEJMFEkMEWf9L',
      decimals: 0,
      extensions: { coingeckoId: 'megaserum' }
    },
    TOMO: {
      symbol: 'TOMO',
      name: 'TOMO',
      mint: 'GXMvfY2jpQctDqZ9RoU3oWPhufKiCcFEfchvYumtX7jd',
      decimals: 6,
      extensions: { coingeckoId: 'tomochain' }
    },
    KARMA: {
      symbol: 'KARMA',
      name: 'KARMA',
      mint: 'EcqExpGNFBve2i1cMJUTR4bPXj4ZoqmDD2rTkeCcaTFX',
      decimals: 4,
      extensions: { coingeckoId: 'karma-dao' }
    },
    LUA: {
      symbol: 'LUA',
      name: 'LUA',
      mint: 'EqWCKXfs3x47uVosDpTRgFniThL9Y8iCztJaapxbEaVX',
      decimals: 6,
      extensions: { coingeckoId: 'lua-token' }
    },
    MATH: {
      symbol: 'MATH',
      name: 'MATH',
      mint: 'GeDS162t9yGJuLEHPWXXGrb1zwkzinCgRwnT8vHYjKza',
      decimals: 6,
      extensions: { coingeckoId: 'math' }
    },
    KEEP: {
      symbol: 'KEEP',
      name: 'KEEP',
      mint: 'GUohe4DJUA5FKPWo3joiPgsB7yzer7LpDmt1Vhzy3Zht',
      decimals: 6,
      extensions: { coingeckoId: 'keep-network' }
    },
    SWAG: {
      symbol: 'SWAG',
      name: 'SWAG',
      mint: '9F9fNTT6qwjsu4X4yWYKZpsbw5qT7o6yR2i57JF2jagy',
      decimals: 6,
      extensions: { coingeckoId: 'swag-finance' }
    },
    FIDA: {
      symbol: 'FIDA',
      name: 'Bonfida',
      mint: 'EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp',
      decimals: 6,
      extensions: { coingeckoId: 'bonfida' }
    },
    KIN: {
      symbol: 'KIN',
      name: 'Kin',
      mint: 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6',
      decimals: 5,
      extensions: { coingeckoId: 'kin' }
    },
    MAPS: {
      symbol: 'MAPS',
      name: 'MAPS',
      mint: 'MAPS41MDahZ9QdKXhVa4dWB9RuyfV4XqhyAZ8XcYepb',
      decimals: 6,
      extensions: { coingeckoId: 'maps' }
    },
    OXY: {
      symbol: 'OXY',
      name: 'Oxygen',
      mint: 'z3dn17yLaGMKffVogeFHQ9zWVcXgqgf3PQnDsNs2g6M',
      decimals: 6,
      extensions: { coingeckoId: 'oxygen' }
    },
    RAY: {
      symbol: 'RAY',
      name: 'Raydium',
      mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
      decimals: 6,
      extensions: { coingeckoId: 'raydium' }
    },
    xCOPE: {
      symbol: 'xCOPE',
      name: 'xCOPE',
      mint: '3K6rftdAaQYMPunrtNRHgnK2UAtjm2JwyT2oCiTDouYE',
      decimals: 0,
      extensions: { coingeckoId: 'cope' }
    },
    COPE: {
      symbol: 'COPE',
      name: 'Cope',
      mint: '8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh',
      decimals: 6,
      extensions: { coingeckoId: 'cope' }
    },
    STEP: {
      symbol: 'STEP',
      name: 'Step Finance',
      mint: 'StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT',
      decimals: 9,
      extensions: { coingeckoId: 'step-finance' }
    },
    MEDIA: {
      symbol: 'MEDIA',
      name: 'Media Network',
      mint: 'ETAtLmCmsoiEEKfNrHKJ2kYy3MoABhU6NQvpSfij5tDs',
      decimals: 6,
      extensions: { coingeckoId: 'media-network' }
    },
    ROPE: {
      symbol: 'ROPE',
      name: 'Rope Token',
      mint: '8PMHT4swUMtBzgHnh5U564N5sjPSiUz2cjEQzFnnP1Fo',
      decimals: 9,
      extensions: { coingeckoId: 'rope-token' }
    },
    MER: {
      symbol: 'MER',
      name: 'Mercurial',
      mint: 'MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K',
      decimals: 6,
      extensions: { coingeckoId: 'mercurial' }
    },
    TULIP: {
      symbol: 'TULIP',
      name: 'Tulip Protocol',
      mint: 'TuLipcqtGVXP9XR62wM8WWCm6a9vhLs7T1uoWBk6FDs',
      decimals: 6,
      extensions: { coingeckoId: 'solfarm' }
    },
    SNY: {
      symbol: 'SNY',
      name: 'SNY',
      mint: '4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y',
      decimals: 6,
      extensions: { coingeckoId: 'synthetify-token' }
    },
    SLRS: {
      symbol: 'SLRS',
      name: 'SLRS',
      mint: 'SLRSSpSLUTP7okbCUBYStWCo1vUgyt775faPqz8HUMr',
      decimals: 6,
      extensions: { coingeckoId: 'solrise-finance' }
    },
    WOO: {
      symbol: 'WOO',
      name: 'WOO Network',
      mint: 'E5rk3nmgLUuKUiS94gg4bpWwWwyjCMtddsAXkTFLtHEy',
      decimals: 6,
      extensions: { coingeckoId: 'woo-network' }
    },
    BOP: {
      symbol: 'BOP',
      name: 'Boring Protocol',
      mint: 'BLwTnYKqf7u4qjgZrrsKeNs2EzWkMLqVCu6j8iHyrNA3',
      decimals: 8,
      extensions: { coingeckoId: 'boring-protocol' }
    },
    SAMO: {
      symbol: 'SAMO',
      name: 'Samoyedcoin',
      mint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      decimals: 9,
      extensions: { coingeckoId: 'samoyedcoin' }
    },
    renBTC: {
      symbol: 'renBTC',
      name: 'renBTC',
      mint: 'CDJWUqTcYTVAKXAVXoQZFes5JUFc7owSeq7eMQcDSbo5',
      decimals: 8,
      extensions: { coingeckoId: 'renbtc' }
    },
    renDOGE: {
      symbol: 'renDOGE',
      name: 'renDOGE',
      mint: 'ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU',
      decimals: 8,
      extensions: { coingeckoId: 'rendoge' }
    },
    LIKE: {
      symbol: 'LIKE',
      name: 'Only1',
      mint: '3bRTivrVsitbmCTGtqwp7hxXPsybkjn4XLNtPsHqa3zR',
      decimals: 9,
      extensions: { coingeckoId: 'only1' }
    },
    DXL: {
      symbol: 'DXL',
      name: 'Dexlab',
      mint: 'GsNzxJfFn6zQdJGeYsupJWzUAm57Ba7335mfhWvFiE9Z',
      decimals: 6,
      extensions: { coingeckoId: 'dexlab' }
    },
    mSOL: {
      symbol: 'mSOL',
      name: 'Marinade staked SOL',
      mint: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
      decimals: 9,
      extensions: { coingeckoId: 'msol' }
    },
    PAI: {
      symbol: 'PAI',
      name: 'Parrot USD',
      mint: 'Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS',
      decimals: 6,
      extensions: { coingeckoId: 'parrot-usd' }
    },
    PORT: {
      symbol: 'PORT',
      name: 'Port Finance',
      mint: 'PoRTjZMPXb9T7dyU7tpLEZRQj7e6ssfAE62j2oQuc6y',
      decimals: 6,
      extensions: { coingeckoId: 'port-finance' }
    },
    MNGO: {
      symbol: 'MNGO',
      name: 'Mango',
      mint: 'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac',
      decimals: 6,
      extensions: { coingeckoId: 'mango-markets' }
    },
    CRP: {
      symbol: 'CRP',
      name: 'CropperFinance',
      mint: 'DubwWZNWiNGMMeeQHPnMATNj77YZPZSAz2WVR5WjLJqz',
      decimals: 9,
      extensions: { coingeckoId: 'cropperfinance' }
    },
    ATLAS: {
      symbol: 'ATLAS',
      name: 'Star Atlas',
      mint: 'ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx',
      decimals: 8,
      extensions: { coingeckoId: 'star-atlas' }
    },
    POLIS: {
      symbol: 'POLIS',
      name: 'Star Atlas DAO',
      mint: 'poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk',
      decimals: 8,
      extensions: { coingeckoId: 'star-atlas-dao' }
    },
    GRAPE: {
      symbol: 'GRAPE',
      name: 'Grape Protocol',
      mint: '8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA',
      decimals: 6,
      extensions: { coingeckoId: 'grape-2' }
    },
    GENE: {
      symbol: 'GENE',
      name: 'Genopets',
      mint: 'GENEtH5amGSi8kHAtQoezp1XEXwZJ8vcuePYnXdKrMYz',
      decimals: 9,
      extensions: { coingeckoId: 'genopets' }
    },
    DFL: {
      symbol: 'DFL',
      name: 'DeFi Land',
      mint: 'DFL1zNkaGPWm1BqAVqRjCZvHmwTFrEaJtbzJWgseoNJh',
      decimals: 9,
      extensions: { coingeckoId: 'defi-land' }
    },
    CHEEMS: {
      symbol: 'CHEEMS',
      name: 'Cheems',
      mint: '3FoUAsGDbvTD6YZ4wVKJgTB76onJUKz7GPEBNiR5b8wc',
      decimals: 4,
      extensions: { coingeckoId: 'cheems' }
    },
    stSOL: {
      symbol: 'stSOL',
      name: 'Lido Staked SOL',
      mint: '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj',
      decimals: 9,
      extensions: { coingeckoId: 'lido-staked-sol' }
    },
    LARIX: {
      symbol: 'LARIX',
      name: 'Larix',
      mint: 'Lrxqnh6ZHKbGy3dcrCED43nsoLkM1LTzU2jRfWe8qUC',
      decimals: 6,
      extensions: { coingeckoId: 'larix' }
    },
    RIN: {
      symbol: 'RIN',
      name: 'Aldrin',
      mint: 'E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp',
      decimals: 9,
      extensions: { coingeckoId: 'aldrin' }
    },
    APEX: {
      symbol: 'APEX',
      name: 'ApeXit Finance',
      mint: '51tMb3zBKDiQhNwGqpgwbavaGH54mk8fXFzxTc1xnasg',
      decimals: 9,
      extensions: { coingeckoId: 'apexit-finance' }
    },
    MNDE: {
      symbol: 'MNDE',
      name: 'Marinade',
      mint: 'MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey',
      decimals: 9,
      extensions: { coingeckoId: 'marinade' }
    },
    LIQ: {
      symbol: 'LIQ',
      name: 'LIQ Protocol',
      mint: '4wjPQJ6PrkC4dHhYghwJzGBVP78DkBzA2U3kHoFNBuhj',
      decimals: 6,
      extensions: { coingeckoId: 'liq-protocol' }
    },
    WAG: {
      symbol: 'WAG',
      name: 'Waggle Network',
      mint: '5tN42n9vMi6ubp67Uy4NnmM5DMZYN8aS8GeB3bEDHr6E',
      decimals: 9,
      extensions: { coingeckoId: 'waggle-network' }
    },
    wLDO: {
      symbol: 'wLDO',
      name: 'wLDO',
      mint: 'HZRCwxP2Vq9PCpPXooayhJ2bxTpo5xfpQrwB1svh332p',
      decimals: 8,
      extensions: {}
    },
    SLIM: {
      symbol: 'SLIM',
      name: 'Solanium',
      mint: 'xxxxa1sKNGwFtw2kFn8XauW9xq8hBZ5kVtcSesTT9fW',
      decimals: 6,
      extensions: { coingeckoId: 'solanium' }
    },
    PRT: {
      symbol: 'PRT',
      name: 'Parrot Protocol',
      mint: 'PRT88RkA4Kg5z7pKnezeNH4mafTvtQdfFgpQTGRjz44',
      decimals: 6,
      extensions: { coingeckoId: 'parrot-protocol' }
    },
    SBR: {
      symbol: 'SBR',
      name: 'SBR',
      mint: 'Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1',
      decimals: 6,
      extensions: {}
    },
    FAB: {
      symbol: 'FAB',
      name: 'Fabric',
      mint: 'EdAhkbj5nF9sRM7XN7ewuW8C9XEUMs8P7cnoQ57SYE96',
      decimals: 9,
      extensions: { coingeckoId: 'fabric' }
    },
    ABR: {
      symbol: 'ABR',
      name: 'Allbridge',
      mint: 'a11bdAAuV8iB2fu7X6AxAvDTo1QZ8FXB3kk5eecdasp',
      decimals: 9,
      extensions: { coingeckoId: 'allbridge' }
    },
    IVN: {
      symbol: 'IVN',
      name: 'Investin',
      mint: 'iVNcrNE9BRZBC9Aqf753iZiZfbszeAVUoikgT9yvr2a',
      decimals: 6,
      extensions: { coingeckoId: 'investin' }
    },
    CYS: {
      symbol: 'CYS',
      name: 'Cyclos',
      mint: 'BRLsMczKuaR5w9vSubF4j8HwEGGprVAyyVgS4EX7DKEg',
      decimals: 6,
      extensions: { coingeckoId: 'cyclos' }
    },
    FRKT: {
      symbol: 'FRKT',
      name: 'FRAKT Token',
      mint: 'ErGB9xa24Szxbk1M28u2Tx8rKPqzL6BroNkkzk5rG4zj',
      decimals: 8,
      extensions: { coingeckoId: 'frakt-token' }
    },
    AURY: {
      symbol: 'AURY',
      name: 'Aurory',
      mint: 'AURYydfxJib1ZkTir1Jn1J9ECYUtjb6rKQVmtYaixWPP',
      decimals: 9,
      extensions: { coingeckoId: 'aurory' }
    },
    SYP: {
      symbol: 'SYP',
      name: 'Sypool',
      mint: 'FnKE9n6aGjQoNWRBZXy4RW6LZVao7qwBonUbiD7edUmZ',
      decimals: 9,
      extensions: { coingeckoId: 'sypool' }
    },
    WOOF: {
      symbol: 'WOOF',
      name: 'WOOF',
      mint: '9nEqaUcb16sQ3Tn1psbkWqyhPdLmfHWjKGymREjsAgTE',
      decimals: 6,
      extensions: { coingeckoId: 'woof-token' }
    },
    ORCA: {
      symbol: 'ORCA',
      name: 'Orca',
      mint: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE',
      decimals: 6,
      extensions: { coingeckoId: 'orca' }
    },
    SLND: {
      symbol: 'SLND',
      name: 'Solend',
      mint: 'SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp',
      decimals: 6,
      extensions: { coingeckoId: 'solend' }
    },
    weWETH: {
      symbol: 'weWETH',
      name: 'weWETH',
      mint: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
      decimals: 8,
      extensions: {}
    },
    weUNI: {
      symbol: 'weUNI',
      name: 'weUNI',
      mint: '8FU95xFJhUUkyyCLU13HSzDLs7oC4QZdXQHL6SCeab36',
      decimals: 8,
      extensions: {}
    },
    weSUSHI: {
      symbol: 'weSUSHI',
      name: 'weSUSHI',
      mint: 'ChVzxWRmrTeSgwd3Ui3UumcN8KX7VK3WaD4KGeSKpypj',
      decimals: 8,
      extensions: {}
    },
    GOFX: {
      symbol: 'GOFX',
      name: 'GooseFX',
      mint: 'GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD',
      decimals: 9,
      extensions: { coingeckoId: 'goosefx' }
    },
    IN: {
      symbol: 'IN',
      name: 'Invictus',
      mint: 'inL8PMVd6iiW3RCBJnr5AsrRN6nqr4BTrcNuQWQSkvY',
      decimals: 9,
      extensions: { coingeckoId: 'invictus' }
    },
    weDYDX: {
      symbol: 'weDYDX',
      name: 'weDYDX',
      mint: '4Hx6Bj56eGyw8EJrrheM6LBQAvVYRikYCWsALeTrwyRU',
      decimals: 8,
      extensions: {}
    },
    STARS: {
      symbol: 'STARS',
      name: 'StarLaunch',
      mint: 'HCgybxq5Upy8Mccihrp7EsmwwFqYZtrHrsmsKwtGXLgW',
      decimals: 6,
      extensions: { coingeckoId: 'starlaunch' }
    },
    weAXS: {
      symbol: 'weAXS',
      name: 'weAXS',
      mint: 'HysWcbHiYY9888pHbaqhwLYZQeZrcQMXKQWRqS7zcPK5',
      decimals: 8,
      extensions: {}
    },
    weSHIB: {
      symbol: 'weSHIB',
      name: 'weSHIB',
      mint: 'CiKu4eHsVrc1eueVQeHn7qhXTcVu95gSQmBpX4utjL9z',
      decimals: 8,
      extensions: {}
    },
    OXS: {
      symbol: 'OXS',
      name: 'Oxbull Solana',
      mint: '4TGxgCSJQx2GQk9oHZ8dC5m3JNXTYZHjXumKAW3vLnNx',
      decimals: 9,
      extensions: { coingeckoId: 'oxbull-solana' }
    },
    CWAR: {
      symbol: 'CWAR',
      name: 'Cryowar',
      mint: 'HfYFjMKNZygfMC8LsQ8LtpPsPxEJoXJx4M6tqi75Hajo',
      decimals: 9,
      extensions: { coingeckoId: 'cryowar-token' }
    },
    UPS: {
      symbol: 'UPS',
      name: 'UPFI Network',
      mint: 'EwJN2GqUGXXzYmoAciwuABtorHczTA5LqbukKXV1viH7',
      decimals: 6,
      extensions: { coingeckoId: 'upfi-network' }
    },
    weSAND: {
      symbol: 'weSAND',
      name: 'weSAND',
      mint: '49c7WuCZkQgc3M4qH8WuEUNXfgwupZf1xqWkDQ7gjRGt',
      decimals: 8,
      extensions: {}
    },
    weMANA: {
      symbol: 'weMANA',
      name: 'weMANA',
      mint: '7dgHoN8wBZCc5wbnQ2C47TDnBMAxG4Q5L3KjP67z8kNi',
      decimals: 8,
      extensions: {}
    },
    CAVE: {
      symbol: 'CAVE',
      name: 'Crypto Cavemen',
      mint: '4SZjjNABoqhbd4hnapbvoEPEqT8mnNkfbEoAwALf1V8t',
      decimals: 6,
      extensions: { coingeckoId: 'cave' }
    },
    JSOL: {
      symbol: 'JSOL',
      name: 'JPool',
      mint: '7Q2afV64in6N6SeZsAAB81TJzwDoD6zpqmHkzi9Dcavn',
      decimals: 9,
      extensions: { coingeckoId: 'jpool' }
    },
    APT: {
      symbol: 'APT',
      name: 'Apricot',
      mint: 'APTtJyaRX5yGTsJU522N4VYWg3vCvSb65eam5GrPT5Rt',
      decimals: 6,
      extensions: { coingeckoId: 'apricot' }
    },
    SONAR: {
      symbol: 'SONAR',
      name: 'SonarWatch',
      mint: 'sonarX4VtVkQemriJeLm6CKeW3GDMyiBnnAEMw1MRAE',
      decimals: 9,
      extensions: { coingeckoId: 'sonarwatch' }
    },
    SHILL: {
      symbol: 'SHILL',
      name: 'SHILL Token',
      mint: '6cVgJUqo4nmvQpbgrDZwyfd6RwWw5bfnCamS3M9N1fd',
      decimals: 6,
      extensions: { coingeckoId: 'shill-token' }
    },
    TTT: {
      symbol: 'TTT',
      name: 'TabTrader',
      mint: 'FNFKRV3V8DtA3gVJN6UshMiLGYA8izxFwkNWmJbFjmRj',
      decimals: 6,
      extensions: { coingeckoId: 'tabtrader' }
    },
    BOKU: {
      symbol: 'BOKU',
      name: 'Boryoku Dragonz',
      mint: 'CN7qFa5iYkHz99PTctvT4xXUHnxwjQ5MHxCuTJtPN5uS',
      decimals: 9,
      extensions: { coingeckoId: 'boku' }
    },
    MIMO: {
      symbol: 'MIMO',
      name: 'Million Monke',
      mint: '9TE7ebz1dsFo1uQ2T4oYAKSm39Y6fWuHrd6Uk6XaiD16',
      decimals: 9,
      extensions: { coingeckoId: 'million-monke' }
    },
    wbWBNB: {
      symbol: 'wbWBNB',
      name: 'wbWBNB',
      mint: '9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa',
      decimals: 8,
      extensions: {}
    },
    wePEOPLE: {
      symbol: 'wePEOPLE',
      name: 'wePEOPLE',
      mint: 'CobcsUrt3p91FwvULYKorQejgsm5HoQdv5T8RUZ6PnLA',
      decimals: 8,
      extensions: {}
    },
    XTAG: {
      symbol: 'XTAG',
      name: 'xHashtag',
      mint: '5gs8nf4wojB5EXgDUWNLwXpknzgV2YWDhveAeBZpVLbp',
      decimals: 6,
      extensions: { coingeckoId: 'xhashtag' }
    },
    KKO: {
      symbol: 'KKO',
      name: 'Kineko',
      mint: 'kiNeKo77w1WBEzFFCXrTDRWGRWGP8yHvKC9rX6dqjQh',
      decimals: 9,
      extensions: { coingeckoId: 'kineko' }
    },
    VI: {
      symbol: 'VI',
      name: 'Vybit',
      mint: '7zBWymxbZt7PVHQzfi3i85frc1YRiQc23K7bh3gos8ZC',
      decimals: 9,
      extensions: { coingeckoId: 'vybit' }
    },
    SOLC: {
      symbol: 'SOLC',
      name: 'Solcubator',
      mint: 'Bx1fDtvTN6NvE4kjdPHQXtmGSg582bZx9fGy4DQNMmAT',
      decimals: 9,
      extensions: { coingeckoId: 'solcubator' }
    },
    STR: {
      symbol: 'STR',
      name: 'Solster',
      mint: '9zoqdwEBKWEi9G5Ze8BSkdmppxGgVv1Kw4LuigDiNr9m',
      decimals: 9,
      extensions: { coingeckoId: 'solster' }
    },
    SPWN: {
      symbol: 'SPWN',
      name: 'Bitspawn',
      mint: '5U9QqCPhqXAJcEv9uyzFJd5zhN93vuPk1aNNkXnUfPnt',
      decimals: 9,
      extensions: { coingeckoId: 'bitspawn' }
    },
    ISOLA: {
      symbol: 'ISOLA',
      name: 'Intersola',
      mint: '333iHoRM2Awhf9uVZtSyTfU8AekdGrgQePZsKMFPgKmS',
      decimals: 6,
      extensions: { coingeckoId: 'intersola' }
    },
    RUN: {
      symbol: 'RUN',
      name: 'Run',
      mint: '6F9XriABHfWhit6zmMUYAQBSy6XK5VF1cHXuW5LDpRtC',
      decimals: 9,
      extensions: { coingeckoId: 'run' }
    },
    REAL: {
      symbol: 'REAL',
      name: 'Realy Metaverse',
      mint: 'AD27ov5fVU2XzwsbvnFvb1JpCBaCB5dRXrczV9CqSVGb',
      decimals: 9,
      extensions: { coingeckoId: 'realy-metaverse' }
    },
    CRWNY: {
      symbol: 'CRWNY',
      name: 'CRWNY',
      mint: 'CRWNYkqdgvhGGae9CKfNka58j6QQkaD5bLhKXvUYqnc1',
      decimals: 6,
      extensions: {}
    },
    BLOCK: {
      symbol: 'BLOCK',
      name: 'Blockasset',
      mint: 'NFTUkR4u7wKxy9QLaX2TGvd9oZSWoMo4jqSJqdMb7Nk',
      decimals: 6,
      extensions: { coingeckoId: 'blockasset' }
    },
    SOLAR: {
      symbol: 'SOLAR',
      name: 'Solar',
      mint: '2wmKXX1xsxLfrvjEPrt2UHiqj8Gbzwxvffr9qmNjsw8g',
      decimals: 9,
      extensions: { coingeckoId: 'solar' }
    },
    BASIS: {
      symbol: 'BASIS',
      name: 'basis.markets',
      mint: 'Basis9oJw9j8cw53oMV7iqsgo6ihi9ALw4QR31rcjUJa',
      decimals: 6,
      extensions: { coingeckoId: 'basis-markets' }
    },
    SOLX: {
      symbol: 'SOLX',
      name: 'Soldex',
      mint: 'CH74tuRLTYcxG7qNJCsV9rghfLXJCQJbsu7i52a8F1Gn',
      decimals: 9,
      extensions: { coingeckoId: 'soldex' }
    },
    CHICKS: {
      symbol: 'CHICKS',
      name: 'SolChicks Token',
      mint: 'cxxShYRVcepDudXhe7U62QHvw8uBJoKFifmzggGKVC2',
      decimals: 9,
      extensions: { coingeckoId: 'solchicks-token' }
    },
    GST: {
      symbol: 'GST',
      name: 'GST',
      mint: 'AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB',
      decimals: 9,
      extensions: { coingeckoId: 'gst' }
    },
    MBS: {
      symbol: 'MBS',
      name: 'MonkeyBall',
      mint: 'Fm9rHUTF5v3hwMLbStjZXqNBBoZyGriQaFM6sTFz3K8A',
      decimals: 6,
      extensions: { coingeckoId: 'monkeyball' }
    },
    PRISM: {
      symbol: 'PRISM',
      name: 'Prism',
      mint: 'PRSMNsEPqhGVCH1TtWiJqPjJyh2cKrLostPZTNy1o5x',
      decimals: 6,
      extensions: { coingeckoId: 'prism' }
    },
    MEAN: {
      symbol: 'MEAN',
      name: 'Meanfi',
      mint: 'MEANeD3XDdUmNMsRGjASkSWdC8prLYsoRJ61pPeHctD',
      decimals: 6,
      extensions: { coingeckoId: 'meanfi' }
    },
    TINY: {
      symbol: 'TINY',
      name: 'Tiny Colony',
      mint: 'HKfs24UEDQpHS5hUyKYkHd9q7GY5UQ679q2bokeL2whu',
      decimals: 6,
      extensions: { coingeckoId: 'tiny-colony' }
    },
    SHDW: {
      symbol: 'SHDW',
      name: 'GenesysGo Shadow',
      mint: 'SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y',
      decimals: 9,
      extensions: { coingeckoId: 'genesysgo-shadow' }
    },
    SCY: {
      symbol: 'SCY',
      name: 'Synchrony',
      mint: 'SCYfrGCw8aDiqdgcpdGjV6jp4UVVQLuphxTDLNWu36f',
      decimals: 9,
      extensions: { coingeckoId: 'synchrony' }
    },
    SLC: {
      symbol: 'SLC',
      name: 'Solice',
      mint: 'METAmTMXwdb8gYzyCPfXXFmZZw4rUsXX58PNsDg7zjL',
      decimals: 6,
      extensions: { coingeckoId: 'solice' }
    }
  },
  kn = {
    *[Symbol.iterator]() {
      yield* Object.values(this)
    },
    FIDA_RAY_V4: {
      symbol: 'FIDA-RAY',
      name: 'FIDA-RAY V4 LP',
      mint: 'DsBuznXRTmzvEdb36Dx3aVLVo1XmH7r1PRZUFugLPTFv',
      base: e.FIDA,
      quote: e.RAY,
      decimals: e.FIDA.decimals,
      version: 4
    },
    OXY_RAY_V4: {
      symbol: 'OXY-RAY',
      name: 'OXY-RAY V4 LP',
      mint: 'FwaX9W7iThTZH5MFeasxdLpxTVxRcM7ZHieTCnYog8Yb',
      base: e.OXY,
      quote: e.RAY,
      decimals: e.OXY.decimals,
      version: 4
    },
    MAPS_RAY_V4: {
      symbol: 'MAPS-RAY',
      name: 'MAPS-RAY V4 LP',
      mint: 'CcKK8srfVdTSsFGV3VLBb2YDbzF4T4NM2C3UEjC39RLP',
      base: e.MAPS,
      quote: e.RAY,
      decimals: e.MAPS.decimals,
      version: 4
    },
    KIN_RAY_V4: {
      symbol: 'KIN-RAY',
      name: 'KIN-RAY V4 LP',
      mint: 'CHT8sft3h3gpLYbCcZ9o27mT5s3Z6VifBVbUiDvprHPW',
      base: e.KIN,
      quote: e.RAY,
      decimals: 6,
      version: 4
    },
    RAY_USDT_V4: {
      symbol: 'RAY-USDT',
      name: 'RAY-USDT V4 LP',
      mint: 'C3sT1R3nsw4AVdepvLTLKr5Gvszr7jufyBWUCvy4TUvT',
      base: e.RAY,
      quote: e.USDT,
      decimals: e.RAY.decimals,
      version: 4
    },
    SOL_USDC_V4: {
      symbol: 'SOL-USDC',
      name: 'SOL-USDC V4 LP',
      mint: '8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu',
      base: e.WSOL,
      quote: e.USDC,
      decimals: e.WSOL.decimals,
      version: 4
    },
    YFI_USDC_V4: {
      symbol: 'YFI-USDC',
      name: 'YFI-USDC V4 LP',
      mint: '865j7iMmRRycSYUXzJ33ZcvLiX9JHvaLidasCyUyKaRE',
      base: e.YFI,
      quote: e.USDC,
      decimals: e.YFI.decimals,
      version: 4
    },
    SRM_USDC_V4: {
      symbol: 'SRM-USDC',
      name: 'SRM-USDC V4 LP',
      mint: '9XnZd82j34KxNLgQfz29jGbYdxsYznTWRpvZE3SRE7JG',
      base: e.SRM,
      quote: e.USDC,
      decimals: e.SRM.decimals,
      version: 4
    },
    FTT_USDC_V4: {
      symbol: 'FTT-USDC',
      name: 'FTT-USDC V4 LP',
      mint: '75dCoKfUHLUuZ4qEh46ovsxfgWhB4icc3SintzWRedT9',
      base: e.FTT,
      quote: e.USDC,
      decimals: e.FTT.decimals,
      version: 4
    },
    BTC_USDC_V4: {
      symbol: 'BTC-USDC',
      name: 'BTC-USDC V4 LP',
      mint: '2hMdRdVWZqetQsaHG8kQjdZinEMBz75vsoWTCob1ijXu',
      base: e.BTC,
      quote: e.USDC,
      decimals: e.BTC.decimals,
      version: 4
    },
    SUSHI_USDC_V4: {
      symbol: 'SUSHI-USDC',
      name: 'SUSHI-USDC V4 LP',
      mint: '2QVjeR9d2PbSf8em8NE8zWd8RYHjFtucDUdDgdbDD2h2',
      base: e.SUSHI,
      quote: e.USDC,
      decimals: e.SUSHI.decimals,
      version: 4
    },
    TOMO_USDC_V4: {
      symbol: 'TOMO-USDC',
      name: 'TOMO-USDC V4 LP',
      mint: 'CHyUpQFeW456zcr5XEh4RZiibH8Dzocs6Wbgz9aWpXnQ',
      base: e.TOMO,
      quote: e.USDC,
      decimals: e.TOMO.decimals,
      version: 4
    },
    LINK_USDC_V4: {
      symbol: 'LINK-USDC',
      name: 'LINK-USDC V4 LP',
      mint: 'BqjoYjqKrXtfBKXeaWeAT5sYCy7wsAYf3XjgDWsHSBRs',
      base: e.LINK,
      quote: e.USDC,
      decimals: e.LINK.decimals,
      version: 4
    },
    ETH_USDC_V4: {
      symbol: 'ETH-USDC',
      name: 'ETH-USDC V4 LP',
      mint: '13PoKid6cZop4sj2GfoBeujnGfthUbTERdE5tpLCDLEY',
      base: e.ETH,
      quote: e.USDC,
      decimals: e.ETH.decimals,
      version: 4
    },
    xCOPE_USDC_V4: {
      symbol: 'xCOPE-USDC',
      name: 'xCOPE-USDC V4 LP',
      mint: '2Vyyeuyd15Gp8aH6uKE72c4hxc8TVSLibxDP9vzspQWG',
      base: e.xCOPE,
      quote: e.USDC,
      decimals: e.xCOPE.decimals,
      version: 4
    },
    SOL_USDT_V4: {
      symbol: 'SOL-USDT',
      name: 'SOL-USDT V4 LP',
      mint: 'Epm4KfTj4DMrvqn6Bwg2Tr2N8vhQuNbuK8bESFp4k33K',
      base: e.WSOL,
      quote: e.USDT,
      decimals: e.WSOL.decimals,
      version: 4
    },
    YFI_USDT_V4: {
      symbol: 'YFI-USDT',
      name: 'YFI-USDT V4 LP',
      mint: 'FA1i7fej1pAbQbnY8NbyYUsTrWcasTyipKreDgy1Mgku',
      base: e.YFI,
      quote: e.USDT,
      decimals: e.YFI.decimals,
      version: 4
    },
    SRM_USDT_V4: {
      symbol: 'SRM-USDT',
      name: 'SRM-USDT V4 LP',
      mint: 'HYSAu42BFejBS77jZAZdNAWa3iVcbSRJSzp3wtqCbWwv',
      base: e.SRM,
      quote: e.USDT,
      decimals: e.SRM.decimals,
      version: 4
    },
    FTT_USDT_V4: {
      symbol: 'FTT-USDT',
      name: 'FTT-USDT V4 LP',
      mint: '2cTCiUnect5Lap2sk19xLby7aajNDYseFhC9Pigou11z',
      base: e.FTT,
      quote: e.USDT,
      decimals: e.FTT.decimals,
      version: 4
    },
    BTC_USDT_V4: {
      symbol: 'BTC-USDT',
      name: 'BTC-USDT V4 LP',
      mint: 'DgGuvR9GSHimopo3Gc7gfkbKamLKrdyzWkq5yqA6LqYS',
      base: e.BTC,
      quote: e.USDT,
      decimals: e.BTC.decimals,
      version: 4
    },
    SUSHI_USDT_V4: {
      symbol: 'SUSHI-USDT',
      name: 'SUSHI-USDT V4 LP',
      mint: 'Ba26poEYDy6P2o95AJUsewXgZ8DM9BCsmnU9hmC9i4Ki',
      base: e.SUSHI,
      quote: e.USDT,
      decimals: e.SUSHI.decimals,
      version: 4
    },
    TOMO_USDT_V4: {
      symbol: 'TOMO-USDT',
      name: 'TOMO-USDT V4 LP',
      mint: 'D3iGro1vn6PWJXo9QAPj3dfta6dKkHHnmiiym2EfsAmi',
      base: e.TOMO,
      quote: e.USDT,
      decimals: e.TOMO.decimals,
      version: 4
    },
    LINK_USDT_V4: {
      symbol: 'LINK-USDT',
      name: 'LINK-USDT V4 LP',
      mint: 'Dr12Sgt9gkY8WU5tRkgZf1TkVWJbvjYuPAhR3aDCwiiX',
      base: e.LINK,
      quote: e.USDT,
      decimals: e.LINK.decimals,
      version: 4
    },
    ETH_USDT_V4: {
      symbol: 'ETH-USDT',
      name: 'ETH-USDT V4 LP',
      mint: 'nPrB78ETY8661fUgohpuVusNCZnedYCgghzRJzxWnVb',
      base: e.ETH,
      quote: e.USDT,
      decimals: e.ETH.decimals,
      version: 4
    },
    YFI_SRM_V4: {
      symbol: 'YFI-SRM',
      name: 'YFI-SRM V4 LP',
      mint: 'EGJht91R7dKpCj8wzALkjmNdUUUcQgodqWCYweyKcRcV',
      base: e.YFI,
      quote: e.SRM,
      decimals: e.YFI.decimals,
      version: 4
    },
    FTT_SRM_V4: {
      symbol: 'FTT-SRM',
      name: 'FTT-SRM V4 LP',
      mint: 'AsDuPg9MgPtt3jfoyctUCUgsvwqAN6RZPftqoeiPDefM',
      base: e.FTT,
      quote: e.SRM,
      decimals: e.FTT.decimals,
      version: 4
    },
    BTC_SRM_V4: {
      symbol: 'BTC-SRM',
      name: 'BTC-SRM V4 LP',
      mint: 'AGHQxXb3GSzeiLTcLtXMS2D5GGDZxsB2fZYZxSB5weqB',
      base: e.BTC,
      quote: e.SRM,
      decimals: e.BTC.decimals,
      version: 4
    },
    SUSHI_SRM_V4: {
      symbol: 'SUSHI-SRM',
      name: 'SUSHI-SRM V4 LP',
      mint: '3HYhUnUdV67j1vn8fu7ExuVGy5dJozHEyWvqEstDbWwE',
      base: e.SUSHI,
      quote: e.SRM,
      decimals: e.SUSHI.decimals,
      version: 4
    },
    TOMO_SRM_V4: {
      symbol: 'TOMO-SRM',
      name: 'TOMO-SRM V4 LP',
      mint: 'GgH9RnKrQpaMQeqmdbMvs5oo1A24hERQ9wuY2pSkeG7x',
      base: e.TOMO,
      quote: e.SRM,
      decimals: e.TOMO.decimals,
      version: 4
    },
    LINK_SRM_V4: {
      symbol: 'LINK-SRM',
      name: 'LINK-SRM V4 LP',
      mint: 'GXN6yJv12o18skTmJXaeFXZVY1iqR18CHsmCT8VVCmDD',
      base: e.LINK,
      quote: e.SRM,
      decimals: e.LINK.decimals,
      version: 4
    },
    ETH_SRM_V4: {
      symbol: 'ETH-SRM',
      name: 'ETH-SRM V4 LP',
      mint: '9VoY3VERETuc2FoadMSYYizF26mJinY514ZpEzkHMtwG',
      base: e.ETH,
      quote: e.SRM,
      decimals: e.ETH.decimals,
      version: 4
    },
    SRM_SOL_V4: {
      symbol: 'SRM-SOL',
      name: 'SRM-SOL V4 LP',
      mint: 'AKJHspCwDhABucCxNLXUSfEzb7Ny62RqFtC9uNjJi4fq',
      base: e.SRM,
      quote: e.WSOL,
      decimals: e.SRM.decimals,
      version: 4
    },
    STEP_USDC_V4: {
      symbol: 'STEP-USDC',
      name: 'STEP-USDC V4 LP',
      mint: '3k8BDobgihmk72jVmXYLE168bxxQUhqqyESW4dQVktqC',
      base: e.STEP,
      quote: e.USDC,
      decimals: e.STEP.decimals,
      version: 4
    },
    MEDIA_USDC_V4: {
      symbol: 'MEDIA-USDC',
      name: 'MEDIA-USDC V4 LP',
      mint: 'A5zanvgtioZGiJMdEyaKN4XQmJsp1p7uVxaq2696REvQ',
      base: e.MEDIA,
      quote: e.USDC,
      decimals: e.MEDIA.decimals,
      version: 4
    },
    ROPE_USDC_V4: {
      symbol: 'ROPE-USDC',
      name: 'ROPE-USDC V4 LP',
      mint: 'Cq4HyW5xia37tKejPF2XfZeXQoPYW6KfbPvxvw5eRoUE',
      base: e.ROPE,
      quote: e.USDC,
      decimals: e.ROPE.decimals,
      version: 4
    },
    MER_USDC_V4: {
      symbol: 'MER-USDC',
      name: 'MER-USDC V4 LP',
      mint: '3H9NxvaZoxMZZDZcbBDdWMKbrfNj7PCF5sbRwDr7SdDW',
      base: e.MER,
      quote: e.USDC,
      decimals: e.MER.decimals,
      version: 4
    },
    COPE_USDC_V4: {
      symbol: 'COPE-USDC',
      name: 'COPE-USDC V4 LP',
      mint: 'Cz1kUvHw98imKkrqqu95GQB9h1frY8RikxPojMwWKGXf',
      base: e.COPE,
      quote: e.USDC,
      decimals: e.COPE.decimals,
      version: 4
    },
    ALEPH_USDC_V4: {
      symbol: 'ALEPH-USDC',
      name: 'ALEPH-USDC V4 LP',
      mint: 'iUDasAP2nXm5wvTukAHEKSdSXn8vQkRtaiShs9ceGB7',
      base: e.ALEPH,
      quote: e.USDC,
      decimals: e.ALEPH.decimals,
      version: 4
    },
    TULIP_USDC_V4: {
      symbol: 'TULIP-USDC',
      name: 'TULIP-USDC V4 LP',
      mint: '2doeZGLJyACtaG9DCUyqMLtswesfje1hjNA11hMdj6YU',
      base: e.TULIP,
      quote: e.USDC,
      decimals: e.TULIP.decimals,
      version: 4
    },
    WOO_USDC_V4: {
      symbol: 'WOO-USDC',
      name: 'WOO-USDC V4 LP',
      mint: '7cu42ao8Jgrd5A3y3bNQsCxq5poyGZNmTydkGfJYQfzh',
      base: e.WOO,
      quote: e.USDC,
      decimals: e.WOO.decimals,
      version: 4
    },
    SNY_USDC_V4: {
      symbol: 'SNY-USDC',
      name: 'SNY-USDC V4 LP',
      mint: 'G8qcfeFqxwbCqpxv5LpLWxUCd1PyMB5nWb5e5YyxLMKg',
      base: e.SNY,
      quote: e.USDC,
      decimals: e.SNY.decimals,
      version: 4
    },
    BOP_RAY_V4: {
      symbol: 'BOP-RAY',
      name: 'BOP-RAY V4 LP',
      mint: '9nQPYJvysyfnXhQ6nkK5V7sZG26hmDgusfdNQijRk5LD',
      base: e.BOP,
      quote: e.RAY,
      decimals: e.BOP.decimals,
      version: 4
    },
    SLRS_USDC_V4: {
      symbol: 'SLRS-USDC',
      name: 'SLRS-USDC V4 LP',
      mint: '2Xxbm1hdv5wPeen5ponDSMT3VqhGMTQ7mH9stNXm9shU',
      base: e.SLRS,
      quote: e.USDC,
      decimals: e.SLRS.decimals,
      version: 4
    },
    SAMO_RAY_V4: {
      symbol: 'SAMO-RAY',
      name: 'SAMO-RAY V4 LP',
      mint: 'HwzkXyX8B45LsaHXwY8su92NoRBS5GQC32HzjQRDqPnr',
      base: e.SAMO,
      quote: e.RAY,
      decimals: e.SAMO.decimals,
      version: 4
    },
    renBTC_USDC_V4: {
      symbol: 'renBTC-USDC',
      name: 'renBTC-USDC V4 LP',
      mint: 'CTEpsih91ZLo5gunvryLpJ3pzMjmt5jbS6AnSQrzYw7V',
      base: e.renBTC,
      quote: e.USDC,
      decimals: e.renBTC.decimals,
      version: 4
    },
    renDOGE_USDC_V4: {
      symbol: 'renDOGE-USDC',
      name: 'renDOGE-USDC V4 LP',
      mint: 'Hb8KnZNKvRxu7pgMRWJgoMSMcepfvNiBFFDDrdf9o3wA',
      base: e.renDOGE,
      quote: e.USDC,
      decimals: e.renDOGE.decimals,
      version: 4
    },
    RAY_USDC_V4: {
      symbol: 'RAY-USDC',
      name: 'RAY-USDC V4 LP',
      mint: 'FbC6K13MzHvN42bXrtGaWsvZY9fxrackRSZcBGfjPc7m',
      base: e.RAY,
      quote: e.USDC,
      decimals: e.RAY.decimals,
      version: 4
    },
    RAY_SRM_V4: {
      symbol: 'RAY-SRM',
      name: 'RAY-SRM V4 LP',
      mint: '7P5Thr9Egi2rvMmEuQkLn8x8e8Qro7u2U7yLD2tU2Hbe',
      base: e.RAY,
      quote: e.SRM,
      decimals: e.RAY.decimals,
      version: 4
    },
    RAY_ETH_V4: {
      symbol: 'RAY-ETH',
      name: 'RAY-ETH V4 LP',
      mint: 'mjQH33MqZv5aKAbKHi8dG3g3qXeRQqq1GFcXceZkNSr',
      base: e.RAY,
      quote: e.ETH,
      decimals: e.RAY.decimals,
      version: 4
    },
    RAY_SOL_V4: {
      symbol: 'RAY-SOL',
      name: 'RAY-SOL V4 LP',
      mint: '89ZKE4aoyfLBe2RuV6jM3JGNhaV18Nxh8eNtjRcndBip',
      base: e.RAY,
      quote: e.WSOL,
      decimals: e.RAY.decimals,
      version: 4
    },
    DXL_USDC_V4: {
      symbol: 'DXL-USDC',
      name: 'DXL-USDC V4 LP',
      mint: '4HFaSvfgskipvrzT1exoVKsUZ174JyExEsA8bDfsAdY5',
      base: e.DXL,
      quote: e.USDC,
      decimals: e.DXL.decimals,
      version: 4
    },
    LIKE_USDC_V4: {
      symbol: 'LIKE-USDC',
      name: 'LIKE-USDC V4 LP',
      mint: 'cjZmbt8sJgaoyWYUttomAu5LJYU44ZrcKTbzTSEPDVw',
      base: e.LIKE,
      quote: e.USDC,
      decimals: e.LIKE.decimals,
      version: 4
    },
    mSOL_USDC_V4: {
      symbol: 'mSOL-USDC',
      name: 'mSOL-USDC V4 LP',
      mint: '4xTpJ4p76bAeggXoYywpCCNKfJspbuRzZ79R7pRhbqSf',
      base: e.mSOL,
      quote: e.USDC,
      decimals: e.mSOL.decimals,
      version: 4
    },
    mSOL_SOL_V4: {
      symbol: 'mSOL-SOL',
      name: 'mSOL-SOL V4 LP',
      mint: '5ijRoAHVgd5T5CNtK5KDRUBZ7Bffb69nktMj5n6ks6m4',
      base: e.mSOL,
      quote: e.WSOL,
      decimals: e.mSOL.decimals,
      version: 4
    },
    MER_PAI_V4: {
      symbol: 'MER-PAI',
      name: 'MER-PAI V4 LP',
      mint: 'DU5RT2D9EviaSmX6Ta8MZwMm85HwSEqGMRdqUiuCGfmD',
      base: e.MER,
      quote: e.PAI,
      decimals: e.MER.decimals,
      version: 4
    },
    PORT_USDC_V4: {
      symbol: 'PORT-USDC',
      name: 'PORT-USDC V4 LP',
      mint: '9tmNtbUCrLS15qC4tEfr5NNeqcqpZ4uiGgi2vS5CLQBS',
      base: e.PORT,
      quote: e.USDC,
      decimals: e.PORT.decimals,
      version: 4
    },
    MNGO_USDC_V4: {
      symbol: 'MNGO-USDC',
      name: 'MNGO-USDC V4 LP',
      mint: 'DkiqCQ792n743xjWQVCbBUaVtkdiuvQeYndM53ReWnCC',
      base: e.MNGO,
      quote: e.USDC,
      decimals: e.MNGO.decimals,
      version: 4
    },
    ATLAS_USDC_V4: {
      symbol: 'ATLAS-USDC',
      name: 'ATLAS-USDC V4 LP',
      mint: '9shGU9f1EsxAbiR567MYZ78WUiS6ZNCYbHe53WUULQ7n',
      base: e.ATLAS,
      quote: e.USDC,
      decimals: e.ATLAS.decimals,
      version: 4
    },
    POLIS_USDC_V4: {
      symbol: 'POLIS-USDC',
      name: 'POLIS-USDC V4 LP',
      mint: '8MbKSBpyXs8fVneKgt71jfHrn5SWtX8n4wMLpiVfF9So',
      base: e.POLIS,
      quote: e.USDC,
      decimals: e.POLIS.decimals,
      version: 4
    },
    ATLAS_RAY_V4: {
      symbol: 'ATLAS-RAY',
      name: 'ATLAS-RAY V4 LP',
      mint: '418MFhkaYQtbn529wmjLLqL6uKxDz7j4eZBaV1cobkyd',
      base: e.ATLAS,
      quote: e.RAY,
      decimals: e.ATLAS.decimals,
      version: 4
    },
    POLIS_RAY_V4: {
      symbol: 'POLIS-RAY',
      name: 'POLIS-RAY V4 LP',
      mint: '9ysGKUH6WqzjQEUT4dxqYCUaFNVK9QFEa24pGzjFq8xg',
      base: e.POLIS,
      quote: e.RAY,
      decimals: e.POLIS.decimals,
      version: 4
    },
    ALEPH_RAY_V4: {
      symbol: 'ALEPH-RAY',
      name: 'ALEPH-RAY V4 LP',
      mint: 'n76skjqv4LirhdLok2zJELXNLdRpYDgVJQuQFbamscy',
      base: e.ALEPH,
      quote: e.RAY,
      decimals: e.ALEPH.decimals,
      version: 4
    },
    TULIP_RAY_V4: {
      symbol: 'TULIP-RAY',
      name: 'TULIP-RAY V4 LP',
      mint: '3AZTviji5qduMG2s4FfWGR3SSQmNUCyx8ao6UKCPg3oJ',
      base: e.TULIP,
      quote: e.RAY,
      decimals: e.TULIP.decimals,
      version: 4
    },
    SLRS_RAY_V4: {
      symbol: 'SLRS-RAY',
      name: 'SLRS-RAY V4 LP',
      mint: '2pk78vsKT3jfJAcN2zbpMUnrR57SZrxHqaZYyFgp92mM',
      base: e.SLRS,
      quote: e.RAY,
      decimals: e.SLRS.decimals,
      version: 4
    },
    MER_RAY_V4: {
      symbol: 'MER-RAY',
      name: 'MER-RAY V4 LP',
      mint: '214hxy3AbKoaEKgqcg2aC1cP5R67cGGAyDEg5GDwC7Ub',
      base: e.MER,
      quote: e.RAY,
      decimals: e.MER.decimals,
      version: 4
    },
    MEDIA_RAY_V4: {
      symbol: 'MEDIA-RAY',
      name: 'MEDIA-RAY V4 LP',
      mint: '9Aseg5A1JD1yCiFFdDaNNxCiJ7XzrpZFmcEmLjXFdPaH',
      base: e.MEDIA,
      quote: e.RAY,
      decimals: e.MEDIA.decimals,
      version: 4
    },
    SNY_RAY_V4: {
      symbol: 'SNY-RAY',
      name: 'SNY-RAY V4 LP',
      mint: '2k4quTuuLUxrSEhFH99qcoZzvgvVEc3b5sz3xz3qstfS',
      base: e.SNY,
      quote: e.RAY,
      decimals: e.SNY.decimals,
      version: 4
    },
    LIKE_RAY_V4: {
      symbol: 'LIKE-RAY',
      name: 'LIKE-RAY V4 LP',
      mint: '7xqDycbFSCpUpzkYapFeyPJWPwEpV7zdWbYf2MVHTNjv',
      base: e.LIKE,
      quote: e.RAY,
      decimals: e.LIKE.decimals,
      version: 4
    },
    COPE_RAY_V4: {
      symbol: 'COPE-RAY',
      name: 'COPE-RAY V4 LP',
      mint: 'A7GCVHA8NSsbdFscHdoNU41tL1TRKNmCH4K94CgcLK9F',
      base: e.COPE,
      quote: e.RAY,
      decimals: e.COPE.decimals,
      version: 4
    },
    ETH_SOL_V4: {
      symbol: 'ETH-SOL',
      name: 'ETH-SOL V4 LP',
      mint: 'GKfgC86iJoMjwAtcyiLu6nWnjggqUXsDQihXkP14fDez',
      base: e.ETH,
      quote: e.WSOL,
      decimals: e.ETH.decimals,
      version: 4
    },
    stSOL_USDC_V4: {
      symbol: 'stSOL-USDC',
      name: 'stSOL-USDC V4 LP',
      mint: 'HDUJMwYZkjUZre63xUeDhdCi8c6LgUDiBqxmP3QC3VPX',
      base: e.stSOL,
      quote: e.USDC,
      decimals: e.stSOL.decimals,
      version: 4
    },
    GRAPE_USDC_V4: {
      symbol: 'GRAPE-USDC',
      name: 'GRAPE-USDC V4 LP',
      mint: 'A8ZYmnZ1vwxUa4wpJVUaJgegsuTEz5TKy5CiJXffvmpt',
      base: e.GRAPE,
      quote: e.USDC,
      decimals: e.GRAPE.decimals,
      version: 4
    },
    LARIX_USDC_V4: {
      symbol: 'LARIX-USDC',
      name: 'LARIX-USDC V4 LP',
      mint: '7yieit4YsNsZ9CAK8H5ZEMvvk35kPEHHeXwp6naoWU9V',
      base: e.LARIX,
      quote: e.USDC,
      decimals: e.LARIX.decimals,
      version: 4
    },
    RIN_USDC_V4: {
      symbol: 'RIN-USDC',
      name: 'RIN-USDC V4 LP',
      mint: 'GfCWfrZez7BDmCSEeMERVDVUaaM2TEreyYUgb2cpuS3w',
      base: e.RIN,
      quote: e.USDC,
      decimals: e.RIN.decimals,
      version: 4
    },
    APEX_USDC_V4: {
      symbol: 'APEX-USDC',
      name: 'APEX-USDC V4 LP',
      mint: '444cVqYyDxJNo6FqiMb9qQWFUd7tYzFRdDuJRFrSAGnU',
      base: e.APEX,
      quote: e.USDC,
      decimals: e.APEX.decimals,
      version: 4
    },
    mSOL_RAY_V4: {
      symbol: 'mSOL-RAY',
      name: 'mSOL-RAY V4 LP',
      mint: 'De2EHBAdkgfc72DpShqDGG42cV3iDWh8wvvZdPsiEcqP',
      base: e.mSOL,
      quote: e.RAY,
      decimals: e.mSOL.decimals,
      version: 4
    },
    MNDE_mSOL_V4: {
      symbol: 'MNDE-mSOL',
      name: 'MNDE-mSOL V4 LP',
      mint: '4bh8XCzTHSbqbWN8o1Jn4ueBdz1LvJFoEasN6K6CQ8Ny',
      base: e.MNDE,
      quote: e.mSOL,
      decimals: e.MNDE.decimals,
      version: 4
    },
    LARIX_RAY_V4: {
      symbol: 'LARIX-RAY',
      name: 'LARIX-RAY V4 LP',
      mint: 'ZRDfSLgWGeaYSmhdPvFNKQQhDcYdZQaue2N8YDmHX4q',
      base: e.LARIX,
      quote: e.RAY,
      decimals: e.LARIX.decimals,
      version: 4
    },
    LIQ_USDC_V4: {
      symbol: 'LIQ-USDC',
      name: 'LIQ-USDC V4 LP',
      mint: 'GWpD3eTfhJB5KDCcnE85dBQrjAk2CsrgDF9b52R9CrjV',
      base: e.LIQ,
      quote: e.USDC,
      decimals: e.LIQ.decimals,
      version: 4
    },
    WAG_USDC_V4: {
      symbol: 'WAG-USDC',
      name: 'WAG-USDC V4 LP',
      mint: '4yykyPugitUVRewNPXXCviRvxGfsfsRMoP32z3b6FmUC',
      base: e.WAG,
      quote: e.USDC,
      decimals: e.WAG.decimals,
      version: 4
    },
    ETH_mSOL_V4: {
      symbol: 'ETH-mSOL',
      name: 'ETH-mSOL V4 LP',
      mint: 'HYv3grQfi8QbV7nG7EFgNK1aJSrsJ7HynXJKJVPLL2Uh',
      base: e.ETH,
      quote: e.mSOL,
      decimals: e.ETH.decimals,
      version: 4
    },
    mSOL_USDT_V4: {
      symbol: 'mSOL-USDT',
      name: 'mSOL-USDT V4 LP',
      mint: '69NCmEW9mGpiWLjAcAWHq51k4ionJZmzgRfRT3wQaCCf',
      base: e.mSOL,
      quote: e.USDT,
      decimals: e.mSOL.decimals,
      version: 4
    },
    BTC_mSOL_V4: {
      symbol: 'BTC-mSOL',
      name: 'BTC-mSOL V4 LP',
      mint: '92bcERNtUmuaJ6mwLSxYHZYSph37jdKxRdoYNxpcYNPp',
      base: e.BTC,
      quote: e.mSOL,
      decimals: e.BTC.decimals,
      version: 4
    },
    SLIM_SOL_V4: {
      symbol: 'SLIM-SOL',
      name: 'SLIM-SOL V4 LP',
      mint: '9X4EK8E59VAVi6ChnNvvd39m6Yg9RtkBbAPq1mDVJT57',
      base: e.SLIM,
      quote: e.WSOL,
      decimals: e.SLIM.decimals,
      version: 4
    },
    AURY_USDC_V4: {
      symbol: 'AURY-USDC',
      name: 'AURY-USDC V4 LP',
      mint: 'Gub5dvTy4nzP82qpmpNkBxmRqjtqRddBTBqHSdNcf2oS',
      base: e.AURY,
      quote: e.USDC,
      decimals: e.AURY.decimals,
      version: 4
    },
    PRT_SOL_V4: {
      symbol: 'PRT-SOL',
      name: 'PRT-SOL V4 LP',
      mint: 'EcJ8Wgwt1AzSPiDpVr6aaSur8TKAsNTPmmzRACeqT68Z',
      base: e.PRT,
      quote: e.WSOL,
      decimals: e.PRT.decimals,
      version: 4
    },
    LIQ_RAY_V4: {
      symbol: 'LIQ-RAY',
      name: 'LIQ-RAY V4 LP',
      mint: '49YUsDrThJosHSagCn1F59Uc9NRxbr9thVrZikUnQDXy',
      base: e.LIQ,
      quote: e.RAY,
      decimals: e.LIQ.decimals,
      version: 4
    },
    SYP_SOL_V4: {
      symbol: 'SYP-SOL',
      name: 'SYP-SOL V4 LP',
      mint: 'KHV6dfj2bDntzJ9z1S26cDfqWfUZdJRFmteLR6LxHwW',
      base: e.SYP,
      quote: e.WSOL,
      decimals: e.SYP.decimals,
      version: 4
    },
    SYP_RAY_V4: {
      symbol: 'SYP-RAY',
      name: 'SYP-RAY V4 LP',
      mint: 'FT2KZqxxM8F2h9pZtTF4PyjK88bM4YbuBzd7ZPwQ5wMB',
      base: e.SYP,
      quote: e.RAY,
      decimals: e.SYP.decimals,
      version: 4
    },
    SYP_USDC_V4: {
      symbol: 'SYP-USDC',
      name: 'SYP-USDC V4 LP',
      mint: '2xJGuLAivAR1WkARRA6zP1v4jaA9jV2Qis8JfMNvrVyZ',
      base: e.SYP,
      quote: e.USDC,
      decimals: e.SYP.decimals,
      version: 4
    },
    FAB_USDC_V4: {
      symbol: 'FAB-USDC',
      name: 'FAB-USDC V4 LP',
      mint: '5rTCvZq6BcApsC3VV1EEUuTJfaVd8uYhcGjwTy1By6P8',
      base: e.FAB,
      quote: e.USDC,
      decimals: e.FAB.decimals,
      version: 4
    },
    WOOF_RAY_V4: {
      symbol: 'WOOF-RAY',
      name: 'WOOF-RAY V4 LP',
      mint: 'H2FAnazDaGFutcmnrwDxhmdncR1Bd7GG4mhPCSUiamDX',
      base: e.WOOF,
      quote: e.RAY,
      decimals: e.WOOF.decimals,
      version: 4
    },
    WOOF_USDC_V4: {
      symbol: 'WOOF-USDC',
      name: 'WOOF-USDC V4 LP',
      mint: 'EFSu5TMc1ijRevaYCxUkS7uGvbhsymDHEaTK3UVdNE3q',
      base: e.WOOF,
      quote: e.USDC,
      decimals: e.WOOF.decimals,
      version: 4
    },
    SLND_USDC_V4: {
      symbol: 'SLND-USDC',
      name: 'SLND-USDC V4 LP',
      mint: 'EunE9uDh2cGsyJcsGuGKc6wte7kBn8iye2gzC4w2ePHn',
      base: e.SLND,
      quote: e.USDC,
      decimals: e.SLND.decimals,
      version: 4
    },
    FRKT_SOL_V4: {
      symbol: 'FRKT-SOL',
      name: 'FRKT-SOL V4 LP',
      mint: 'HYUKXgpjaxMXHttyrFYtv3z2rdhZ1U9QDH8zEc8BooQC',
      base: e.FRKT,
      quote: e.WSOL,
      decimals: e.FRKT.decimals,
      version: 4
    },
    weWETH_SOL_V4: {
      symbol: 'weWETH-SOL',
      name: 'weWETH-SOL V4 LP',
      mint: '3hbozt2Por7bcrGod8N7kEeJNMocFFjCJrQR16TQGBrE',
      base: e.weWETH,
      quote: e.WSOL,
      decimals: e.weWETH.decimals,
      version: 4
    },
    weWETH_USDC_V4: {
      symbol: 'weWETH-USDC',
      name: 'weWETH-USDC V4 LP',
      mint: '3529SBnMCDW3S3xQ52aABbRHo7PcHvpQA4no8J12L5eK',
      base: e.weWETH,
      quote: e.USDC,
      decimals: e.weWETH.decimals,
      version: 4
    },
    weUNI_USDC_V4: {
      symbol: 'weUNI-USDC',
      name: 'weUNI-USDC V4 LP',
      mint: 'EEC4QnT41py39QaYnzQnoYQEtDUDNa6Se8SBDgfPSN2a',
      base: e.weUNI,
      quote: e.USDC,
      decimals: e.weUNI.decimals,
      version: 4
    },
    weSUSHI_USDC_V4: {
      symbol: 'weSUSHI-USDC',
      name: 'weSUSHI-USDC V4 LP',
      mint: '3wVrtQZsiDNp5yTPyfEzQHPU6iuJoMmpnWg6CTt4V8sR',
      base: e.weSUSHI,
      quote: e.USDC,
      decimals: e.weSUSHI.decimals,
      version: 4
    },
    CYS_USDC_V4: {
      symbol: 'CYS-USDC',
      name: 'CYS-USDC V4 LP',
      mint: 'GfV3QDzzdVUwCNSdfn6PjhmyJvjw18tn51RingWZYwk3',
      base: e.CYS,
      quote: e.USDC,
      decimals: e.CYS.decimals,
      version: 4
    },
    SAMO_USDC_V4: {
      symbol: 'SAMO-USDC',
      name: 'SAMO-USDC V4 LP',
      mint: 'B2PjGEP3vPf1999fUD14pYdxvSDRVBk43hxB2rgthwEY',
      base: e.SAMO,
      quote: e.USDC,
      decimals: e.SAMO.decimals,
      version: 4
    },
    ABR_USDC_V4: {
      symbol: 'ABR-USDC',
      name: 'ABR-USDC V4 LP',
      mint: 'ECHfxkf5zjjZFTX95QfFahNyzG7feyEKcfTdjsdrMSGU',
      base: e.ABR,
      quote: e.USDC,
      decimals: e.ABR.decimals,
      version: 4
    },
    IN_USDC_V4: {
      symbol: 'IN-USDC',
      name: 'IN-USDC V4 LP',
      mint: 'GbmJtVgg9fRmmmjKUYGMZeSt8wZ47cDDXasg5Y3iF4kz',
      base: e.IN,
      quote: e.USDC,
      decimals: e.IN.decimals,
      version: 4
    },
    weDYDX_USDC_V4: {
      symbol: 'weDYDX-USDC',
      name: 'weDYDX-USDC V4 LP',
      mint: 'BjkkMZnnzmgLqzGErzDbkk15ozv48iVKQuunpeM2Hqnk',
      base: e.weDYDX,
      quote: e.USDC,
      decimals: e.weDYDX.decimals,
      version: 4
    },
    STARS_USDC_V4: {
      symbol: 'STARS-USDC',
      name: 'STARS-USDC V4 LP',
      mint: 'FJ68q7NChhETcGVdinMbM2FF1Cy79dpmUi6HC83K55Hv',
      base: e.STARS,
      quote: e.USDC,
      decimals: e.STARS.decimals,
      version: 4
    },
    weAXS_USDC_V4: {
      symbol: 'weAXS-USDC',
      name: 'weAXS-USDC V4 LP',
      mint: '6PSoJQ7myQ1BJtbQC6oiWR8HSecQGyoWsPYTZRJo2ci3',
      base: e.weAXS,
      quote: e.USDC,
      decimals: e.weAXS.decimals,
      version: 4
    },
    weSHIB_USDC_V4: {
      symbol: 'weSHIB-USDC',
      name: 'weSHIB-USDC V4 LP',
      mint: 'AcjX5pmTMGSgxkdxc3r82r6WMKBvS6eQXXFz5ck5KKUa',
      base: e.weSHIB,
      quote: e.USDC,
      decimals: e.weSHIB.decimals,
      version: 4
    },
    SBR_USDC_V4: {
      symbol: 'SBR-USDC',
      name: 'SBR-USDC V4 LP',
      mint: '9FC8xTFRbgTpuZZYAYnZLxgnQ8r7FwfSBM1SWvGwgF7s',
      base: e.SBR,
      quote: e.USDC,
      decimals: e.SBR.decimals,
      version: 4
    },
    OXS_USDC_V4: {
      symbol: 'OXS-USDC',
      name: 'OXS-USDC V4 LP',
      mint: 'et9pdjWm97rbmsJoN183GkFV5qzTGru79GE1Zhe7NTU',
      base: e.OXS,
      quote: e.USDC,
      decimals: e.OXS.decimals,
      version: 4
    },
    CWAR_USDC_V4: {
      symbol: 'CWAR-USDC',
      name: 'CWAR-USDC V4 LP',
      mint: 'HjR23bxn2gtRDB2P1Tm3DLepAPPZgazsWJpLG9wqjnYR',
      base: e.CWAR,
      quote: e.USDC,
      decimals: e.CWAR.decimals,
      version: 4
    },
    UPS_USDC_V4: {
      symbol: 'UPS-USDC',
      name: 'UPS-USDC V4 LP',
      mint: '9hSUZdREEsbaYaKY4FouvXr7xyAqtpdHRDoYCb6Mb28a',
      base: e.UPS,
      quote: e.USDC,
      decimals: e.UPS.decimals,
      version: 4
    },
    weSAND_USDC_V4: {
      symbol: 'weSAND-USDC',
      name: 'weSAND-USDC V4 LP',
      mint: '3dADrQa7utyiCsaFeVk9r7oebW1WheowhKo5soBYKBVT',
      base: e.weSAND,
      quote: e.USDC,
      decimals: e.weSAND.decimals,
      version: 4
    },
    weMANA_USDC_V4: {
      symbol: 'weMANA-USDC',
      name: 'weMANA-USDC V4 LP',
      mint: 'HpUkVAPRJ5zNRuJ1ZwMXEhbMHL3gSuPb2QuSER9YUd3a',
      base: e.weMANA,
      quote: e.USDC,
      decimals: e.weMANA.decimals,
      version: 4
    },
    CAVE_USDC_V4: {
      symbol: 'CAVE-USDC',
      name: 'CAVE-USDC V4 LP',
      mint: '5Gba1k3fU7Vh7UtAiBmie9vhQNNq1JfEwgn1DPGZ7NKQ',
      base: e.CAVE,
      quote: e.USDC,
      decimals: e.CAVE.decimals,
      version: 4
    },
    GENE_USDC_V4: {
      symbol: 'GENE-USDC',
      name: 'GENE-USDC V4 LP',
      mint: '7GKvfHEXenNiWYbJBKae89mdaMPr5gGMYwZmyC8gBNVG',
      base: e.GENE,
      quote: e.USDC,
      decimals: e.GENE.decimals,
      version: 4
    },
    GENE_RAY_V4: {
      symbol: 'GENE-RAY',
      name: 'GENE-RAY V4 LP',
      mint: '3HzXnc1qZ8mGqun18Ck3KA616XnZNqF1RWbgYE2nGRMA',
      base: e.GENE,
      quote: e.RAY,
      decimals: e.GENE.decimals,
      version: 4
    },
    APT_USDC_V4: {
      symbol: 'APT-USDC',
      name: 'APT-USDC V4 LP',
      mint: 'Hk8mDAJFq4E9kF3DtNgPFwzbo5kbeiusNFJgWmo3LoQ5',
      base: e.APT,
      quote: e.USDC,
      decimals: e.APT.decimals,
      version: 4
    },
    GOFX_USDC_V4: {
      symbol: 'GOFX-USDC',
      name: 'GOFX-USDC V4 LP',
      mint: '4svqAwrLPGRDCQuuieYTmtLXF75wiahjeK2rEN9tY1YL',
      base: e.GOFX,
      quote: e.USDC,
      decimals: e.GOFX.decimals,
      version: 4
    },
    SONAR_USDC_V4: {
      symbol: 'SONAR-USDC',
      name: 'SONAR-USDC V4 LP',
      mint: '2tAcfqJ1YYjpGLqwh76kyNt9VaNFDd4fJySfH6SmWfKt',
      base: e.SONAR,
      quote: e.USDC,
      decimals: e.SONAR.decimals,
      version: 4
    },
    JSOL_SOL_V4: {
      symbol: 'JSOL-SOL',
      name: 'JSOL-SOL V4 LP',
      mint: '61z37rpHsU6d3Fq5sUjJ85K6tXGzkoYKDAG3kPJQNDRo',
      base: e.JSOL,
      quote: e.WSOL,
      decimals: e.JSOL.decimals,
      version: 4
    },
    JSOL_USDC_V4: {
      symbol: 'JSOL-USDC',
      name: 'JSOL-USDC V4 LP',
      mint: '3JZqf2VPNxj1kDZQsfzC7myM6spsGQbGuFv1gVfdYosN',
      base: e.JSOL,
      quote: e.USDC,
      decimals: e.JSOL.decimals,
      version: 4
    },
    SHILL_USDC_V4: {
      symbol: 'SHILL-USDC',
      name: 'SHILL-USDC V4 LP',
      mint: 'CnUhYBtQEbSBZ76bgxAouVCTCb8rofZzwerVF5z5LREJ',
      base: e.SHILL,
      quote: e.USDC,
      decimals: e.SHILL.decimals,
      version: 4
    },
    DFL_USDC_V4: {
      symbol: 'DFL-USDC',
      name: 'DFL-USDC V4 LP',
      mint: 'Fffijd6UVJdQeLVXhenS8YcsnMUdWJqpbBeH42LFkXgS',
      base: e.DFL,
      quote: e.USDC,
      decimals: e.DFL.decimals,
      version: 4
    },
    BOKU_USDC_V4: {
      symbol: 'BOKU-USDC',
      name: 'BOKU-USDC V4 LP',
      mint: '8jjQn5Yagb6Nm2WGAxPW1bcGqrTWpg5adf6QukXEarcP',
      base: e.BOKU,
      quote: e.USDC,
      decimals: e.BOKU.decimals,
      version: 4
    },
    MIMO_SOL_V4: {
      symbol: 'MIMO-SOL',
      name: 'MIMO-SOL V4 LP',
      mint: 'HUJ1opSk8AiPfDT47r7n4hTiK2EXgrR3Msy7T8q1BywS',
      base: e.MIMO,
      quote: e.WSOL,
      decimals: e.MIMO.decimals,
      version: 4
    },
    wbWBNB_USDC_V4: {
      symbol: 'wbWBNB-USDC',
      name: 'wbWBNB-USDC V4 LP',
      mint: 'FEsEfEJJSfiMQcshUgZ5UigfytfGRQ3z5puyF6DXDp9C',
      base: e.wbWBNB,
      quote: e.USDC,
      decimals: e.wbWBNB.decimals,
      version: 4
    },
    wePEOPLE_USDC_V4: {
      symbol: 'wePEOPLE-USDC',
      name: 'wePEOPLE-USDC V4 LP',
      mint: '3e5ZCKi4etorpV4pv1fSckP5iJD67xcUkx3RtFCZhbzD',
      base: e.wePEOPLE,
      quote: e.USDC,
      decimals: e.wePEOPLE.decimals,
      version: 4
    },
    ISOLA_USDT_V4: {
      symbol: 'ISOLA-USDT',
      name: 'ISOLA-USDT V4 LP',
      mint: 'H8s1wQsZpRK61pyLF3XwyQc6E8vNUnwRDhy3TBDCDENQ',
      base: e.ISOLA,
      quote: e.USDT,
      decimals: e.ISOLA.decimals,
      version: 4
    },
    SPWN_USDC_V4: {
      symbol: 'SPWN-USDC',
      name: 'SPWN-USDC V4 LP',
      mint: 'B5uyCAQcX6nAjZypLgiivbEKabSptgUb8JK9tkaSnqdW',
      base: e.SPWN,
      quote: e.USDC,
      decimals: e.SPWN.decimals,
      version: 4
    },
    STR_USDC_V4: {
      symbol: 'STR-USDC',
      name: 'STR-USDC V4 LP',
      mint: '8uDVKmVwNmbXHDB7rNKqtpcT9VAsFHTJ5pPYxjyoBbNg',
      base: e.STR,
      quote: e.USDC,
      decimals: e.STR.decimals,
      version: 4
    },
    SOLC_USDT_V4: {
      symbol: 'SOLC-USDT',
      name: 'SOLC-USDT V4 LP',
      mint: '2g9JzTWycLzK4KEBBHsponAtZRee2ii63bRrJ8tefEyt',
      base: e.SOLC,
      quote: e.USDT,
      decimals: e.SOLC.decimals,
      version: 4
    },
    VI_USDC_V4: {
      symbol: 'VI-USDC',
      name: 'VI-USDC V4 LP',
      mint: '3MwHyHCRfVqtH3ABFtdKXdY9dwemr9GGxQFaBkeq6NjY',
      base: e.VI,
      quote: e.USDC,
      decimals: e.VI.decimals,
      version: 4
    },
    KKO_USDC_V4: {
      symbol: 'KKO-USDC',
      name: 'KKO-USDC V4 LP',
      mint: '7xr1Doc1NiMWbUg99YVFqQSLfYXNzo6YvacXUsSgBMNW',
      base: e.KKO,
      quote: e.USDC,
      decimals: e.KKO.decimals,
      version: 4
    },
    XTAG_USDC_V4: {
      symbol: 'XTAG-USDC',
      name: 'XTAG-USDC V4 LP',
      mint: 'GCEQbLg4ik5YJ4CMcbtuVqEc4sjLdSGy34rFk1CtGjdg',
      base: e.XTAG,
      quote: e.USDC,
      decimals: e.XTAG.decimals,
      version: 4
    },
    TTT_USDC_V4: {
      symbol: 'TTT-USDC',
      name: 'TTT-USDC V4 LP',
      mint: '84fmrerHGohoRf4iLPDQ1KG4CjSjCRksYWGzjWfCRM8a',
      base: e.TTT,
      quote: e.USDC,
      decimals: e.TTT.decimals,
      version: 4
    },
    RUN_USDC_V4: {
      symbol: 'RUN-USDC',
      name: 'RUN-USDC V4 LP',
      mint: 'CjTLvvKSQdEujcSzeZRYgk4w1DpuXBbMppLHaxZyz11Y',
      base: e.RUN,
      quote: e.USDC,
      decimals: e.RUN.decimals,
      version: 4
    },
    CRWNY_USDC_V4: {
      symbol: 'CRWNY-USDC',
      name: 'CRWNY-USDC V4 LP',
      mint: 'H3D9Gyi4frRLW6bS9vBthDVDJyzyRJ6XhhpP6PJGWaDC',
      base: e.CRWNY,
      quote: e.USDC,
      decimals: e.CRWNY.decimals,
      version: 4
    },
    CRWNY_RAY_V4: {
      symbol: 'CRWNY-RAY',
      name: 'CRWNY-RAY V4 LP',
      mint: '5Cz9wGStNjiUg81q8t6sJJeckuT2C14CYSfyQbtYirSX',
      base: e.CRWNY,
      quote: e.RAY,
      decimals: e.CRWNY.decimals,
      version: 4
    },
    BLOCK_USDC_V4: {
      symbol: 'BLOCK-USDC',
      name: 'BLOCK-USDC V4 LP',
      mint: '8i44Y23GkkwDYZ5iSkVEqmrXUfwNmwo9grguTDWKM8wg',
      base: e.BLOCK,
      quote: e.USDC,
      decimals: e.BLOCK.decimals,
      version: 4
    },
    REAL_USDC_V4: {
      symbol: 'REAL-USDC',
      name: 'REAL-USDC V4 LP',
      mint: 'EN43tp8xdkcM8RYSJ4msFHMPTJRXKhUteVYBDJLwTvr3',
      base: e.REAL,
      quote: e.USDC,
      decimals: e.REAL.decimals,
      version: 4
    },
    FRKT_USDC_V4: {
      symbol: 'FRKT-USDC',
      name: 'FRKT-USDC V4 LP',
      mint: '7MgzqVTGeA4wENme81QPTrPy45NJMKVL9XGwxmNT87cG',
      base: e.FRKT,
      quote: e.USDC,
      decimals: e.FRKT.decimals,
      version: 4
    },
    MBS_USDC_V4: {
      symbol: 'MBS-USDC',
      name: 'MBS-USDC V4 LP',
      mint: 'BAgSWaPZpsQKyZJdvB5KyvmCNj6hzczzentt5FhDCVHb',
      base: e.MBS,
      quote: e.USDC,
      decimals: e.MBS.decimals,
      version: 4
    },
    PRISM_USDC_V4: {
      symbol: 'PRISM-USDC',
      name: 'PRISM-USDC V4 LP',
      mint: '3baYkTcudvSFMe25UpZcBfdp4FA5kL2E4pfaeJ8AiYJB',
      base: e.PRISM,
      quote: e.USDC,
      decimals: e.PRISM.decimals,
      version: 4
    },
    CHICKS_USDC_V4: {
      symbol: 'CHICKS-USDC',
      name: 'CHICKS-USDC V4 LP',
      mint: 'CPzmcw81a6PDasSXhVLfDRKuTJXZPUqocS9VFf5zCFhs',
      base: e.CHICKS,
      quote: e.USDC,
      decimals: e.CHICKS.decimals,
      version: 4
    },
    MEAN_RAY_V4: {
      symbol: 'MEAN-RAY',
      name: 'MEAN-RAY V4 LP',
      mint: 'H9wUyrxpAErmdNVPitpHSXgwoomoh91ggJKPWtQQoCn1',
      base: e.MEAN,
      quote: e.RAY,
      decimals: e.MEAN.decimals,
      version: 4
    },
    TINY_USDC_V4: {
      symbol: 'TINY-USDC',
      name: 'TINY-USDC V4 LP',
      mint: 'Hho6ZzRDj49L4z6zog8nQZFaxMSz6FX6wNzVpMeAMen',
      base: e.TINY,
      quote: e.USDC,
      decimals: e.TINY.decimals,
      version: 4
    },
    SCY_USDC_V4: {
      symbol: 'SCY-USDC',
      name: 'SCY-USDC V4 LP',
      mint: 'EcYk7t6Vw59HDnY2u6H1KDPkk8juMeA1NpGpHiGk1LDf',
      base: e.SCY,
      quote: e.USDC,
      decimals: e.SCY.decimals,
      version: 4
    }
  }
var Yn = {
    *[Symbol.iterator]() {
      yield* Object.values(this)
    },
    WSOL: R({}, D)
  },
  vn = {
    *[Symbol.iterator]() {
      yield* Object.values(this)
    }
  }
var qn = {
    *[Symbol.iterator]() {
      yield* Object.values(this)
    },
    WSOL: R({}, D)
  },
  Fn = {
    *[Symbol.iterator]() {
      yield* Object.values(this)
    }
  }
var Hn = c.from('token/util')
var X = class {
    constructor(o, n = 'UNKNOWN', s = 'UNKNOWN') {
      ;(this.decimals = o), (this.symbol = n), (this.name = s)
    }
  },
  C = X
C.SOL = new X(P.decimals, P.symbol, P.name)
function We() {
  if (typeof Symbol < 'u' && typeof Symbol.for == 'function')
    try {
      C.prototype[Symbol.for('nodejs.util.inspect.custom')] = function () {
        return `<Currency: decimals=${this.decimals}, name=${this.name}, symbol=${this.symbol}>`
      }
    } catch {
      C.prototype.inspect = function () {
        return `<Currency: decimals=${this.decimals}, name=${this.name}, symbol=${this.symbol}>`
      }
    }
  else
    C.prototype.inspect = function () {
      return `<Currency: decimals=${this.decimals}, name=${this.name}, symbol=${this.symbol}>`
    }
}
var j = class extends C {
    constructor(n, s, t = 'UNKNOWN', l = 'UNKNOWN') {
      super(s, t, l)
      this.mint = _(n)
    }
    equals(n) {
      return this === n ? !0 : this.mint.equals(n.mint)
    }
  },
  u = j
u.WSOL = new j(D.mint, D.decimals, P.symbol, P.name)
function qe() {
  if (typeof Symbol < 'u' && typeof Symbol.for == 'function')
    try {
      u.prototype[Symbol.for('nodejs.util.inspect.custom')] = function () {
        return `<Token: mint=${this.mint.toBase58()}, decimals=${this.decimals}, name=${this.name}, symbol=${
          this.symbol
        }>`
      }
    } catch {
      u.prototype.inspect = function () {
        return `<Token: mint=${this.mint.toBase58()}, decimals=${this.decimals}, name=${this.name}, symbol=${
          this.symbol
        }>`
      }
    }
  else
    u.prototype.inspect = function () {
      return `<Token: mint=${this.mint.toBase58()}, decimals=${this.decimals}, name=${this.name}, symbol=${
        this.symbol
      }>`
    }
}
function p(i, o) {
  return i instanceof u && o instanceof u ? i.equals(o) : i instanceof u || o instanceof u ? !1 : i === o
}
var pe = U(require('big.js')),
  De = U(require('decimal.js-light'))
var be = U(require('toformat')),
  Fe = be.default,
  x = Fe
var W = c.from('entity/fraction'),
  E = x(pe.default),
  k = x(De.default),
  _e = { [0]: k.ROUND_DOWN, [1]: k.ROUND_HALF_UP, [2]: k.ROUND_UP },
  Ke = { [0]: E.roundDown, [1]: E.roundHalfUp, [2]: E.roundUp },
  r = class {
    constructor(o, n = H) {
      ;(this.numerator = d(o)), (this.denominator = d(n))
    }
    get quotient() {
      return this.numerator.div(this.denominator)
    }
    invert() {
      return new r(this.denominator, this.numerator)
    }
    add(o) {
      let n = o instanceof r ? o : new r(d(o))
      return this.denominator.eq(n.denominator)
        ? new r(this.numerator.add(n.numerator), this.denominator)
        : new r(
            this.numerator.mul(n.denominator).add(n.numerator.mul(this.denominator)),
            this.denominator.mul(n.denominator)
          )
    }
    sub(o) {
      let n = o instanceof r ? o : new r(d(o))
      return this.denominator.eq(n.denominator)
        ? new r(this.numerator.sub(n.numerator), this.denominator)
        : new r(
            this.numerator.mul(n.denominator).sub(n.numerator.mul(this.denominator)),
            this.denominator.mul(n.denominator)
          )
    }
    mul(o) {
      let n = o instanceof r ? o : new r(d(o))
      return new r(this.numerator.mul(n.numerator), this.denominator.mul(n.denominator))
    }
    div(o) {
      let n = o instanceof r ? o : new r(d(o))
      return new r(this.numerator.mul(n.denominator), this.denominator.mul(n.numerator))
    }
    toSignificant(o, n = { groupSeparator: '' }, s = 1) {
      W.assert(Number.isInteger(o), `${o} is not an integer.`),
        W.assert(o > 0, `${o} is not positive.`),
        k.set({ precision: o + 1, rounding: _e[s] })
      let t = new k(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(o)
      return t.toFormat(t.decimalPlaces(), n)
    }
    toFixed(o, n = { groupSeparator: '' }, s = 1) {
      return (
        W.assert(Number.isInteger(o), `${o} is not an integer.`),
        W.assert(o >= 0, `${o} is negative.`),
        (E.DP = o),
        (E.RM = Ke[s]),
        new E(this.numerator.toString()).div(this.denominator.toString()).toFormat(o, n)
      )
    }
  }
var L = c.from('entity/amount'),
  ye = x(Ue.default)
function Ce(i, o) {
  let n = '0',
    s = '0'
  if (i.includes('.')) {
    let t = i.split('.')
    if (t.length === 2) ([n, s] = t), (s = s.padEnd(o, '0'))
    else return L.throwArgumentError('invalid number string', 'num', i)
  } else n = i
  return [n, s.slice(0, o) || s]
}
var T = class extends r {
    constructor(n, s, t = !0) {
      let l = new w.default(0),
        g = I.pow(new w.default(n.decimals))
      if (t) l = d(s)
      else {
        let y = new w.default(0),
          f = new w.default(0)
        if (typeof s == 'string' || typeof s == 'number' || typeof s == 'bigint') {
          let [Le, ge] = Ce(s.toString(), n.decimals)
          ;(y = d(Le)), (f = d(ge))
        }
        ;(y = y.mul(g)), (l = y.add(f))
      }
      super(l, g)
      this.currency = n
    }
    get raw() {
      return this.numerator
    }
    isZero() {
      return this.raw.isZero()
    }
    gt(n) {
      return L.assert(p(this.currency, n.currency), 'gt currency not equals'), this.raw.gt(n.raw)
    }
    lt(n) {
      return L.assert(p(this.currency, n.currency), 'lt currency not equals'), this.raw.lt(n.raw)
    }
    add(n) {
      return (
        L.assert(p(this.currency, n.currency), 'add currency not equals'), new T(this.currency, this.raw.add(n.raw))
      )
    }
    sub(n) {
      return (
        L.assert(p(this.currency, n.currency), 'sub currency not equals'), new T(this.currency, this.raw.sub(n.raw))
      )
    }
    toSignificant(n = this.currency.decimals, s, t = 0) {
      return super.toSignificant(n, s, t)
    }
    toFixed(n = this.currency.decimals, s, t = 0) {
      return L.assert(n <= this.currency.decimals, 'decimals overflow'), super.toFixed(n, s, t)
    }
    toExact(n = { groupSeparator: '' }) {
      return (
        (ye.DP = this.currency.decimals), new ye(this.numerator.toString()).div(this.denominator.toString()).toFormat(n)
      )
    }
  },
  N = class extends T {
    constructor(n, s, t = !0) {
      super(n, s, t)
      this.token = n
    }
    add(n) {
      return L.assert(p(this.token, n.token), 'add token not equals'), new N(this.token, this.raw.add(n.raw))
    }
    subtract(n) {
      return L.assert(p(this.token, n.token), 'sub token not equals'), new N(this.token, this.raw.sub(n.raw))
    }
  }
var z = new r(G),
  J = class extends r {
    toSignificant(o = 5, n, s) {
      return this.mul(z).toSignificant(o, n, s)
    }
    toFixed(o = 2, n, s) {
      return this.mul(z).toFixed(o, n, s)
    }
  }
var He = c.from('entity/price'),
  V = class extends r {
    constructor(n, s, t, l) {
      super(l, s)
      ;(this.baseCurrency = n), (this.quoteCurrency = t), (this.scalar = new r(B(n.decimals), B(t.decimals)))
    }
    get raw() {
      return new r(this.numerator, this.denominator)
    }
    get adjusted() {
      return super.mul(this.scalar)
    }
    invert() {
      return new V(this.quoteCurrency, this.numerator, this.baseCurrency, this.denominator)
    }
    mul(n) {
      He.assert(p(this.quoteCurrency, n.baseCurrency), 'mul currency not equals')
      let s = super.mul(n)
      return new V(this.baseCurrency, s.denominator, n.quoteCurrency, s.numerator)
    }
    toSignificant(n = this.quoteCurrency.decimals, s, t) {
      return this.adjusted.toSignificant(n, s, t)
    }
    toFixed(n = this.quoteCurrency.decimals, s, t) {
      return this.adjusted.toFixed(n, s, t)
    }
  }
0 &&
  (module.exports = {
    Currency,
    CurrencyAmount,
    FIVE,
    Fraction,
    ONE,
    Percent,
    Price,
    Rounding,
    TEN,
    THREE,
    TWO,
    Token,
    TokenAmount,
    ZERO,
    _100,
    _1000,
    _10000,
    _100_PERCENT,
    currencyEquals,
    divCeil,
    inspectCurrency,
    inspectToken,
    parseBigNumberish,
    splitNumber,
    tenExponentiate
  })
//# sourceMappingURL=index.js.map
