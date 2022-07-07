import '../styles/index.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'

import { SolanaWalletProviders } from '@/contexts/SolanaWalletProvider'
import useHandleWindowTopError from '@/hooks/useHandleWindowTopError'
import {
  useDeviceInfoSyc,
  useSlippageTolerenceSyncer,
  useSlippageTolerenceValidator
} from '@/application/appSettings/initializationHooks'
import useConnectionInitialization from '@/application/connection/useConnectionInitialization'
import useFreshChainTimeOffset from '@/application/connection/useFreshChainTimeOffset'
import { useSyncWithSolanaWallet } from '@/application/wallet/feature/useSyncWithSolanaWallet'
import { useWalletConnectNotifaction } from '@/application/wallet/feature/useWalletConnectNotifaction'
import { useWalletAccountChangeListeners } from '@/application/wallet/feature/useWalletAccountChangeListeners'
import { POPOVER_STACK_ID } from '@/components/Popover'
import { DRAWER_STACK_ID } from '@/components/Drawer'
import WalletSelectorDialog from '@/components/dialogs/WalletSelectorDialog'
import NotificationSystemStack from '@/components/NotificationSystemStack'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SolanaWalletProviders>
      <ClientInitialization />
      <ApplicationsInitializations />
      <div className="app">
        <NextNProgress color="#34ade5" showOnShallow={false} />
        <Component {...pageProps} />

        {/* popup stack */}
        <div id={POPOVER_STACK_ID} className="fixed z-popover inset-0 self-pointer-events-none"></div>
        <div id={DRAWER_STACK_ID} className="fixed z-popover inset-0 self-pointer-events-none"></div>

        {/* Global Components */}
        <WalletSelectorDialog />
        <NotificationSystemStack />
      </div>
    </SolanaWalletProviders>
  )
}

function ClientInitialization() {
  useHandleWindowTopError()
  useDeviceInfoSyc()
  return null
}

function ApplicationsInitializations() {
  useSlippageTolerenceValidator()
  useSlippageTolerenceSyncer()

  /********************** connection **********************/
  useConnectionInitialization()
  useFreshChainTimeOffset()

  /********************** wallet **********************/
  useSyncWithSolanaWallet()
  useWalletConnectNotifaction()
  useWalletAccountChangeListeners()

  return null
}
