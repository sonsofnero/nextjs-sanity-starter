import type {PortableTextComponents} from '@portabletext/react'
import Link from 'next/link'
import clsx from 'clsx'

import {theme} from '@/config/theme'

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({children}) => <h1 className={clsx(theme.typography.heading1, 'mb-4')}>{children}</h1>,
    h2: ({children}) => <h2 className={clsx(theme.typography.heading2, 'mb-4')}>{children}</h2>,
    h3: ({children}) => <h3 className={clsx(theme.typography.heading3, 'mb-4')}>{children}</h3>,
    normal: ({children}) => <p className={clsx(theme.typography.bodyPrimary, 'mb-6')}>{children}</p>,
    large: ({children}) => <p className={clsx(theme.typography.bodyLarge, 'mb-6')}>{children}</p>,
    blockquote: ({children}) => <blockquote className="mb-6 border-l-4 pl-4 italic">{children}</blockquote>,
  },
  list: {
    bullet: ({children}) => <ul className="mb-6 list-disc space-y-3 pl-6">{children}</ul>,
    number: ({children}) => <ol className="mb-6 list-decimal space-y-3 pl-6">{children}</ol>,
  },
  marks: {
    link: ({children, value}) => {
      const href = value?.href || '#'
      if (href.startsWith('/')) {
        return (
          <Link href={href} className="underline underline-offset-4">
            {children}
          </Link>
        )
      }
      return (
        <a href={href} className="underline underline-offset-4" target="_blank" rel="noreferrer">
          {children}
        </a>
      )
    },
    strong: ({children}) => <strong className="font-semibold">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    code: ({children}) => <code className="rounded bg-stone-100 px-1.5 py-0.5 text-sm">{children}</code>,
  },
}

export default portableTextComponents
