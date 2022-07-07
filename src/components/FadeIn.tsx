import { ReactNode, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Transition } from '@headlessui/react'
import { useToggleRef } from '@/hooks/useToggle'
import { useForceUpdate } from '@/hooks/useForceUpdate'

export default function FadeInStable({
  openDelay = 17,
  ignoreEnterTransition,
  ignoreLeaveTransition,
  show,
  children
}: {
  openDelay?: number
  ignoreEnterTransition?: boolean
  ignoreLeaveTransition?: boolean
  show?: any
  children?: ReactNode // if immediately, inner content maybe be still not render ready
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [, forceUpdate] = useForceUpdate()
  const [isDuringTransition, { delayOff: transactionFlagDelayOff, on: transactionFlagOn }] = useToggleRef(false, {
    delay: 200 + 20 /* transition time */,
    onToggle: forceUpdate
  })

  return (
    <Transition
      show={Boolean(show)}
      enter="select-none transition-all duration-200 ease"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="select-none transition-all duration-200 ease"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      beforeEnter={() => {
        if (ignoreEnterTransition) return
        // seems headlessui/react 1.6 will get react 18's priority strategy. 👇 fllowing code will invoke **before** element load
        contentRef.current?.style.setProperty('position', 'absolute') // init will rerender element, "position:absolute" is for not affect others
        contentRef.current?.style.setProperty('visibility', 'hidden')
        setTimeout(() => {
          contentRef.current?.style.removeProperty('position')
          contentRef.current?.style.removeProperty('visibility')

          const height = contentRef.current?.clientHeight
          // frequent ui action may cause element havn't attach to DOM yet, when occors, just ignore it.
          if (height) {
            contentRef.current?.style.setProperty('height', '0')
            // get a layout property to manually to force the browser to layout the above code.
            // So trick. But have to.🤯🤯🤯🤯
            contentRef.current?.clientHeight
            contentRef.current?.style.setProperty('height', `${height}px`)
            transactionFlagOn() // to make sure 👇 setTimout would not remove something if transaction has canceled
            transactionFlagDelayOff()

            // clean unnecessary style
            setTimeout(() => {
              if (isDuringTransition.current) return
              contentRef.current?.style.removeProperty('height')
            }, 200 + 20 /* transition time */)
          }
        }, openDelay)
      }}
      beforeLeave={() => {
        if (ignoreLeaveTransition) return
        setTimeout(() => {
          const height = contentRef.current?.clientHeight
          if (!height) {
            contentRef.current?.style.setProperty('height', '0')
          } else {
            contentRef.current?.style.setProperty('height', `${height}px`)
            // get a layout property to manually to force the browser to layout the above code.
            // So trick. But have to.🤯🤯🤯🤯
            contentRef.current?.clientHeight
            contentRef.current?.style.setProperty('height', '0')

            transactionFlagOn() // to make sure 👇 setTimout would not remove something if transaction has canceled
            transactionFlagDelayOff()

            // clean unnecessary style
            setTimeout(() => {
              if (isDuringTransition.current) return
              contentRef.current?.style.removeProperty('height')
              contentRef.current?.style.setProperty('position', 'absolute')
              contentRef.current?.style.setProperty('visibility', 'hidden')
            }, 200 + 20 /* transition time */)
          }
        })
      }}
    >
      {/* outer div can't set ref for it's being used by headless-ui <Transition/> */}
      <div
        ref={contentRef}
        className={twMerge(
          `transition-all duration-200 ease overflow-hidden ${children || isDuringTransition.current ? '' : 'hidden'}`
        )}
      >
        {children}
      </div>
    </Transition>
  )
}

export function FadeIn({
  openDelay = 35,
  ignoreEnterTransition,
  ignoreLeaveTransition,
  className,
  children
}: {
  // if immediately, inner content maybe be still not render ready
  openDelay?: number
  ignoreEnterTransition?: boolean
  ignoreLeaveTransition?: boolean
  className?: string
  children?: ReactNode
}) {
  // const [nodeExist, { off: destory }] = useToggle(true)
  const contentRef = useRef<HTMLDivElement>(null)
  const innerChildren = useRef<ReactNode>(children)
  if (children) innerChildren.current = children
  const [, forceUpdate] = useForceUpdate()
  const [isDuringTransition, { delayOff: transactionFlagDelayOff, on: transactionFlagOn }] = useToggleRef(false, {
    delay: 200 + 20 /* transition time */,
    onToggle: forceUpdate
  })
  return (
    <Transition
      appear
      show={Boolean(children)}
      enter={`select-none ${ignoreEnterTransition ? '' : 'transition-all'} duration-200 ease`}
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave={`select-none ${ignoreLeaveTransition ? '' : 'transition-all'} duration-200 ease`}
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      beforeEnter={() => {
        if (ignoreEnterTransition) return
        // seems headlessui/react 1.6 will get react 18's priority strategy. 👇 fllowing code will invoke **before** element load
        contentRef.current?.style.setProperty('position', 'absolute') // init will rerender element, "position:absolute" is for not affect others
        contentRef.current?.style.setProperty('visibility', 'hidden')
        setTimeout(() => {
          contentRef.current?.style.removeProperty('position')
          contentRef.current?.style.removeProperty('visibility')

          const height = contentRef.current?.clientHeight
          // frequent ui action may cause element havn't attach to DOM yet, when occors, just ignore it.
          if (height) {
            contentRef.current?.style.setProperty('height', '0')
            // get a layout property to manually to force the browser to layout the above code.
            // So trick. But have to.🤯🤯🤯🤯
            contentRef.current?.clientHeight
            contentRef.current?.style.setProperty('height', `${height}px`)
            transactionFlagOn() // to make sure 👇 setTimout would not remove something if transaction has canceled
            transactionFlagDelayOff()

            // // clean unnecessary style
            setTimeout(() => {
              if (isDuringTransition.current) return
              contentRef.current?.style.removeProperty('height')
            }, 200 + 20 /* transition time */)
          }
        }, openDelay)
      }}
      beforeLeave={() => {
        if (ignoreLeaveTransition) return
        setTimeout(() => {
          const height = contentRef.current?.clientHeight
          if (!height) {
            contentRef.current?.style.setProperty('height', '0')
          } else {
            contentRef.current?.style.setProperty('height', `${height}px`)
            // get a layout property to manually to force the browser to layout the above code.
            // So trick. But have to.🤯🤯🤯🤯
            contentRef.current?.clientHeight
            contentRef.current?.style.setProperty('height', '0')

            transactionFlagOn() // to make sure 👇 setTimout would not remove something if transaction has canceled
            transactionFlagDelayOff()

            // clean unnecessary style
            setTimeout(() => {
              if (isDuringTransition.current) return
              contentRef.current?.style.removeProperty('height')
            }, 200 + 20 /* transition time */)
          }
        })
      }}
    >
      <div
        ref={contentRef}
        className={`transition-all duration-200 ease overflow-hidden ${
          children || isDuringTransition.current ? '' : 'hidden'
        }`}
      >
        {innerChildren.current}
      </div>
    </Transition>
  )
}
