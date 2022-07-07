import React, { ReactNode, useEffect, useMemo, useState } from 'react'

import useAppSettings from '@/application/appSettings/useAppSettings'
import useNotification from '@/application/notification/useNotification'

import Col from './Col'
import ConfirmDialog, { ConfirmDialogInfo } from './dialogs/ConfirmDialog'
import Link from './Link'
import NotificationItem, { NotificationItemInfo } from './NotificationItem'

//#region ------------------- core definition -------------------
type PopInfo =
  | {
      is: 'notificationItem'
      info: NotificationItemInfo
    }
  | {
      is: 'confirmDialog'
      info: ConfirmDialogInfo
    }

export default function NotificationSystemStack() {
  const [stack, setStack] = useState<PopInfo[]>([])
  const isMobile = useAppSettings((s) => s.isMobile)

  const notificationItemInfos = useMemo(
    () => stack.filter((i) => i.is === 'notificationItem').map((i) => i.info) as NotificationItemInfo[],
    [stack]
  )
  const confirmDialogInfos = useMemo(
    () => stack.filter((i) => i.is === 'confirmDialog').map((i) => i.info) as ConfirmDialogInfo[],
    [stack]
  )
  useEffect(() => {
    const log = (info: NotificationItemInfo) => {
      setStack((s) => s.concat({ is: 'notificationItem', info }))
    }
    const popConfirm = (info: ConfirmDialogInfo) => {
      setStack((s) => s.concat({ is: 'confirmDialog', info }))
    }

    useNotification.setState({
      log,
      logTxid(txid: string, title?: string, options?: { isSuccess?: boolean }) {
        log({
          type: options?.isSuccess ? 'success' : 'info',
          title: title ?? 'Transaction sent',
          description: (
            <div>
              View on <Link href={`https://solscan.io/tx/${txid}`}>Solscan</Link>
            </div>
          )
        })
      },
      logError(title: string | Error | unknown, description?: ReactNode) {
        const errorTitle = title instanceof Error ? title.name : title ? String(title) : ''
        const errorDescription = title instanceof Error ? title.message : description ? String(description) : undefined
        log({ type: 'error', title: errorTitle, description: errorDescription })
      },
      logWarning(title: string, description?: ReactNode) {
        log({ type: 'warning', title, description })
      },
      logSuccess(title: string, description?: ReactNode) {
        log({ type: 'success', title, description })
      },
      logInfo(title: string, description?: ReactNode) {
        log({ type: 'info', title, description })
      },
      popConfirm
    })
  }, [])

  return (
    <>
      <Col
        className="items-end mobile:items-stretch pointer-events-none"
        style={{
          position: 'fixed',
          right: isMobile ? 'unset' : '0',
          bottom: isMobile ? 'unset' : '0',
          top: isMobile ? '0' : 'unset',
          left: isMobile ? '0' : 'unset',
          zIndex: 9999
        }}
      >
        {notificationItemInfos.map((info, idx) => (
          <NotificationItem key={idx} {...info} />
        ))}
      </Col>
      {confirmDialogInfos.map((info, idx) => (
        <ConfirmDialog key={idx} {...info} />
      ))}
    </>
  )
}
