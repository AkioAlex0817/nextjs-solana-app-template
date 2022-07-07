import { PublicKey } from '@solana/web3.js'
import { PublicKeyish } from '../common/pubkey.js'
import '@solana/spl-token'

/**
 * A currency is any fungible financial instrument on Solana, including SOL and all SPL tokens.
 *
 * The only instance of the base class `Currency` is SOL.
 */
declare class Currency {
  readonly symbol?: string
  readonly name?: string
  readonly decimals: number
  /**
   * The only instance of the base class `Currency`.
   */
  static readonly SOL: Currency
  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.SOL`.
   * @param decimals - decimals of the currency
   * @param symbol - symbol of the currency
   * @param name - name of the currency
   */
  constructor(decimals: number, symbol?: string, name?: string)
}
declare function inspectCurrency(): void
/**
 * Represents an SPL token with a unique address and some metadata.
 */
declare class Token extends Currency {
  readonly mint: PublicKey
  /**
   * The only instance of the base class `Token`.
   */
  static readonly WSOL: Token
  constructor(mint: PublicKeyish, decimals: number, symbol?: string, name?: string)
  /**
   * Returns true if the two tokens are equivalent, i.e. have the same mint address.
   * @param other - other token to compare
   */
  equals(other: Token): boolean
}
declare function inspectToken(): void
/**
 * Compares two currencies for equality
 */
declare function currencyEquals(currencyA: Currency, currencyB: Currency): boolean

export { Currency, Token, currencyEquals, inspectCurrency, inspectToken }
