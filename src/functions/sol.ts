export interface NativeTokenInfo {
  readonly symbol: string
  readonly name: string

  readonly decimals: number
}

export interface SplTokenInfo extends NativeTokenInfo {
  // readonly chainId: ENV;
  readonly mint: string
}

export const SOL: NativeTokenInfo = {
  symbol: 'SOL',
  name: 'Solana',
  decimals: 9
}

export const WSOL: SplTokenInfo = {
  symbol: 'WSOL',
  name: 'Wrapped SOL',
  mint: 'So11111111111111111111111111111111111111112',
  decimals: 9
}
