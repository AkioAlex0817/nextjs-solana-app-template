import { PublicKey } from '@solana/web3.js'

import BN from 'bn.js'

export interface ITokenAccount {
  publicKey?: PublicKey
  mint?: PublicKey
  isAssociated?: boolean
  amount: BN
  isNative: boolean
}
export type RpcUrl = string
export type WalletOwner = string
