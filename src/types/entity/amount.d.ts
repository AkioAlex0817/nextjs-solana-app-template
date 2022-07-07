import bn_js__default from 'bn.js'
import { BigNumberish } from './bignumber.js'
import { Rounding } from './constant.js'
import { Currency, Token } from './currency.js'
import { Fraction } from './fraction.js'
import '@solana/web3.js'
import '../common/pubkey.js'
import '@solana/spl-token'

declare function splitNumber(num: string, decimals: number): string[]
declare class CurrencyAmount extends Fraction {
  readonly currency: Currency
  constructor(currency: Currency, amount: BigNumberish, isRaw?: boolean)
  get raw(): bn_js__default
  isZero(): boolean
  /**
   * a greater than b
   */
  gt(other: CurrencyAmount): boolean
  /**
   * a less than b
   */
  lt(other: CurrencyAmount): boolean
  add(other: CurrencyAmount): CurrencyAmount
  sub(other: CurrencyAmount): CurrencyAmount
  toSignificant(significantDigits?: number, format?: object, rounding?: Rounding): string
  /**
   * To fixed
   *
   * @example
   * ```
   * 1 -> 1.000000000
   * 1.234 -> 1.234000000
   * 1.123456789876543 -> 1.123456789
   * ```
   */
  toFixed(decimalPlaces?: number, format?: object, rounding?: Rounding): string
  /**
   * To exact
   *
   * @example
   * ```
   * 1 -> 1
   * 1.234 -> 1.234
   * 1.123456789876543 -> 1.123456789
   * ```
   */
  toExact(format?: object): string
}
declare class TokenAmount extends CurrencyAmount {
  readonly token: Token
  constructor(token: Token, amount: BigNumberish, isRaw?: boolean)
  add(other: TokenAmount): TokenAmount
  subtract(other: TokenAmount): TokenAmount
}

export { CurrencyAmount, TokenAmount, splitNumber }
