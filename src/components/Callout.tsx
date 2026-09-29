'use client'

import * as React from 'react'
import { Info, Lightbulb, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CalloutProps {
  type?: 'info' | 'tip' | 'warning' | 'aha' | 'success'
  title?: string
  children: React.ReactNode
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const configs = {
    info: {
      border: 'border-blue-500/30 dark:border-blue-500/20 bg-blue-50/60 dark:bg-blue-950/20 text-blue-950 dark:text-blue-100',
      iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      icon: Info,
      defaultTitle: 'Note',
      badge: 'text-blue-700 dark:text-blue-300 font-semibold',
    },
    tip: {
      border: 'border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-100',
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      icon: Lightbulb,
      defaultTitle: 'Pro Tip',
      badge: 'text-emerald-700 dark:text-emerald-300 font-semibold',
    },
    warning: {
      border: 'border-amber-500/30 dark:border-amber-500/20 bg-amber-50/60 dark:bg-amber-950/20 text-amber-950 dark:text-amber-100',
      iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      icon: AlertTriangle,
      defaultTitle: 'Gotcha / Watch Out',
      badge: 'text-amber-700 dark:text-amber-300 font-semibold',
    },
    aha: {
      border: 'border-orange-500/30 dark:border-orange-500/30 bg-orange-50/70 dark:bg-orange-950/25 text-orange-950 dark:text-orange-100 shadow-sm',
      iconBg: 'bg-orange-500/15 text-orange-600 dark:text-orange-400',
      icon: Sparkles,
      defaultTitle: 'Aha! Moment',
      badge: 'text-orange-700 dark:text-orange-300 font-bold tracking-tight',
    },
    success: {
      border: 'border-green-500/30 dark:border-green-500/20 bg-green-50/60 dark:bg-green-950/20 text-green-950 dark:text-green-100',
      iconBg: 'bg-green-500/10 text-green-600 dark:text-green-400',
      icon: CheckCircle2,
      defaultTitle: 'Success',
      badge: 'text-green-700 dark:text-green-300 font-semibold',
    },
  }

  const current = configs[type] || configs.info
  const IconComponent = current.icon

  return (
    <aside
      className={cn(
        'my-6 rounded-xl border p-4 sm:p-5 transition-all text-sm leading-relaxed backdrop-blur-sm',
        current.border
      )}
    >
      <div className="flex items-start gap-3.5">
        <div className={cn('p-1.5 rounded-lg flex-shrink-0 mt-0.5', current.iconBg)}>
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="flex-1 space-y-1">
          <div className={cn('text-xs uppercase tracking-wider', current.badge)}>
            {title || current.defaultTitle}
          </div>
          <div className="prose-sm dark:prose-invert text-slate-700 dark:text-slate-300 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </aside>
  )
}
