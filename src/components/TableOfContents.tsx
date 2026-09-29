'use client'

import * as React from 'react'
import { Clock, BookOpen, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  title: string
  level?: number
}

const tocItems: TocItem[] = [
  { id: 'the-problem', title: 'Why Go Testing Hurts', level: 2 },
  { id: 'how-keploy-works', title: 'How Keploy Works (eBPF)', level: 2 },
  { id: 'prerequisites', title: 'Prerequisites & Setup', level: 2 },
  { id: 'step-1-app-setup', title: 'Step 1: The Gin + Mongo App', level: 2 },
  { id: 'step-2-recording', title: 'Step 2: Recording Real Traffic', level: 2 },
  { id: 'step-3-artifacts', title: 'Step 3: Deconstructing the YAML', level: 2 },
  { id: 'step-4-replay', title: 'Step 4: Replaying Isolated Tests', level: 2 },
  { id: 'step-5-regression', title: 'Step 5: Catching Regressions', level: 2 },
  { id: 'aha-moments', title: 'Aha! Moments & Pro Tips', level: 2 },
  { id: 'summary', title: 'Summary & Key Takeaways', level: 2 },
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
    <aside className="hidden xl:block w-64 flex-shrink-0 sticky top-24 self-start space-y-4">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-[#0c101c]/80 backdrop-blur-md p-4 text-xs shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
            <BookOpen className="w-3.5 h-3.5 text-orange-500" />
            <span>On This Page</span>
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <Clock className="w-3 h-3" />
            <span>8 min read</span>
          </span>
        </div>

        <nav className="space-y-1">
          {tocItems.map((item) => {
            const isActive = activeId === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'group flex items-center justify-between py-1.5 px-2 rounded-md transition-all text-xs',
                  isActive
                    ? 'font-semibold text-orange-600 dark:text-orange-400 bg-orange-50/80 dark:bg-orange-500/10'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                )}
              >
                <span className="truncate">{item.title}</span>
                {isActive && (
                  <ChevronRight className="w-3 h-3 flex-shrink-0 text-orange-500" />
                )}
              </a>
            )
          })}
        </nav>
      </div>

      {/* Helpful Quick Links Card */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-gradient-to-br from-orange-500/5 to-transparent p-4 text-xs space-y-2">
        <div className="font-semibold text-slate-800 dark:text-slate-200">
          Keploy DevRel Quicklinks
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
          Need the sample code? Access the official quickstart repository on GitHub.
        </p>
        <a
          href="https://github.com/keploy/samples-go/tree/main/gin-mongo"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:underline font-medium text-[11px] pt-1"
        >
          <span>github.com/keploy/samples-go</span>
          <span>↗</span>
        </a>
      </div>
    </aside>
  )
}
