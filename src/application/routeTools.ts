import router from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { shrinkToValue } from '@/functions/shrinkToValue'
import { HexAddress, MayFunction } from '@/types/constants'
import { SplToken } from './token/type'

export type PageRouteConfigs = {
  '/': {
    queryProps?: {
      coin1?: SplToken
      coin2?: SplToken
      ammId?: HexAddress
    }
  }
  '/liquidity/add': {
    queryProps?: {
      coin1?: SplToken
      coin2?: SplToken
      ammId?: string
      mode?: 'removeLiquidity'
    }
  }
}

export type PageRouteName = keyof PageRouteConfigs

// TODO: parse url query function (can have prevState of zustand store)
export function routeTo<ToPage extends keyof PageRouteConfigs>(
  toPage: ToPage,
  opts?: MayFunction<PageRouteConfigs[ToPage], [{ currentPageQuery: ParsedUrlQuery }]>
): void {
  const options = shrinkToValue(opts, [{ currentPageQuery: router.query }])
  router.push({ pathname: toPage /*query: options?.queryProps*/ })
  /*if (toPage === '/swap') {
    const coin1 =
        options?.queryProps?.coin1 ??
        (router.pathname.includes('/liquidity/add') ? useLiquidity.getState().coin1 : undefined)
    const coin2 =
        options?.queryProps?.coin2 ??
        (router.pathname.includes('/liquidity/add') ? useLiquidity.getState().coin2 : undefined)
    const isSwapDirectionReversed = useSwap.getState().directionReversed
    router.push({ pathname: '/swap' }).then(() => {
      const targetState = objectShakeFalsy(isSwapDirectionReversed ? { coin2: coin1, coin1: coin2 } : { coin1, coin2 })
      useSwap.setState(targetState)
    })
  } else if (toPage === '/liquidity/add') {
    /!** get info from queryProp *!/
    const ammId = options?.queryProps?.ammId
    const coin1 =
        options?.queryProps?.coin1 ?? (router.pathname.includes('swap') ? useSwap.getState().coin1 : undefined)
    const coin2 =
        options?.queryProps?.coin2 ?? (router.pathname.includes('swap') ? useSwap.getState().coin2 : undefined)
    const isSwapDirectionReversed = useSwap.getState().directionReversed
    const upCoin = isSwapDirectionReversed ? coin2 : coin1
    const downCoin = isSwapDirectionReversed ? coin1 : coin2
    const mode = options?.queryProps?.mode
    router.push({ pathname: '/liquidity/add' }).then(() => {
      /!** jump to target page *!/
      useLiquidity.setState(
          objectShakeFalsy({
            coin1: upCoin,
            coin2: downCoin,
            ammId,
            isRemoveDialogOpen: mode === 'removeLiquidity'
          })
      )
    })
  } else {
    router.push({ pathname: toPage, query: options?.queryProps })
  }*/
  return
}
