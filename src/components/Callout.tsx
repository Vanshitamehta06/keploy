'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface CalloutProps {
  type?: 'note' | 'tip' | 'gotcha' | 'aha'
  title?: string
  children: React.ReactNode
}

export function Callout({ type = 'note', title, children }: CalloutProps) {
  const styles = {
    note: {
      border: 'border-l-zinc-500',
      badge: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
      defaultTitle: 'Note',
    },
    tip: {
      border: 'border-l-emerald-500',
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      defaultTitle: 'Tip',
    },
    gotcha: {
      border: 'border-l-amber-500',
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      defaultTitle: 'Gotcha',
    },
    aha: {
      border: 'border-l-orange-500',
      badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
      defaultTitle: 'Key Takeaway',
    },
  }

  const current = styles[type] || styles.note

  return (
    <div
      className={cn(
        'my-6 rounded-r-lg border border-l-4 border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-4 text-sm leading-relaxed',
        current.border
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={cn(
            'text-[11px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded',
            current.badge
          )}
        >
          {title || current.defaultTitle}
        </span>
      </div>
      <div className="text-zinc-700 dark:text-zinc-300 text-sm [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
