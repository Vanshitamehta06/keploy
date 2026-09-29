'use client'

import * as React from 'react'
import { Check, Copy, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children?: React.ReactNode
  code?: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  children,
  code,
  language = 'bash',
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  // Extract raw text from children if code prop is not provided directly
  const rawCode =
    code ||
    (typeof children === 'string'
      ? children
      : React.Children.toArray(children)
          .map((child: any) => (typeof child === 'string' ? child : child?.props?.children || ''))
          .join('')).trim()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const lines = rawCode.split('\n')

  return (
    <div className="my-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-lg group">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/70 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 text-slate-400 font-mono">
          <Terminal className="w-3.5 h-3.5 text-orange-400" />
          <span className="font-semibold text-slate-300">
            {filename || language.toUpperCase()}
          </span>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-slate-100 bg-slate-800/60 hover:bg-slate-700/80 transition-all border border-slate-700/50"
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

      {/* Code contents */}
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed bg-[#0b0f19]">
        {showLineNumbers ? (
          <div className="table w-full">
            {lines.map((line, idx) => (
              <div key={idx} className="table-row hover:bg-white/5">
                <span className="table-cell pr-4 text-right select-none text-slate-600 text-xs py-0.5">
                  {idx + 1}
                </span>
                <span className="table-cell text-slate-200 py-0.5 whitespace-pre">
                  {line}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <pre className="text-slate-200 whitespace-pre">
            <code>{children || rawCode}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
