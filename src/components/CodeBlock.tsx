'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children?: React.ReactNode
  code?: string
  language?: string
  filename?: string
}

export function CodeBlock({
  children,
  code,
  language = 'bash',
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const rawCode =
    code ||
    (typeof children === 'string'
      ? children
      : React.Children.toArray(children)
          .map((child: any) =>
            typeof child === 'string' ? child : child?.props?.children || ''
          )
          .join('')
    ).trim()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <div className="my-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-[#0f141c] text-slate-100 overflow-hidden shadow-sm not-prose">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161d28] border-b border-slate-800/90 text-xs">
        <span className="font-mono text-slate-400 text-xs font-medium">
          {filename || language}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Text */}
      <div className="p-4 overflow-x-auto font-mono text-[13px] leading-relaxed text-slate-200 bg-[#0f141c]">
        <pre className="whitespace-pre">
          <code>{children || rawCode}</code>
        </pre>
      </div>
    </div>
  )
}
