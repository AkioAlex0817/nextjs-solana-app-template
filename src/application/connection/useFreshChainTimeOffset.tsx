import useConnection from './useConnection'
import { mul, sub } from '@/functions/number/operations'
import { Connection } from '@solana/web3.js'
import { useEffect } from 'react'

/**
 * **only in `_app.tsx`**
 *
 * will base on rpcpools(in dev mode) to establish connection
 */
export default function useFreshChainTimeOffset() {
  const connection = useConnection((s) => s.connection)
  useEffect(() => {
    updateChinTimeOffset(connection)
    const timeId = setInterval(() => {
      updateChinTimeOffset(connection)
    }, 1000 * 60 * 5)
    return () => clearInterval(timeId)
  }, [connection])
}

async function updateChinTimeOffset(connection: Connection | undefined) {
  if (!connection) return
  const chainTime = await connection.getBlockTime(await connection.getSlot())
  if (!chainTime) return
  const offset = Number(sub(mul(chainTime, 1000), Date.now()).toFixed(0))
  useConnection.setState({
    chainTimeOffset: offset,
    getChainDate: () => new Date(Date.now() + (offset ?? 0))
  })
}
