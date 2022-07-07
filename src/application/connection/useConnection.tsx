import { Connection } from '@solana/web3.js'

import create from 'zustand'

import { Endpoint } from './fetchRPCConfig'
import { inServer } from '@/functions/judgers/isSSR'

type ConnectionStore = {
  connection: Connection | undefined
  chainTimeOffset?: number
  /**
   * for ui
   * maybe user customized
   * when isSwitchingRpcConnection it maybe not the currentConnection
   */
  currentEndPoint: Endpoint | undefined
  extractConnectionName: (url: string) => string
  getChainDate: () => Date
}

/** zustand store hooks */
const useConnection = create<ConnectionStore>((set, get) => ({
  connection: undefined,
  currentEndPoint: undefined,

  extractConnectionName: (url: string) => {
    const matchedLocalhost = url.match(/(https:\/\/|http:\/\/)?localhost.*/)
    if (matchedLocalhost) return 'localhost'

    if (inServer) return ''
    try {
      const urlObj = new globalThis.URL(url)
      return urlObj.hostname
    } catch {
      return '--'
    }
  },

  getChainDate() {
    return new Date(Date.now() + (get().chainTimeOffset ?? 0))
  }
}))

export default useConnection
