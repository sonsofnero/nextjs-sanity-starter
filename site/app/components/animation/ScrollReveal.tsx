'use client'

import {useRef, type ReactNode} from 'react'
import {useGSAP} from '@gsap/react'
import clsx from 'clsx'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section'
  y?: number
  duration?: number
  delay?: number
  start?: string
}

export default function ScrollReveal({
  children,
  className,
  as: Component = 'div',
  y = 32,
  duration = 0.8,
  delay = 0,
  start = 'top 85%',
}: ScrollRevealProps) {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const element = container.current
      if (!element) return

      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(element, {clearProps: 'all'})
      })

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          element,
          {autoAlpha: 0, y},
          {
            autoAlpha: 1,
            y: 0,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start,
              once: true,
            },
          },
        )
      })

      return () => media.revert()
    },
    {scope: container, dependencies: [delay, duration, start, y], revertOnUpdate: true},
  )

  return (
    <Component ref={container} className={clsx(className)}>
      {children}
    </Component>
  )
}
