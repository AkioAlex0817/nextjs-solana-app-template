import { useEffect } from 'react'
import useAppSettings from './useAppSettings'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect '
import useDevice from '@/hooks/useDevice'
import { eq, gt, lt, lte } from '@/functions/number/compare'
import useLocalStorageItem from '@/hooks/useLocalStorage'
import { useRecordedEffect } from '@/hooks/useRecordedEffect'
import { inClient, inServer } from '@/functions/judgers/isSSR'
import { toString } from '@/functions/number/toString'

export function useDeviceInfoSyc() {
  // device
  const { isMobile, isPc, isTablet } = useDevice()
  useIsomorphicLayoutEffect(() => {
    useAppSettings.setState({ isMobile, isTablet, isPc })
  }, [isMobile, isPc, isTablet])

  useIsomorphicLayoutEffect(() => {
    useAppSettings.setState({
      inClient: inClient,
      inServer: inServer
    })
  }, [])
}

export function useSlippageTolerenceValidator() {
  const slippageTolerance = useAppSettings((s) => s.slippageTolerance)

  useEffect(() => {
    if (lte(slippageTolerance, 0) || gt(slippageTolerance, 0.5)) {
      useAppSettings.setState({ slippageToleranceState: 'invalid' })
    } else if (lt(slippageTolerance, 0.01)) {
      useAppSettings.setState({ slippageToleranceState: 'too small' })
    } else {
      useAppSettings.setState({ slippageToleranceState: 'valid' })
    }
  }, [slippageTolerance])
}

export function useSlippageTolerenceSyncer() {
  const slippageTolerance = useAppSettings((s) => s.slippageTolerance)

  const [localStoredSlippage, setLocalStoredSlippage] = useLocalStorageItem<string>('SLIPPAGE')
  useRecordedEffect(
    ([prevSlippageTolerance, prevLocalStoredSlippaged]) => {
      const slippageHasLoaded = prevSlippageTolerance == null && slippageTolerance !== null
      if (slippageHasLoaded && !eq(slippageTolerance, localStoredSlippage)) {
        useAppSettings.setState({
          slippageTolerance: localStoredSlippage ?? 0.01
        })
      } else if (slippageTolerance) {
        setLocalStoredSlippage(toString(slippageTolerance))
      }
    },
    [slippageTolerance, localStoredSlippage]
  )
}
