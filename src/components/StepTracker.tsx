'use client'

import * as React from 'react'
import { CheckCircle2, Circle, ListOrdered } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  id: string
  title: string
  anchor: string
}

const steps: Step[] = [
  { id: '1', title: 'Install Keploy CLI & clone gin-mongo', anchor: '#prerequisites' },
  { id: '2', title: 'Start recording with keploy record', anchor: '#step-2-recording' },
  { id: '3', title: 'Send cURL requests to generate data', anchor: '#step-2-recording' },
  { id: '4', title: 'Inspect generated YAML test & mock', anchor: '#step-3-artifacts' },
  { id: '5', title: 'Execute isolated replay via keploy test', anchor: '#step-4-replay' },
  { id: '6', title: 'Verify regression handling & noise filtering', anchor: '#step-5-regression' },
]

export function StepTracker() {
  const [completed, setCompleted] = React.useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setCompleted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const completedCount = Object.values(completed).filter(Boolean).length

  return (
    <div className="my-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c101c] p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800/80 mb-3">
        <div className="flex items-center gap-2">
          <ListOrdered className="w-4 h-4 text-orange-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Interactive Hands-on Progress
          </h4>
        </div>
        <span className="text-xs font-medium text-slate-500">
          {completedCount} of {steps.length} completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-orange-500 transition-all duration-300 rounded-full"
          style={{ width: `${(completedCount / steps.length) * 100}%` }}
        />
      </div>

      {/* Step items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {steps.map((s) => {
          const isDone = !!completed[s.id]
          return (
            <div
              key={s.id}
              onClick={() => toggle(s.id)}
              className={cn(
                'flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-all border select-none',
                isDone
                  ? 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300'
                  : 'border-slate-200 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
              )}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-400 flex-shrink-0" />
              )}
              <span className={cn('truncate', isDone && 'line-through opacity-80')}>
                {s.title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
