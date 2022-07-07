/**
 * Complete
 */
import BN from 'bn.js'

import toFraction from './toFraction'
import { Numberish } from '@/types/constants'
import { BigNumberish, TEN } from '@/types/entity'

/**
 * only int part will become BN
 */
export default function toBN(n: undefined): undefined
export default function toBN(n: Numberish, decimal?: BigNumberish): BN
export default function toBN(n: Numberish | undefined, decimal: BigNumberish = 0): BN | undefined {
  if (!n) return undefined
  if (n instanceof BN) return n
  return new BN(
    toFraction(n)
      .mul(TEN.pow(new BN(String(decimal))))
      .toFixed(0)
  )
}
