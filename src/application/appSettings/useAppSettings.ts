import create from 'zustand'
import { Numberish } from '@/types/constants'

export type AppSettingsStore = {
  slippageTolerance: Numberish
  slippageToleranceState: 'valid' | 'invalid' | 'too small'

  isBetaBubbleOn: boolean // temp for beta

  /** detect device */
  isMobile: boolean
  isTablet: boolean
  isPc: boolean

  // dev
  inClient?: boolean
  inServer?: boolean

  /** sould block any update when approve panel shows on  */
  isApprovePanelShown: boolean

  /** (setting) if true, no need to affact coin1 & coin2 & ammId to url  */
  inCleanUrlMode: boolean

  /** (ui panel controller) ui dialog open flag */
  isRecentTransactionDialogShown: boolean

  /** (ui panel controller) ui dialog open flag */
  isWalletSelectorShown: boolean

  // <RefreshCircle/> need a place to store state across app
  refreshCircleLastTimestamp: {
    [key: string]: {
      endProcessPercent: number
      endTimestamp: number
    }
  }
}
const useAppSettings = create<AppSettingsStore>(() => ({
  slippageTolerance: 0,
  slippageToleranceState: 'valid',

  isBetaBubbleOn: true,

  isMobile: false,
  isTablet: false,
  isPc: true,

  isApprovePanelShown: false,

  inCleanUrlMode: false,
  // inCleanUrlMode: true, // for test

  isRecentTransactionDialogShown: false,
  isWalletSelectorShown: false,
  refreshCircleLastTimestamp: {}
}))

export default useAppSettings
