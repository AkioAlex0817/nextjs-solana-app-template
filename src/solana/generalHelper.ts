export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const handleLink = (href: string) => {
  window.open(href, '_blank')
}

export const consoleHelper = (...args: any[]) => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === `production`) return
  // console.log(...args);
}
