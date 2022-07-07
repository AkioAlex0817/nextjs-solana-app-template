import { BigNumberish } from './bignumber.js'
import { Rounding } from './constant.js'
import { Currency } from './currency.js'
import { Fraction } from './fraction.js'
import 'bn.js'
import '@solana/web3.js'
import '../common/pubkey.js'
import '@solana/spl-token'

declare class Price extends Fraction {
  readonly baseCurrency: Currency
  readonly quoteCurrency: Currency
  readonly scalar: Fraction
  constructor(baseCurrency: Currency, denominator: BigNumberish, quoteCurrency: Currency, numerator: BigNumberish)
  get raw(): Fraction
  get adjusted(): Fraction
  invert(): Price
  mul(other: Price): Price
  toSignificant(significantDigits?: number, format?: object, rounding?: Rounding): string
  toFixed(decimalPlaces?: number, format?: object, rounding?: Rounding): string
}

export { Price }
