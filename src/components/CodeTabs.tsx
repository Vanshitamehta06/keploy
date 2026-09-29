'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

interface CodeTabsProps {
  tabs: TabItem[]
  defaultTab?: string
}

export function CodeTabs({ tabs, defaultTab }: CodeTabsProps) {
  const [activeTab, setActiveTab] = React.useState<string>(
    defaultTab || (tabs.length > 0 ? tabs[0].id : '')
  )

  const current = tabs.find((t) => t.id === activeTab) || tabs[0]

  return (
    <div className="my-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 overflow-hidden shadow-lg">
      {/* Tab Header */}
      <div className="flex items-center gap-1 px-3 pt-2.5 pb-0 bg-slate-950/80 border-b border-slate-800/80 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-t-lg transition-all border-b-2',
                isActive
                  ? 'border-orange-500 text-orange-400 bg-slate-900 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              )}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Body */}
      <div className="p-0">
        {current ? current.content : null}
      </div>
    </div>
  )
}
