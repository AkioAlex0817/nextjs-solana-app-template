import type { NextPage } from 'next'
import { createRef, useRef, useState } from 'react'
import Row from '@/components/Row'
import Tabs from '@/components/Tabs'
import CyberpunkStyleCard from '@/components/CyberpunkStyleCard'
import { useSwapTwoElements } from '@/hooks/useSwapTwoElements'
import Button, { ButtonHandle } from '@/components/Button'
import createContextStore from '@/functions/react/createContextStore'
import useWallet from '@/application/wallet/useWallet'
import useAppSettings from '@/application/appSettings/useAppSettings'
const { ContextProvider: SwapUIContextProvider, useStore: useSwapContextStore } = createContextStore({
  hasAcceptedPriceChange: false,
  //coinInputBox1ComponentRef: createRef<CoinInputBoxHandle>(),
  //coinInputBox2ComponentRef: createRef<CoinInputBoxHandle>(),
  swapButtonComponentRef: createRef<ButtonHandle>()
})

const Home: NextPage = () => {
  const { connected: walletConnected } = useWallet()
  const cardRef = useRef<HTMLDivElement>(null)
  const swapButtonComponentRef = createRef<ButtonHandle>()

  /*const coin1 = useSwap((s) => s.coin1)
  const coin2 = useSwap((s) => s.coin2)
  const coin1Amount = useSwap((s) => s.coin1Amount)
  const coin2Amount = useSwap((s) => s.coin2Amount)
  const directionReversed = useSwap((s) => s.directionReversed)
  const priceImpact = useSwap((s) => s.priceImpact)
  const refreshSwap = useSwap((s) => s.refreshSwap)
  //const balances = useWallet((s) => s.balances)
  const swapable = useSwap((s) => s.swapable)
  const { hasAcceptedPriceChange, swapButtonComponentRef } = useSwapContextStore()

  const cardRef = useRef<HTMLDivElement>(null)
  const swapElementBox1 = useRef<HTMLDivElement>(null)
  const swapElementBox2 = useRef<HTMLDivElement>(null)
  const [hasUIWrapped, { toggleSwap: toggleUISwap }] = useSwapTwoElements(swapElementBox1, swapElementBox2, {
    defaultHasWrapped: directionReversed
  })

  const upCoin = directionReversed ? coin2 : coin1
  // although info is included in routes, still need upCoinAmount to pop friendly feedback
  const upCoinAmount = (directionReversed ? coin2Amount : coin1Amount) || '0'
  const downCoin = directionReversed ? coin1 : coin2
  // although info is included in routes, still need downCoinAmount to pop friendly feedback
  const downCoinAmount = (directionReversed ? coin1Amount : coin2Amount) || '0'*/

  return (
    <SwapUIContextProvider>
      <div
        style={{
          padding:
            'env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px) env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px)',
          position: 'relative',
          display: 'grid',
          gridTemplate: `
          "d d d" auto
          "a a a" auto
          "b c c" 1fr
          "b c c" 1fr / auto 1fr 1fr`,
          overflow: 'hidden', // establish a BFC
          willChange: 'opacity'
        }}
        className={`w-screen mobile:w-full h-screen mobile:h-full`}
      >
        <main
          // always occupy scrollbar space
          className="PageLayoutContent relative isolate flex-container grid-area-c bg-gradient-to-b from-[#0c0927] to-[#110d36] rounded-tl-3xl mobile:rounded-none p-12 pb-4 pt-5 mobile:py-2 mobile:px-3"
          style={{
            overflowX: 'hidden',
            overflowY: 'scroll'
          }}
        >
          <Row className="justify-center mt-10 mb-10 mobile:mb-2">
            <Tabs
              currentValue={'Swap'}
              values={['Swap', 'Liquidity']}
              onChange={(newTab) => {
                // setActiveTabValue(newTab)
                if (newTab === 'Liquidity') {
                  console.error('Liquidity')
                }
              }}
            />
          </Row>
          <CyberpunkStyleCard
            domRef={cardRef}
            wrapperClassName="w-[min(456px,100%)] self-center cyberpunk-bg-light"
            className="py-8 pt-4 px-6 mobile:py-5 mobile:px-3"
          >
            <div className="space-y-5 mt-5"></div>
            <Button
              className="w-full frosted-glass-teal mt-5"
              componentRef={swapButtonComponentRef}
              validators={[
                {
                  should: walletConnected,
                  forceActive: true,
                  fallbackProps: {
                    onClick: () => useAppSettings.setState({ isWalletSelectorShown: true }),
                    children: 'Connect Wallet'
                  }
                }
              ]}
              onClick={() => {}}
            >
              Swap
            </Button>
          </CyberpunkStyleCard>
        </main>
      </div>
    </SwapUIContextProvider>
  )
}

export default Home
