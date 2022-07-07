import { clusterApiUrl } from '@solana/web3.js'
import { consoleHelper } from '@/solana/generalHelper'

export type Cluster = 'devnet' | 'testnet' | 'mainnet'

export const CLUSTER: Cluster =
  process.env.NEXT_PUBLIC_CLUSTER === `mainnet`
    ? `mainnet`
    : process.env.NEXT_PUBLIC_CLUSTER === `devnet`
    ? `devnet`
    : `testnet`

export const SOLANA_ENDPOINT = CLUSTER === `mainnet` ? clusterApiUrl(`mainnet-beta`) : clusterApiUrl(CLUSTER)
consoleHelper('[env] MAGIC_EDEN_API_URL', SOLANA_ENDPOINT)
