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
      setTimeout(() => setCopied(false), 1800)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <div className="my-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-[#0e0f12] text-zinc-100 overflow-hidden text-sm shadow-sm group">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#14151a] border-b border-zinc-800/80 text-xs">
        <span className="font-mono text-zinc-400 text-[11px]">
          {filename || language}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="p-3.5 overflow-x-auto font-mono text-xs leading-relaxed text-zinc-200 bg-[#0a0a0c]">
        <pre className="whitespace-pre">
          <code>{children || rawCode}</code>
        </pre>
      </div>
    </div>
  )
}
