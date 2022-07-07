import React, { ReactNode, useMemo } from 'react'
import { useRouter } from 'next/router'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'

/** include: SolanaWalletConnectionProvider SolanaWalletAdaptorsProvider SolanaWalletModalProvider */
export function SolanaWalletProviders({ children }: { children?: ReactNode }) {
  // Set to 'devnet' | 'testnet' | 'mainnet-beta' or provide a custom RPC endpoint
  const network =
    process.env.NEXT_PUBLIC_CLUSTER === 'mainnet'
      ? WalletAdapterNetwork.Mainnet
      : process.env.NEXT_PUBLIC_CLUSTER === 'devnet'
      ? WalletAdapterNetwork.Devnet
      : WalletAdapterNetwork.Testnet
  const { pathname } = useRouter()
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [endpoint])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  )
}
