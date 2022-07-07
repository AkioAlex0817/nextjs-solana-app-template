import useMedia from './useMedia'
import { inClient } from '@/functions/judgers/isSSR'

const breakPointsconfigs = {
  isMobile: '(max-width: 1000px)',
  isTablet: '(max-width: 1280px)', // only js and avoid to use it as much as you can, it can cause css media query confuse
  isPc: '(max-width: 99999px)'
} // order is important cause only one condition will result true detected by browser

export default function useDevice() {
  const currentBreakPoint = useMedia(
    Object.values(breakPointsconfigs),
    Object.keys(breakPointsconfigs) as (keyof typeof breakPointsconfigs)[],
    getPlatformInfo()?.isPc ? 'isPc' : 'isMobile'
  )
  return {
    isMobile: currentBreakPoint === 'isMobile',
    isTablet: currentBreakPoint === 'isTablet',
    isPc: currentBreakPoint === 'isPc'
  }
}

export function getPlatformInfo() {
  if (!inClient) return
  const ua = navigator.userAgent
  const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
  const isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  const isWechat = ua.indexOf('MicroMessenger') > -1
  const isMacOS = /Mac OS/i.test(ua)
  const isMobile = /(iPhone|iPad|iPod|iOS|Android)/i.test(ua)
  const isPc = !isMobile

  return {
    isAndroid,
    isIOS,
    isWechat,
    isMobile,
    isPc,
    isMacOS
  }
}
