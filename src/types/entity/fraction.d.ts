import bn_js__default from 'bn.js'
import { BigNumberish } from './bignumber.js'
import { Rounding } from './constant.js'

declare class Fraction {
  readonly numerator: bn_js__default
  readonly denominator: bn_js__default
  constructor(numerator: BigNumberish, denominator?: BigNumberish)
  get quotient(): bn_js__default
  invert(): Fraction
  add(other: Fraction | BigNumberish): Fraction
  sub(other: Fraction | BigNumberish): Fraction
  mul(other: Fraction | BigNumberish): Fraction
  div(other: Fraction | BigNumberish): Fraction
  toSignificant(significantDigits: number, format?: object, rounding?: Rounding): string
  toFixed(decimalPlaces: number, format?: object, rounding?: Rounding): string
}

export { Fraction }
