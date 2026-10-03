'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  title: string
}

const tocItems: TocItem[] = [
  { id: 'the-problem', title: 'The Problem' },
  { id: 'how-it-works', title: 'How It Works' },
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'step-1-record', title: '1. Record Traffic' },
  { id: 'step-2-artifacts', title: '2. Generated YAML' },
  { id: 'step-3-test', title: '3. Test Without DB' },
  { id: 'step-4-regression', title: 'Catching Regressions' },
  { id: 'takeaways', title: 'Key Takeaways' },
]

export function TableOfContents() {
  const [activeId, setActiveId] = React.useState<string>('the-problem')

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0.1,
      }
    )

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-24 self-start text-xs">
      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 font-semibold">
        On this page
      </div>

      <nav className="space-y-1.5 border-l border-slate-200 dark:border-slate-800/80 pl-3">
        {tocItems.map((item) => {
          const isActive = activeId === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'block py-0.5 transition-colors leading-normal',
                isActive
                  ? 'font-medium text-orange-600 dark:text-orange-400'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              )}
            >
              {item.title}
            </a>
          )
        })}
      </nav>

      <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 space-y-2">
        <div className="font-mono text-slate-400 dark:text-slate-500 text-[10px] uppercase">
          Sample Reference
        </div>
        <a
          href="https://github.com/keploy/samples-go/tree/main/gin-mongo"
          target="_blank"
          rel="noreferrer"
          className="text-orange-600 dark:text-orange-400 hover:underline block font-medium"
        >
          keploy/samples-go ↗
        </a>
      </div>
    </aside>
  )
}
