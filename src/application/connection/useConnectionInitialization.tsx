import { useEffect } from 'react'
import { Connection } from '@solana/web3.js'
import { CLUSTER, SOLANA_ENDPOINT } from '@/solana/consts'
import useConnection from './useConnection'

/**
 * **only in `_app.tsx`**
 *
 * will base on rpcpools(in dev mode) to establish connection
 */
export default function useConnectionInitialization() {
  useEffect(() => {
    const endPointUrl = SOLANA_ENDPOINT
    const connection = new Connection(endPointUrl, 'confirmed')
    useConnection.setState({
      currentEndPoint: { name: CLUSTER, url: endPointUrl },
      connection
    })
  }, [])
}
