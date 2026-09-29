'use client'

import * as React from 'react'
import { ThumbsUp, ThumbsDown, MessageSquare, Heart, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FeedbackWidget() {
  const [feedback, setFeedback] = React.useState<'up' | 'down' | null>(null)
  const [submitted, setSubmitted] = React.useState(false)

  const handleVote = (type: 'up' | 'down') => {
    setFeedback(type)
    setSubmitted(true)
  }

  return (
    <div className="my-10 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c101c] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>Was this Go quickstart tutorial helpful?</span>
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Created for the Keploy DevRel Candidate Assignment. Your feedback helps improve developer documentation.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {submitted ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/30">
            <Check className="w-4 h-4" />
            <span>Thank you for the feedback!</span>
          </div>
        ) : (
          <>
            <button
              onClick={() => handleVote('up')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-all"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>Yes</span>
            </button>
            <button
              onClick={() => handleVote('down')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-all"
            >
              <ThumbsDown className="w-3.5 h-3.5 text-amber-500" />
              <span>No</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
