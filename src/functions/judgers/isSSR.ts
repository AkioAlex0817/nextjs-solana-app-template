export default function isClientSide() {
  return 'document' in globalThis && 'window' in globalThis && 'history' in globalThis
}
export function isServerSide() {
  return !isClientSide()
}

export const inClient = isClientSide()

export const inServer = isServerSide()
